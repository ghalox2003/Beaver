import { randomUUID } from 'node:crypto'
import { db } from './connection.ts'
import { getCurrencyForLocation, type CurrencyCode } from '../lib/currency.ts'

export type QuoteRequestStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'cancelled'
  | 'completed'

export type QuoteRequestRecord = {
  id: string
  clientUserId: string
  clientName: string
  clientEmail: string
  professionalId: string
  professionalName: string
  businessName: string
  title: string
  description: string
  location: string
  professionalLocation: string
  preferredDate: string | null
  budget: number | null
  currency: CurrencyCode
  status: QuoteRequestStatus
  createdAt: string
  updatedAt: string
}

type QuoteRequestRow = Record<string, unknown>

function toQuoteRequest(row: QuoteRequestRow): QuoteRequestRecord {
  return {
    id: String(row.id),
    clientUserId: String(row.client_user_id),
    clientName: String(row.client_name),
    clientEmail: String(row.client_email),
    professionalId: String(row.professional_id),
    professionalName: String(row.professional_name),
    businessName: String(row.business_name),
    title: String(row.title),
    description: String(row.description),
    location: String(row.location),
    professionalLocation: String(row.professional_location),
    preferredDate:
      row.preferred_date === null ? null : String(row.preferred_date),
    budget: row.budget === null ? null : Number(row.budget),
    currency: getCurrencyForLocation(String(row.professional_location)),
    status: row.status as QuoteRequestStatus,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}

const requestSelect = `
  SELECT
    qr.id,
    qr.client_user_id,
    client.full_name AS client_name,
    client.email AS client_email,
    qr.professional_id,
    pro.full_name AS professional_name,
    p.business_name,
    p.location AS professional_location,
    qr.title,
    qr.description,
    qr.location,
    qr.preferred_date,
    qr.budget,
    qr.status,
    qr.created_at,
    qr.updated_at
  FROM quote_requests qr
  JOIN users client ON client.id = qr.client_user_id
  JOIN professionals p ON p.id = qr.professional_id
  JOIN users pro ON pro.id = p.user_id
`

export function createQuoteRequest(input: {
  clientUserId: string
  professionalId: string
  title: string
  description: string
  location: string
  preferredDate?: string | null
  budget?: number | null
}): QuoteRequestRecord {
  const id = randomUUID()

  db.prepare(
    `
      INSERT INTO quote_requests (
        id,
        client_user_id,
        professional_id,
        title,
        description,
        location,
        preferred_date,
        budget
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    id,
    input.clientUserId,
    input.professionalId,
    input.title.trim(),
    input.description.trim(),
    input.location.trim(),
    input.preferredDate?.trim() || null,
    input.budget ?? null,
  )

  const created = findQuoteRequestById(id)
  if (!created) throw new Error('Quote request was not created')

  return created
}

export function findQuoteRequestById(
  id: string,
): QuoteRequestRecord | null {
  const row = db
    .prepare(
      `
        ${requestSelect}
        WHERE qr.id = ?
        LIMIT 1
      `,
    )
    .get(id)

  return row ? toQuoteRequest(row) : null
}

export function listQuoteRequestsForProfessional(
  professionalId: string,
): QuoteRequestRecord[] {
  return db
    .prepare(
      `
        ${requestSelect}
        WHERE qr.professional_id = ?
        ORDER BY
          CASE qr.status
            WHEN 'pending' THEN 0
            WHEN 'accepted' THEN 1
            WHEN 'completed' THEN 2
            WHEN 'declined' THEN 3
            WHEN 'cancelled' THEN 4
          END,
          qr.created_at DESC
      `,
    )
    .all(professionalId)
    .map((row) => toQuoteRequest(row))
}

export function listQuoteRequestsForClient(
  clientUserId: string,
): QuoteRequestRecord[] {
  return db
    .prepare(
      `
        ${requestSelect}
        WHERE qr.client_user_id = ?
        ORDER BY qr.created_at DESC
      `,
    )
    .all(clientUserId)
    .map((row) => toQuoteRequest(row))
}

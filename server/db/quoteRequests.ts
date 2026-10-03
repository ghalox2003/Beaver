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

export type AdminQuoteListFilters = {
  search?: string
  status?: QuoteRequestStatus
  clientUserId?: string
  professionalId?: string
  professionalLocation?: string
  minBudget?: number
  maxBudget?: number
  preferredDateFrom?: string
  preferredDateTo?: string
  sort?: 'newest' | 'oldest' | 'budget-high' | 'budget-low' | 'date-asc' | 'date-desc'
  page: number
  limit: number
}

export type AdminQuoteListResult = {
  quotes: QuoteRequestRecord[]
  page: number
  limit: number
  total: number
  totalPages: number
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

export function listAdminQuoteRequests(
  filters: AdminQuoteListFilters,
): AdminQuoteListResult {
  const where: string[] = []
  const params: Array<string | number> = []

  if (filters.status) {
    where.push('qr.status = ?')
    params.push(filters.status)
  }

  if (filters.clientUserId) {
    where.push('qr.client_user_id = ?')
    params.push(filters.clientUserId)
  }

  if (filters.professionalId) {
    where.push('qr.professional_id = ?')
    params.push(filters.professionalId)
  }

  if (filters.professionalLocation) {
    where.push('p.location LIKE ?')
    params.push(`%${filters.professionalLocation}%`)
  }

  if (filters.search) {
    where.push(`(
      qr.title LIKE ?
      OR qr.description LIKE ?
      OR qr.location LIKE ?
      OR client.full_name LIKE ?
      OR client.email LIKE ?
      OR pro.full_name LIKE ?
      OR p.business_name LIKE ?
      OR p.location LIKE ?
    )`)

    const search = `%${filters.search}%`
    params.push(
      search,
      search,
      search,
      search,
      search,
      search,
      search,
      search,
    )
  }

  if (filters.minBudget !== undefined) {
    where.push('qr.budget IS NOT NULL AND qr.budget >= ?')
    params.push(filters.minBudget)
  }

  if (filters.maxBudget !== undefined) {
    where.push('qr.budget IS NOT NULL AND qr.budget <= ?')
    params.push(filters.maxBudget)
  }

  if (filters.preferredDateFrom) {
    where.push(
      'qr.preferred_date IS NOT NULL AND qr.preferred_date >= ?',
    )
    params.push(filters.preferredDateFrom)
  }

  if (filters.preferredDateTo) {
    where.push(
      'qr.preferred_date IS NOT NULL AND qr.preferred_date <= ?',
    )
    params.push(filters.preferredDateTo)
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''

  const countRow = db
    .prepare(
      `
        SELECT COUNT(*) AS count
        FROM quote_requests qr
        JOIN users client ON client.id = qr.client_user_id
        JOIN professionals p ON p.id = qr.professional_id
        JOIN users pro ON pro.id = p.user_id
        ${whereSql}
      `,
    )
    .get(...params) as Record<string, unknown>

  const total = Number(countRow.count)
  const totalPages = Math.max(1, Math.ceil(total / filters.limit))
  const page = Math.min(Math.max(filters.page, 1), totalPages)
  const offset = (page - 1) * filters.limit

  const orderBy =
    filters.sort === 'oldest'
      ? 'qr.created_at ASC'
      : filters.sort === 'budget-high'
        ? 'qr.budget DESC NULLS LAST, qr.created_at DESC'
        : filters.sort === 'budget-low'
          ? 'qr.budget ASC NULLS LAST, qr.created_at DESC'
          : filters.sort === 'date-asc'
            ? 'qr.preferred_date ASC NULLS LAST, qr.created_at DESC'
            : filters.sort === 'date-desc'
              ? 'qr.preferred_date DESC NULLS LAST, qr.created_at DESC'
              : 'qr.created_at DESC'

  const rows = db
    .prepare(
      `
        ${requestSelect}
        ${whereSql}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `,
    )
    .all(...params, filters.limit, offset) as QuoteRequestRow[]

  return {
    quotes: rows.map(toQuoteRequest),
    page,
    limit: filters.limit,
    total,
    totalPages,
  }
}

export function deleteQuoteRequestById(id: string): void {
  db.prepare('DELETE FROM quote_requests WHERE id = ?').run(id)
}

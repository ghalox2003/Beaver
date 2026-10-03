import { randomUUID } from 'node:crypto'
import { db } from './connection.ts'

export type VerificationStatus = 'unverified' | 'pending' | 'verified'
export type Availability = 'available' | 'busy' | 'unavailable'

export type TradeRecord = {
  id: string
  name: string
  slug: string
  description: string
}

export type ProfessionalRecord = {
  id: string
  userId: string
  fullName: string
  email: string
  businessName: string
  description: string
  trade: TradeRecord
  location: string
  latitude: number
  longitude: number
  serviceRadius: number
  yearsExperience: number
  website: string | null
  verificationStatus: VerificationStatus
  availability: Availability
  createdAt: string
}

type ProfessionalRow = Record<string, unknown>

function toTrade(row: ProfessionalRow): TradeRecord {
  return {
    id: String(row.trade_id),
    name: String(row.trade_name),
    slug: String(row.trade_slug),
    description: String(row.trade_description),
  }
}

function toProfessional(row: ProfessionalRow): ProfessionalRecord {
  return {
    id: String(row.id),
    userId: String(row.user_id),
    fullName: String(row.full_name),
    email: String(row.email),
    businessName: String(row.business_name),
    description: String(row.description),
    trade: toTrade(row),
    location: String(row.location),
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    serviceRadius: Number(row.service_radius),
    yearsExperience: Number(row.years_experience),
    website: row.website === null ? null : String(row.website),
    verificationStatus: row.verification_status as VerificationStatus,
    availability: row.availability as Availability,
    createdAt: String(row.created_at),
  }
}

const professionalSelect = `
  SELECT
    p.id,
    p.user_id,
    u.full_name,
    u.email,
    p.business_name,
    p.description,
    p.location,
    p.latitude,
    p.longitude,
    p.service_radius,
    p.years_experience,
    p.website,
    p.verification_status,
    p.availability,
    p.created_at,
    t.id AS trade_id,
    t.name AS trade_name,
    t.slug AS trade_slug,
    t.description AS trade_description
  FROM professionals p
  JOIN users u ON u.id = p.user_id
  JOIN trades t ON t.id = p.trade_id
  WHERE u.status = 'active'
`

export function listTrades(): TradeRecord[] {
  return db
    .prepare('SELECT id, name, slug, description FROM trades ORDER BY name')
    .all()
    .map((row) => ({
      id: String(row.id),
      name: String(row.name),
      slug: String(row.slug),
      description: String(row.description),
    }))
}

export function listProfessionals(filters: {
  search?: string
  trade?: string
  location?: string
  serviceRadius?: number
  verified?: boolean
  availability?: Availability
  sort?: 'name' | 'experience' | 'newest'
}): ProfessionalRecord[] {
  const conditions = ["u.status = 'active'"]
  const params: (string | number)[] = []

  if (filters.search) {
    conditions.push(`
      (
        p.business_name LIKE ?
        OR u.full_name LIKE ?
        OR p.description LIKE ?
        OR p.location LIKE ?
        OR t.name LIKE ?
      )
    `)
    const search = `%${filters.search}%`
    params.push(search, search, search, search, search)
  }

  if (filters.trade) {
    conditions.push('(t.slug = ? OR t.id = ?)')
    params.push(filters.trade, filters.trade)
  }

  if (filters.location) {
    conditions.push('p.location LIKE ?')
    params.push(`%${filters.location}%`)
  }

  if (filters.serviceRadius !== undefined) {
    conditions.push('p.service_radius >= ?')
    params.push(filters.serviceRadius)
  }

  if (filters.verified) {
    conditions.push("p.verification_status = 'verified'")
  }

  if (filters.availability) {
    conditions.push('p.availability = ?')
    params.push(filters.availability)
  }

  const orderBy =
    filters.sort === 'experience'
      ? 'p.years_experience DESC, p.business_name ASC'
      : filters.sort === 'newest'
        ? 'p.created_at DESC'
        : 'p.business_name ASC'

  const rows = db
    .prepare(
      `
        ${professionalSelect}
        ${conditions.slice(1).length ? `AND ${conditions.slice(1).join(' AND ')}` : ''}
        ORDER BY ${orderBy}
      `,
    )
    .all(...params)

  return rows.map((row) => toProfessional(row))
}

export function findProfessionalById(id: string): ProfessionalRecord | null {
  const row = db
    .prepare(
      `
        ${professionalSelect}
        AND p.id = ?
        LIMIT 1
      `,
    )
    .get(id)

  return row ? toProfessional(row) : null
}

export function findProfessionalByUserId(
  userId: string,
): ProfessionalRecord | null {
  const row = db
    .prepare(
      `
        ${professionalSelect}
        AND p.user_id = ?
        LIMIT 1
      `,
    )
    .get(userId)

  return row ? toProfessional(row) : null
}

export function createTrade(input: {
  id: string
  name: string
  slug: string
  description: string
}): TradeRecord {
  db.prepare(
    'INSERT INTO trades (id, name, slug, description) VALUES (?, ?, ?, ?)',
  ).run(input.id, input.name, input.slug, input.description)

  const row = db
    .prepare('SELECT id, name, slug, description FROM trades WHERE id = ?')
    .get(input.id)

  if (!row) throw new Error('Trade was not created')

  return {
    id: String(row.id),
    name: String(row.name),
    slug: String(row.slug),
    description: String(row.description),
  }
}

export function createProfessional(input: {
  userId: string
  businessName: string
  description: string
  tradeId: string
  location: string
  latitude: number
  longitude: number
  serviceRadius: number
  yearsExperience: number
  website?: string | null
  verificationStatus?: VerificationStatus
  availability?: Availability
}): ProfessionalRecord {
  const id = randomUUID()

  db.prepare(
    `
      INSERT INTO professionals (
        id,
        user_id,
        business_name,
        description,
        trade_id,
        location,
        latitude,
        longitude,
        service_radius,
        years_experience,
        website,
        verification_status,
        availability
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    id,
    input.userId,
    input.businessName,
    input.description,
    input.tradeId,
    input.location,
    input.latitude,
    input.longitude,
    input.serviceRadius,
    input.yearsExperience,
    input.website ?? null,
    input.verificationStatus ?? 'unverified',
    input.availability ?? 'available',
  )

  const created = findProfessionalById(id)
  if (!created) throw new Error('Professional was not created')

  return created
}

import { randomUUID } from 'node:crypto'
import { db } from './connection.ts'

export type UserRole = 'client' | 'professional' | 'admin'

export type UserRecord = {
  id: string
  email: string
  passwordHash: string
  fullName: string
  role: UserRole
  status: 'active' | 'suspended'
  createdAt: string
}

type NewUser = {
  email: string
  passwordHash: string
  fullName: string
  role: UserRole
}

export type AdminUserListFilters = {
  search?: string
  role?: 'client' | 'professional'
  trade?: string
  location?: string
  verificationStatus?: 'unverified' | 'pending' | 'verified'
  availability?: 'available' | 'busy' | 'unavailable'
  sort?: 'newest' | 'oldest' | 'name'
  page: number
  limit: number
}

export type AdminUserListItem = {
  id: string
  email: string
  fullName: string
  role: UserRole
  status: 'active' | 'suspended'
  createdAt: string
  businessName: string | null
  trade: string | null
  location: string | null
  verificationStatus: 'unverified' | 'pending' | 'verified' | null
  availability: 'available' | 'busy' | 'unavailable' | null
}

export type AdminUserListResult = {
  users: AdminUserListItem[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export type AdminUserDetail = {
  id: string
  email: string
  fullName: string
  role: UserRole
  status: 'active' | 'suspended'
  createdAt: string
  businessName: string | null
  description: string | null
  trade: string | null
  location: string | null
  latitude: number | null
  longitude: number | null
  serviceRadius: number | null
  yearsExperience: number | null
  website: string | null
  verificationStatus: 'unverified' | 'pending' | 'verified' | null
  availability: 'available' | 'busy' | 'unavailable' | null
  professionalCreatedAt: string | null
  professionalUpdatedAt: string | null
}

function toUser(row: Record<string, unknown> | undefined): UserRecord | null {
  if (!row) return null
  return {
    id: String(row.id),
    email: String(row.email),
    passwordHash: String(row.password_hash),
    fullName: String(row.full_name),
    role: row.role as UserRole,
    status: row.status as 'active' | 'suspended',
    createdAt: String(row.created_at),
  }
}

export function findUserByEmail(email: string): UserRecord | null {
  return toUser(db.prepare('SELECT * FROM users WHERE email = ?').get(email.trim()))
}

export function findUserById(id: string): UserRecord | null {
  return toUser(db.prepare('SELECT * FROM users WHERE id = ?').get(id))
}

export function createUser(input: NewUser): UserRecord {
  const id = randomUUID()
  db.prepare(
    'INSERT INTO users (id, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)',
  ).run(id, input.email.trim(), input.passwordHash, input.fullName.trim(), input.role)

  const created = findUserById(id)
  if (!created) throw new Error('User was not created')
  return created
}

function toAdminUserListItem(row: Record<string, unknown>): AdminUserListItem {
  return {
    id: String(row.id),
    email: String(row.email),
    fullName: String(row.full_name),
    role: row.role as UserRole,
    status: row.status as 'active' | 'suspended',
    createdAt: String(row.created_at),
    businessName: row.business_name === null ? null : String(row.business_name),
    trade: row.trade_name === null ? null : String(row.trade_name),
    location: row.professional_location === null ? null : String(row.professional_location),
    verificationStatus:
      row.verification_status === null
        ? null
        : (row.verification_status as 'unverified' | 'pending' | 'verified'),
    availability:
      row.availability === null
        ? null
        : (row.availability as 'available' | 'busy' | 'unavailable'),
  }
}

export function listAdminUsers(
  filters: AdminUserListFilters,
): AdminUserListResult {
  const where: string[] = []
  const params: Array<string | number> = []

  if (filters.role) {
    where.push('u.role = ?')
    params.push(filters.role)
  }

  if (filters.search) {
    where.push(`(
      u.full_name LIKE ?
      OR u.email LIKE ?
      OR p.business_name LIKE ?
      OR p.location LIKE ?
      OR t.name LIKE ?
    )`)

    const search = `%${filters.search}%`
    params.push(search, search, search, search, search)
  }

  if (filters.trade) {
    where.push('t.name = ?')
    params.push(filters.trade)
  }

  if (filters.location) {
    where.push('p.location LIKE ?')
    params.push(`%${filters.location}%`)
  }

  if (filters.verificationStatus) {
    where.push('p.verification_status = ?')
    params.push(filters.verificationStatus)
  }

  if (filters.availability) {
    where.push('p.availability = ?')
    params.push(filters.availability)
  }

  const whereSql = where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''

  const countRow = db
    .prepare(
      `
        SELECT COUNT(*) AS count
        FROM users u
        LEFT JOIN professionals p ON p.user_id = u.id
        LEFT JOIN trades t ON t.id = p.trade_id
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
      ? 'u.created_at ASC'
      : filters.sort === 'name'
        ? 'u.full_name COLLATE NOCASE ASC'
        : 'u.created_at DESC'

  const rows = db
    .prepare(
      `
        SELECT
          u.id,
          u.email,
          u.full_name,
          u.role,
          u.status,
          u.created_at,
          p.business_name,
          p.location AS professional_location,
          p.verification_status,
          p.availability,
          t.name AS trade_name
        FROM users u
        LEFT JOIN professionals p ON p.user_id = u.id
        LEFT JOIN trades t ON t.id = p.trade_id
        ${whereSql}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `,
    )
    .all(...params, filters.limit, offset) as Record<string, unknown>[]

  return {
    users: rows.map(toAdminUserListItem),
    page,
    limit: filters.limit,
    total,
    totalPages,
  }
}

export function findAdminUserById(id: string): AdminUserDetail | null {
  const row = db
    .prepare(
      `
        SELECT
          u.id,
          u.email,
          u.full_name,
          u.role,
          u.status,
          u.created_at,
          p.business_name,
          p.description,
          p.location AS professional_location,
          p.latitude,
          p.longitude,
          p.service_radius,
          p.years_experience,
          p.website,
          p.verification_status,
          p.availability,
          p.created_at AS professional_created_at,
          p.updated_at AS professional_updated_at,
          t.name AS trade_name
        FROM users u
        LEFT JOIN professionals p ON p.user_id = u.id
        LEFT JOIN trades t ON t.id = p.trade_id
        WHERE u.id = ?
        LIMIT 1
      `,
    )
    .get(id) as Record<string, unknown> | undefined

  if (!row) return null

  return {
    id: String(row.id),
    email: String(row.email),
    fullName: String(row.full_name),
    role: row.role as UserRole,
    status: row.status as 'active' | 'suspended',
    createdAt: String(row.created_at),
    businessName: row.business_name === null ? null : String(row.business_name),
    description: row.description === null ? null : String(row.description),
    trade: row.trade_name === null ? null : String(row.trade_name),
    location:
      row.professional_location === null
        ? null
        : String(row.professional_location),
    latitude: row.latitude === null ? null : Number(row.latitude),
    longitude: row.longitude === null ? null : Number(row.longitude),
    serviceRadius:
      row.service_radius === null ? null : Number(row.service_radius),
    yearsExperience:
      row.years_experience === null ? null : Number(row.years_experience),
    website: row.website === null ? null : String(row.website),
    verificationStatus:
      row.verification_status === null
        ? null
        : (row.verification_status as 'unverified' | 'pending' | 'verified'),
    availability:
      row.availability === null
        ? null
        : (row.availability as 'available' | 'busy' | 'unavailable'),
    professionalCreatedAt:
      row.professional_created_at === null
        ? null
        : String(row.professional_created_at),
    professionalUpdatedAt:
      row.professional_updated_at === null
        ? null
        : String(row.professional_updated_at),
  }
}

export function deleteUserById(id: string): void {
  db.prepare('DELETE FROM users WHERE id = ?').run(id)
}

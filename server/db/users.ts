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

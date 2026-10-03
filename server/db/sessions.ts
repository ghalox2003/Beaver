import { createHash, randomBytes } from 'node:crypto'
import { config } from '../config.ts'
import { db } from './connection.ts'
import { findUserById } from './users.ts'
import type { UserRecord } from './users.ts'

// Only the SHA-256 of the token is stored, so a leaked database has no usable sessions.
const hashToken = (token: string) => createHash('sha256').update(token).digest('hex')

export function createSession(userId: string): { token: string; expiresAt: Date } {
  const token = randomBytes(32).toString('base64url')
  const expiresAt = new Date(Date.now() + config.sessionTtlMs)

  db.prepare('INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)').run(
    hashToken(token),
    userId,
    expiresAt.toISOString(),
  )

  return { token, expiresAt }
}

/** Returns the user for a valid session token, or null if it is unknown, expired, or the user is suspended. */
export function getUserForSession(token: string): UserRecord | null {
  const id = hashToken(token)
  const row = db.prepare('SELECT user_id, expires_at FROM sessions WHERE id = ?').get(id)
  if (!row) return null

  if (String(row.expires_at) <= new Date().toISOString()) {
    db.prepare('DELETE FROM sessions WHERE id = ?').run(id)
    return null
  }

  const user = findUserById(String(row.user_id))
  if (!user || user.status !== 'active') {
    db.prepare('DELETE FROM sessions WHERE id = ?').run(id)
    return null
  }

  db.prepare("UPDATE sessions SET last_seen_at = datetime('now') WHERE id = ?").run(id)
  return user
}

export function deleteSession(token: string): void {
  db.prepare('DELETE FROM sessions WHERE id = ?').run(hashToken(token))
}

export function deleteExpiredSessions(): void {
  db.prepare('DELETE FROM sessions WHERE expires_at <= ?').run(new Date().toISOString())
}

export function startSessionCleanup(): void {
  deleteExpiredSessions()
  setInterval(deleteExpiredSessions, 60 * 60 * 1000).unref()
}

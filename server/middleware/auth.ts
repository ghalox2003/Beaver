import type { RequestHandler, Request, Response } from 'express'
import { config } from '../config.ts'
import { deleteSession, getUserForSession } from '../db/sessions.ts'
import type { UserRecord, UserRole } from '../db/users.ts'
import { parseCookies } from '../lib/cookies.ts'

export type AuthUser = {
  id: string
  email: string
  fullName: string
  role: UserRole
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser
  }
}

/** The only shape of a user that ever leaves the server (never the password hash). */
export function toAuthUser(user: UserRecord): AuthUser {
  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
}

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: config.isProduction,
  path: '/',
} as const

export function readSessionToken(req: Request): string | undefined {
  return parseCookies(req.headers.cookie)[config.sessionCookieName] || undefined
}

export function setSessionCookie(res: Response, token: string, expiresAt: Date): void {
  res.cookie(config.sessionCookieName, token, { ...cookieOptions, expires: expiresAt })
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(config.sessionCookieName, cookieOptions)
}

export function endSession(req: Request, res: Response): void {
  const token = readSessionToken(req)
  if (token) deleteSession(token)
  clearSessionCookie(res)
}

/** Requires a valid session. Sets req.user. */
export const requireAuth: RequestHandler = (req, res, next) => {
  const token = readSessionToken(req)

  if (!token) {
    res.status(401).json({ error: 'Authentication required.', code: 'unauthenticated' })
    return
  }

  const user = getUserForSession(token)
  if (!user) {
    clearSessionCookie(res)
    res.status(401).json({ error: 'Your session has expired. Please log in again.', code: 'session_expired' })
    return
  }

  req.user = toAuthUser(user)
  next()
}

/** Requires a valid session AND one of the given roles. The role always comes from the database, never from the client. */
export function requireRole(...roles: UserRole[]): RequestHandler[] {
  return [
    requireAuth,
    (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        res.status(403).json({ error: 'You do not have access to this resource.', code: 'forbidden' })
        return
      }
      next()
    },
  ]
}

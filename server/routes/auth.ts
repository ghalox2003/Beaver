import { Router } from 'express'
import { createSession } from '../db/sessions.ts'
import { createUser, findUserByEmail } from '../db/users.ts'
import { hashPassword, verifyPassword } from '../lib/password.ts'
import { validateLogin, validateSignup } from '../lib/validation.ts'
import { endSession, requireAuth, setSessionCookie, toAuthUser } from '../middleware/auth.ts'
import { rateLimit } from '../middleware/rateLimit.ts'

export const authRouter = Router()

const signupLimiter = rateLimit({ windowMs: 60 * 60 * 1000, max: 10, message: 'Too many sign-up attempts. Try again later.' })
const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: 'Too many login attempts. Try again in a few minutes.' })

// Verified against when the email is unknown, so response time does not reveal which emails exist.
const dummyHash = hashPassword('beaver-timing-equalizer')

authRouter.use((_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store')
  next()
})

authRouter.post('/signup', signupLimiter, async (req, res) => {
  const parsed = validateSignup(req.body)
  if (!parsed.ok) {
    res.status(400).json({ error: 'Please check the form.', code: 'validation_error', fields: parsed.fields })
    return
  }

  const { fullName, email, password, role } = parsed.value
  const emailTaken = { error: 'An account with this email already exists.', code: 'email_taken' }

  if (findUserByEmail(email)) {
    res.status(409).json(emailTaken)
    return
  }

  let user
  try {
    user = createUser({ email, fullName, role, passwordHash: await hashPassword(password) })
  } catch (error) {
    // Two signups with the same email at the same moment: the UNIQUE constraint decides.
    if (error instanceof Error && /UNIQUE/i.test(error.message)) {
      res.status(409).json(emailTaken)
      return
    }
    throw error
  }

  const session = createSession(user.id)
  setSessionCookie(res, session.token, session.expiresAt)
  res.status(201).json({ user: toAuthUser(user) })
})

authRouter.post('/login', loginLimiter, async (req, res) => {
  const parsed = validateLogin(req.body)
  if (!parsed.ok) {
    res.status(400).json({ error: 'Please check the form.', code: 'validation_error', fields: parsed.fields })
    return
  }

  const { email, password } = parsed.value
  const user = findUserByEmail(email)
  const passwordMatches = await verifyPassword(password, user ? user.passwordHash : await dummyHash)

  if (!user || !passwordMatches) {
    res.status(401).json({ error: 'Invalid email or password.', code: 'invalid_credentials' })
    return
  }

  if (user.status !== 'active') {
    res.status(403).json({ error: 'This account has been suspended.', code: 'account_suspended' })
    return
  }

  const session = createSession(user.id)
  setSessionCookie(res, session.token, session.expiresAt)
  res.json({ user: toAuthUser(user) })
})

authRouter.post('/logout', (req, res) => {
  endSession(req, res)
  res.status(204).end()
})

authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

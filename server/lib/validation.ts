export type Fields = Record<string, string>
export type Result<T> = { ok: true; value: T } | { ok: false; fields: Fields }

export type SignupInput = {
  fullName: string
  email: string
  password: string
  role: 'client' | 'professional'
}

export type LoginInput = { email: string; password: string }

// Keep these rules in sync with the password requirements on the signup page.
const passwordRules: { message: string; test: (password: string) => boolean }[] = [
  { message: 'at least 8 characters', test: (p) => p.length >= 8 },
  { message: 'one uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { message: 'one lowercase letter', test: (p) => /[a-z]/.test(p) },
  { message: 'one number', test: (p) => /\d/.test(p) },
  { message: 'one special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

// Hashing cost grows with input size, so cap it.
const MAX_PASSWORD_LENGTH = 128

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function text(body: Record<string, unknown>, key: string): string {
  const value = body[key]
  return typeof value === 'string' ? value : ''
}

function checkEmail(email: string, fields: Fields) {
  if (!email) fields.email = 'Email is required.'
  else if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fields.email = 'Enter a valid email address.'
  }
}

export function validateSignup(body: unknown): Result<SignupInput> {
  const fields: Fields = {}
  const input = isRecord(body) ? body : {}

  const fullName = text(input, 'fullName').trim()
  const email = text(input, 'email').trim().toLowerCase()
  const password = text(input, 'password')
  const role = input.role

  if (!fullName) fields.fullName = 'Full name is required.'
  else if (fullName.length > 100) fields.fullName = 'Full name is too long.'

  checkEmail(email, fields)

  const unmet = passwordRules.filter((rule) => !rule.test(password)).map((rule) => rule.message)
  if (password.length > MAX_PASSWORD_LENGTH) fields.password = 'Password is too long.'
  else if (unmet.length) fields.password = `Password needs ${unmet.join(', ')}.`

  // Admin accounts can never be created through signup.
  if (role !== 'client' && role !== 'professional') fields.role = 'Choose client or professional.'

  if (Object.keys(fields).length) return { ok: false, fields }
  return { ok: true, value: { fullName, email, password, role: role as SignupInput['role'] } }
}

export function validateLogin(body: unknown): Result<LoginInput> {
  const fields: Fields = {}
  const input = isRecord(body) ? body : {}

  const email = text(input, 'email').trim().toLowerCase()
  const password = text(input, 'password')

  checkEmail(email, fields)
  if (!password) fields.password = 'Password is required.'
  else if (password.length > MAX_PASSWORD_LENGTH) fields.password = 'Password is too long.'

  if (Object.keys(fields).length) return { ok: false, fields }
  return { ok: true, value: { email, password } }
}

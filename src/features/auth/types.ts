export type UserRole = 'client' | 'professional' | 'admin'

export type AuthUser = {
  id: string
  email: string
  fullName: string
  role: UserRole
}

export type LoginInput = { email: string; password: string }

export type SignupInput = {
  fullName: string
  email: string
  password: string
  role: 'client' | 'professional'
}

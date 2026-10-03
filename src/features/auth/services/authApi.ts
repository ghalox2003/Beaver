import { apiRequest } from '../../../lib/api'
import type { AuthUser, LoginInput, SignupInput } from '../types'

type UserResponse = { user: AuthUser }

export async function fetchCurrentUser(): Promise<AuthUser> {
  return (await apiRequest<UserResponse>('/auth/me')).user
}

export async function login(input: LoginInput): Promise<AuthUser> {
  return (await apiRequest<UserResponse>('/auth/login', { method: 'POST', body: input })).user
}

export async function signup(input: SignupInput): Promise<AuthUser> {
  return (await apiRequest<UserResponse>('/auth/signup', { method: 'POST', body: input })).user
}

export async function logout(): Promise<void> {
  await apiRequest<void>('/auth/logout', { method: 'POST' })
}

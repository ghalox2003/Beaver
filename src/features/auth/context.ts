import { createContext } from 'react'
import type { AuthUser, LoginInput, SignupInput } from './types'

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated'

export type AuthContextValue = {
  user: AuthUser | null
  status: AuthStatus
  sessionExpired: boolean
  login: (input: LoginInput) => Promise<AuthUser>
  signup: (input: SignupInput) => Promise<AuthUser>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

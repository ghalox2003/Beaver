import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { onSessionExpired } from '../../../lib/api'
import { AuthContext } from '../context'
import type { AuthContextValue, AuthStatus } from '../context'
import * as authApi from '../services/authApi'
import type { AuthUser, LoginInput, SignupInput } from '../types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    let cancelled = false

    onSessionExpired(() => {
      setUser(null)
      setStatus('unauthenticated')
      setSessionExpired(true)
    })

    authApi
      .fetchCurrentUser()
      .then((current) => {
        if (cancelled) return
        setUser(current)
        setStatus('authenticated')
      })
      .catch(() => {
        if (cancelled) return
        setUser(null)
        setStatus('unauthenticated')
      })

    return () => {
      cancelled = true
      onSessionExpired(null)
    }
  }, [])

  const login = useCallback(async (input: LoginInput) => {
    const current = await authApi.login(input)
    setUser(current)
    setStatus('authenticated')
    setSessionExpired(false)
    return current
  }, [])

  const signup = useCallback(async (input: SignupInput) => {
    const created = await authApi.signup(input)
    setUser(created)
    setStatus('authenticated')
    setSessionExpired(false)
    return created
  }, [])

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => undefined)
    setUser(null)
    setStatus('unauthenticated')
    setSessionExpired(false)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, sessionExpired, login, signup, logout }),
    [user, status, sessionExpired, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

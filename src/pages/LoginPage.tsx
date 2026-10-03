import { useState } from 'react'
import type { FormEvent } from 'react'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { dashboardPathForRole, useAuth } from '../features/auth'
import { ApiError } from '../lib/api'
import type { FieldErrors } from '../lib/api'

type LocationState = { from?: { pathname?: string } } | null

const inputClass =
  'w-full rounded-2xl border border-forest-900/10 bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-forest-900/30 focus:border-forest-700 focus:ring-4 focus:ring-sage/25 disabled:cursor-not-allowed disabled:opacity-60'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, login, sessionExpired } = useAuth()
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const redirectTo = (location.state as LocationState)?.from?.pathname
  const notice = sessionExpired
    ? 'Your session expired. Please log in again.'
    : redirectTo
      ? 'Log in to continue.'
      : ''

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      setError('Please fill in all fields with valid information.')
      form.reportValidity()
      return
    }

    const data = new FormData(form)

    setError('')
    setFieldErrors({})
    setIsSubmitting(true)

    try {
      const current = await login({
        email: String(data.get('email') ?? '').trim(),
        password: String(data.get('password') ?? ''),
      })
      navigate(redirectTo ?? dashboardPathForRole(current.role), { replace: true })
    } catch (caught) {
      if (caught instanceof ApiError) {
        setError(caught.message)
        setFieldErrors(caught.fields)
      } else {
        setError('Something went wrong. Please try again.')
      }
      setIsSubmitting(false)
    }
  }

  if (user && !isSubmitting) {
    return <Navigate to={dashboardPathForRole(user.role)} replace />
  }

  return (
    <div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
          Welcome back
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Log in to Beaver
        </h1>

        <p className="mt-4 text-base leading-7 text-forest-900/60">
          Sign in to manage your jobs, applications, and conversations.
        </p>
      </div>

      {notice && (
        <p className="mt-6 rounded-2xl bg-sage/25 px-4 py-3 text-sm font-medium text-forest-900">
          {notice}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate={false}>
        <div>
          <label htmlFor="login-email" className="mb-2 block text-sm font-bold">
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            placeholder="you@example.com"
            className={inputClass}
          />
          {fieldErrors.email && (
            <p className="mt-2 text-sm font-medium text-red-700">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="login-password" className="block text-sm font-bold">
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-forest-700 transition hover:text-forest-900"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              disabled={isSubmitting}
              placeholder="Enter your password"
              className={`${inputClass} pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              disabled={isSubmitting}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-forest-900/45 transition hover:bg-forest-900/5 hover:text-forest-900 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="mt-2 text-sm font-medium text-red-700">{fieldErrors.password}</p>
          )}
        </div>

        {error && (
          <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-900 px-5 py-3.5 text-sm font-bold !text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" size={18} />}
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-forest-900/55">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="font-bold text-forest-700 transition hover:text-forest-900"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}

export default LoginPage

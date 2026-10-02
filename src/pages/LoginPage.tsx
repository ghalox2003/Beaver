import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      setError('Please fill in all fields with valid information.')
      form.reportValidity()
      return
    }

    setError('')
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

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate={false}>
        <div>
          <label
            htmlFor="login-email"
            className="mb-2 block text-sm font-bold"
          >
            Email address
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-forest-900/10 bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-forest-900/30 focus:border-forest-700 focus:ring-4 focus:ring-sage/25"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label
              htmlFor="login-password"
              className="block text-sm font-bold"
            >
              Password
            </label>

            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-forest-700 transition hover:text-forest-900"
            >
              Forgot password?
            </Link>
          </div>

          <input
            id="login-password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
            className="w-full rounded-2xl border border-forest-900/10 bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-forest-900/30 focus:border-forest-700 focus:ring-4 focus:ring-sage/25"
          />
        </div>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-2xl bg-forest-900 px-5 py-3.5 text-sm font-bold !text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Log in
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

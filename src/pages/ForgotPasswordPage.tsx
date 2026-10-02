import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function ForgotPasswordPage() {
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    if (!form.checkValidity()) {
      setError('Please enter a valid email address.')
      form.reportValidity()
      return
    }

    setError('')
  }

  return (
    <div>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 transition hover:text-forest-900"
      >
        <ArrowLeft size={16} />
        Back to login
      </Link>

      <div className="mt-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
          Account recovery
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Reset your password
        </h1>

        <p className="mt-4 text-base leading-7 text-forest-900/60">
          Enter your email and we will send you a link to reset your password.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="reset-email"
            className="mb-2 block text-sm font-bold"
          >
            Email address
          </label>
          <input
            id="reset-email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
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
          Send reset link
        </button>
      </form>
    </div>
  )
}

export default ForgotPasswordPage

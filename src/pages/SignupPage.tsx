import { useState } from 'react'
import type { FormEvent } from 'react'
import { Check, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

type PasswordRequirement = {
  label: string
  test: (password: string) => boolean
}

const passwordRequirements: PasswordRequirement[] = [
  {
    label: 'At least 8 characters',
    test: (password) => password.length >= 8,
  },
  {
    label: 'One uppercase letter',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: 'One lowercase letter',
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: 'One number',
    test: (password) => /\d/.test(password),
  },
  {
    label: 'One special character',
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
]

function SignupPage() {
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const passwordIsValid = passwordRequirements.every((requirement) =>
    requirement.test(password),
  )

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget

    if (!passwordIsValid) {
      setError('Please meet all password requirements.')
      return
    }

    if (!form.checkValidity()) {
      setError('Please fill in all fields with valid information.')
      form.reportValidity()
      return
    }

    setError('')
    setIsSubmitting(true)

    // Account creation will be connected to the backend later.
    setIsSubmitting(false)
  }

  return (
    <div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-forest-700">
          Join Beaver
        </p>

        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Create your account
        </h1>

        <p className="mt-4 text-base leading-7 text-forest-900/60">
          Get started by telling us a little about yourself.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-bold"
          >
            Full name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            required
            disabled={isSubmitting}
            placeholder="Your full name"
            className="w-full rounded-2xl border border-forest-900/10 bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-forest-900/30 focus:border-forest-700 focus:ring-4 focus:ring-sage/25 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-bold"
          >
            Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            disabled={isSubmitting}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-forest-900/10 bg-paper px-4 py-3.5 text-sm outline-none transition placeholder:text-forest-900/30 focus:border-forest-700 focus:ring-4 focus:ring-sage/25 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-bold"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value)
                setError('')
              }}
              required
              disabled={isSubmitting}
              placeholder="Create a password"
              className="w-full rounded-2xl border border-forest-900/10 bg-paper px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-forest-900/30 focus:border-forest-700 focus:ring-4 focus:ring-sage/25 disabled:cursor-not-allowed disabled:opacity-60"
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

          <div className="mt-3 rounded-2xl bg-forest-900/[0.03] p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-forest-900/45">
              Password requirements
            </p>

            <ul className="grid gap-1.5 sm:grid-cols-2">
              {passwordRequirements.map((requirement) => {
                const isMet = requirement.test(password)

                return (
                  <li
                    key={requirement.label}
                    className={`flex items-center gap-2 text-xs font-medium transition ${
                      isMet
                        ? 'text-forest-700'
                        : 'text-forest-900/40'
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                        isMet
                          ? 'bg-sage/40'
                          : 'border border-forest-900/15'
                      }`}
                    >
                      {isMet && <Check size={11} strokeWidth={3} />}
                    </span>
                    {requirement.label}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <fieldset disabled={isSubmitting}>
          <legend className="mb-2 block text-sm font-bold">
            I want to use Beaver as a
          </legend>

          <div className="grid grid-cols-2 gap-3">
            <label className="cursor-pointer rounded-2xl border border-forest-900/10 bg-paper p-4 transition has-[:checked]:border-forest-700 has-[:checked]:bg-sage/20">
              <input
                type="radio"
                name="role"
                value="client"
                required
                defaultChecked
                className="sr-only"
              />
              <span className="block text-sm font-bold">Client</span>
              <span className="mt-1 block text-xs leading-5 text-forest-900/50">
                I need work done
              </span>
            </label>

            <label className="cursor-pointer rounded-2xl border border-forest-900/10 bg-paper p-4 transition has-[:checked]:border-forest-700 has-[:checked]:bg-sage/20">
              <input
                type="radio"
                name="role"
                value="professional"
                className="sr-only"
              />
              <span className="block text-sm font-bold">Professional</span>
              <span className="mt-1 block text-xs leading-5 text-forest-900/50">
                I offer my services
              </span>
            </label>
          </div>
        </fieldset>

        {error && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-900 px-5 py-3.5 text-sm font-bold !text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" size={18} />}
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-forest-900/55">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-forest-700 transition hover:text-forest-900"
        >
          Log in
        </Link>
      </p>
    </div>
  )
}

export default SignupPage

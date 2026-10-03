import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Send,
  WalletCards,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageContainer from '../components/PageContainer'
import {
  createQuoteRequest,
  getProfessional,
  type Professional,
} from '../features/professionals'
import { useAuth } from '../features/auth'
import { ApiError } from '../lib/api'
import { getCurrencyForLocation } from '../lib/currency'

function ProfessionalQuoteRequestPage() {
  const { id } = useParams()
  const { user } = useAuth()

  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [budget, setBudget] = useState('')

  useEffect(() => {
    if (!id) return

    const professionalId = id
    let cancelled = false

    async function loadProfessional() {
      setLoading(true)
      setError(null)

      try {
        const response = await getProfessional(professionalId)

        if (!cancelled) {
          setProfessional(response.professional)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : 'Unable to load this professional.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadProfessional()

    return () => {
      cancelled = true
    }
  }, [id])

  if (loading) {
    return <LoadingState message="Loading quote request..." />
  }

  if (error || !professional) {
    return (
      <PageContainer>
        <ErrorState
          title="Professional unavailable"
          message={error ?? 'This professional could not be found.'}
          action={
            <Link
              to="/professionals"
              className="inline-flex items-center rounded-xl bg-forest-900 px-4 py-2 text-sm font-bold text-paper"
            >
              Back to professionals
            </Link>
          }
        />
      </PageContainer>
    )
  }

  if (!user) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-3xl font-extrabold text-forest-950">
            Sign in to request a quote
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-forest-900/60">
            Create a Beaver client account or sign in to send your request to{' '}
            {professional.businessName}.
          </p>

          <div className="mt-7 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-2xl bg-forest-900 px-5 py-3 text-sm font-extrabold !text-paper"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-2xl border border-forest-900/10 bg-paper px-5 py-3 text-sm font-extrabold text-forest-900"
            >
              Create account
            </Link>
          </div>
        </div>
      </PageContainer>
    )
  }

  if (user.role !== 'client') {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl py-16 text-center">
          <h1 className="text-3xl font-extrabold text-forest-950">
            Client account required
          </h1>
          <p className="mt-3 text-forest-900/60">
            Quote requests can currently be submitted from a client account.
          </p>
          <Link
            to={`/professionals/${professional.id}`}
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-forest-900 px-5 py-3 text-sm font-extrabold text-paper"
          >
            <ArrowLeft className="size-4" />
            Back to profile
          </Link>
        </div>
      </PageContainer>
    )
  }

  if (submitted) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-2xl py-16">
          <div className="rounded-3xl border border-forest-900/10 bg-paper p-8 text-center shadow-sm">
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-sage/30 text-forest-800">
              <CheckCircle2 className="size-8" />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
              Request sent
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-forest-950">
              Your quote request is on its way.
            </h1>

            <p className="mx-auto mt-3 max-w-lg leading-6 text-forest-900/60">
              {professional.businessName} can now review your request and
              follow up with you through Beaver.
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <Link
                to="/client"
                className="inline-flex items-center gap-2 rounded-2xl bg-forest-900 px-5 py-3 text-sm font-extrabold"
                style={{ color: '#f4f1e8' }}
              >
                Go to dashboard
                <ArrowUpRight className="size-4" />
              </Link>

              <Link
                to={`/professionals/${professional.id}`}
                className="rounded-2xl border border-forest-900/10 px-5 py-3 text-sm font-extrabold text-forest-900"
              >
                View profile
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!id) return

    setSubmitting(true)
    setError(null)

    try {
      await createQuoteRequest({
        professionalId: id,
        title,
        description,
        location,
        preferredDate: preferredDate || undefined,
        budget: budget ? Number(budget) : undefined,
      })

      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to send your quote request.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-5xl py-10">
        <Link
          to={`/professionals/${professional.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-forest-700 transition hover:text-forest-950"
        >
          <ArrowLeft className="size-4" />
          Back to profile
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <main className="rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
                Request a quote
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-forest-950">
                Tell them what you need.
              </h1>
              <p className="mt-3 max-w-2xl leading-6 text-forest-900/60">
                Give {professional.businessName} enough detail to understand
                the job and get back to you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {error && (
                <div className="rounded-2xl border border-red-900/10 bg-red-50 px-4 py-3 text-sm font-semibold text-red-900">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="title"
                  className="text-sm font-bold text-forest-950"
                >
                  What do you need?
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Repair a leaking kitchen pipe"
                  maxLength={120}
                  required
                  className="mt-2 w-full rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-sage/40"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-sm font-bold text-forest-950"
                >
                  Describe the job
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the work, what is broken, approximate size, materials involved, or anything else that could help."
                  maxLength={5000}
                  rows={6}
                  required
                  className="mt-2 w-full resize-y rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm leading-6 outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-sage/40"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="text-sm font-bold text-forest-950"
                >
                  Job location
                </label>
                <div className="relative mt-2">
                  <MapPin className="pointer-events-none absolute left-4 top-3.5 size-4 text-forest-900/40" />
                  <input
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="e.g. Hay Riad, Rabat"
                    maxLength={200}
                    required
                    className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-sage/40"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="text-sm font-bold text-forest-950"
                  >
                    Preferred date
                  </label>
                  <div className="relative mt-2">
                    <CalendarDays className="pointer-events-none absolute left-4 top-3.5 size-4 text-forest-900/40" />
                    <input
                      id="preferredDate"
                      type="date"
                      value={preferredDate}
                      onChange={(event) =>
                        setPreferredDate(event.target.value)
                      }
                      className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-sage/40"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="text-sm font-bold text-forest-950"
                  >
                    Budget ({professional ? getCurrencyForLocation(professional.location) : 'currency'}){' '}
                    <span className="font-normal text-forest-900/45">(optional)</span>
                  </label>
                  <div className="relative mt-2">
                    <WalletCards className="pointer-events-none absolute left-4 top-3.5 size-4 text-forest-900/40" />
                    <input
                      id="budget"
                      type="number"
                      min="0"
                      step="0.01"
                      value={budget}
                      onChange={(event) => setBudget(event.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none transition focus:border-forest-700 focus:ring-2 focus:ring-sage/40"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest-900 px-5 py-3.5 text-sm font-extrabold text-paper transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="size-4" />
                {submitting ? 'Sending request...' : 'Send quote request'}
              </button>
            </form>
          </main>

          <aside className="h-fit rounded-3xl border border-forest-900/10 bg-forest-900 p-6 text-paper shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage">
              Your request
            </p>

            <div className="mt-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-paper/45">
                Professional
              </p>
              <h2 className="mt-1 text-xl font-extrabold">
                {professional.businessName}
              </h2>
              <p className="mt-1 text-sm text-paper/60">
                {professional.trade.name}
              </p>
            </div>

            <div className="mt-6 space-y-3 border-t border-paper/10 pt-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-sage" />
                <span className="text-sm text-paper/65">
                  {professional.location}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 shrink-0 text-sage" />
                <span className="text-sm text-paper/65">
                  {professional.availability === 'available'
                    ? 'Currently available'
                    : professional.availability === 'busy'
                      ? 'Currently busy'
                      : 'Currently unavailable'}
                </span>
              </div>
            </div>

            <p className="mt-6 border-t border-paper/10 pt-5 text-xs leading-5 text-paper/45">
              Your contact details are attached to the request automatically.
              You don't need to enter them again.
            </p>
          </aside>
        </div>
      </div>
    </PageContainer>
  )
}

export default ProfessionalQuoteRequestPage

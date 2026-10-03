import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  WalletCards,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'
import {
  getIncomingQuoteRequests,
  type QuoteRequest,
} from '../features/professionals'
import { ApiError } from '../lib/api'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
  }).format(new Date(value))
}

function ProfessionalDashboardPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadRequests() {
      setLoading(true)
      setError(null)

      try {
        const response = await getIncomingQuoteRequests()

        if (!cancelled) {
          setRequests(response.requests)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : 'Unable to load your quote requests.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadRequests()

    return () => {
      cancelled = true
    }
  }, [])

  const pendingCount = requests.filter(
    (request) => request.status === 'pending',
  ).length

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Professional dashboard"
        title="Your Beaver dashboard"
        description="Review quote requests from clients and keep track of opportunities coming your way."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
            Incoming requests
          </p>
          <p className="mt-2 text-3xl font-extrabold text-forest-950">
            {requests.length}
          </p>
        </div>

        <div className="rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
            Awaiting response
          </p>
          <p className="mt-2 text-3xl font-extrabold text-forest-950">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
            Workspace
          </p>
          <p className="mt-2 text-lg font-extrabold text-forest-950">
            Professional
          </p>
        </div>
      </div>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
              Client requests
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-forest-950">
              Incoming quote requests
            </h2>
          </div>
        </div>

        {loading && (
          <div className="mt-5 rounded-3xl border border-forest-900/10 bg-paper p-8 text-center text-sm font-semibold text-forest-900/50">
            Loading requests...
          </div>
        )}

        {!loading && error && (
          <div className="mt-5 rounded-3xl border border-red-900/10 bg-red-50 p-6 text-sm font-semibold text-red-900">
            {error}
          </div>
        )}

        {!loading && !error && requests.length === 0 && (
          <div className="mt-5 rounded-3xl border border-dashed border-forest-900/15 bg-paper p-10 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-sage/30 text-forest-800">
              <CheckCircle2 className="size-6" />
            </div>

            <h3 className="mt-4 text-lg font-extrabold text-forest-950">
              No requests yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-forest-900/55">
              When a client requests a quote from your professional profile,
              their request will appear here.
            </p>
          </div>
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="mt-5 space-y-4">
            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-sage/30 px-3 py-1 text-xs font-bold capitalize text-forest-800">
                        {request.status}
                      </span>

                      <span className="text-xs font-semibold text-forest-900/40">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>

                    <h3 className="mt-3 text-xl font-extrabold text-forest-950">
                      {request.title}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-forest-700">
                      Requested by {request.clientName}
                    </p>
                  </div>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-6 text-forest-900/65">
                  {request.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-forest-900/65">
                    <MapPin className="size-3.5" />
                    {request.location}
                  </span>

                  {request.preferredDate && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-forest-900/65">
                      <CalendarDays className="size-3.5" />
                      Preferred {request.preferredDate}
                    </span>
                  )}

                  {request.budget !== null && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-forest-900/65">
                      <WalletCards className="size-3.5" />
                      Budget {request.budget.toLocaleString(undefined, {
                        style: 'currency',
                        currency: request.currency,
                        maximumFractionDigits: 0,
                      })}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-col gap-2 border-t border-forest-900/8 pt-4 text-sm text-forest-900/55 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    <strong className="text-forest-900">
                      {request.clientEmail}
                    </strong>
                  </span>

                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-4" />
                    Request received {formatDate(request.createdAt)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  )
}

export default ProfessionalDashboardPage

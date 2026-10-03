import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  UserRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'
import {
  getMyQuoteRequests,
  type QuoteRequest,
} from '../features/professionals'

function formatDate(value: string | null) {
  if (!value) return 'No preferred date'
  return new Date(value).toLocaleDateString()
}

function ClientDashboardPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadRequests() {
      try {
        const response = await getMyQuoteRequests()

        if (!cancelled) {
          setRequests(response.requests)
        }
      } catch {
        if (!cancelled) {
          setError('We could not load your quote requests.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadRequests()

    return () => {
      cancelled = true
    }
  }, [])

  const pendingRequests = requests.filter(
    (request) => request.status === 'pending',
  )
  const activeJobs = requests.filter(
    (request) => request.status === 'accepted',
  )
  const completedJobs = requests.filter(
    (request) => request.status === 'completed',
  )

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Client dashboard"
        title="Your Beaver dashboard"
        description="Manage your jobs, discover professionals, and keep track of your activity."
      />

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-sage/25 text-forest-800">
              <Clock3 className="size-5" />
            </div>
            <span className="text-3xl font-extrabold text-forest-900">
              {loading ? '—' : pendingRequests.length}
            </span>
          </div>
          <p className="mt-5 text-sm font-bold text-forest-900">
            Pending quotes
          </p>
          <p className="mt-1 text-sm text-forest-900/55">
            Requests waiting for a professional response.
          </p>
        </div>

        <div className="rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-sage/25 text-forest-800">
              <BriefcaseBusiness className="size-5" />
            </div>
            <span className="text-3xl font-extrabold text-forest-900">
              {loading ? '—' : activeJobs.length}
            </span>
          </div>
          <p className="mt-5 text-sm font-bold text-forest-900">
            Active jobs
          </p>
          <p className="mt-1 text-sm text-forest-900/55">
            Accepted requests currently in progress.
          </p>
        </div>

        <div className="rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-sage/25 text-forest-800">
              <CheckCircle2 className="size-5" />
            </div>
            <span className="text-3xl font-extrabold text-forest-900">
              {loading ? '—' : completedJobs.length}
            </span>
          </div>
          <p className="mt-5 text-sm font-bold text-forest-900">
            Completed jobs
          </p>
          <p className="mt-1 text-sm text-forest-900/55">
            Jobs completed through Beaver.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
            Requests
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-forest-900">
            Pending quote requests
          </h2>
          <p className="mt-2 text-sm text-forest-900/55">
            Keep track of the professionals currently reviewing your requests.
          </p>
        </div>

        {loading && (
          <div className="mt-6 rounded-2xl bg-forest-900/5 p-6 text-sm text-forest-900/60">
            Loading your quote requests…
          </div>
        )}

        {!loading && error && (
          <div className="mt-6 rounded-2xl border border-red-900/10 bg-red-50 p-5 text-sm text-red-800">
            {error}
          </div>
        )}

        {!loading && !error && pendingRequests.length === 0 && (
          <div className="mt-6 rounded-2xl bg-forest-900/5 p-8 text-center">
            <p className="font-bold text-forest-900">
              No pending quote requests.
            </p>
            <p className="mt-1 text-sm text-forest-900/55">
              When you request a quote from a professional, it will appear here.
            </p>
          </div>
        )}

        {!loading && !error && pendingRequests.length > 0 && (
          <div className="mt-6 space-y-4">
            {pendingRequests.map((request) => (
              <article
                key={request.id}
                className="rounded-2xl border border-forest-900/10 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-sage/25 px-3 py-1 text-xs font-bold text-forest-800">
                        Pending
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-extrabold text-forest-900">
                      {request.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-forest-900/65">
                      <UserRound className="size-4" />
                      {request.businessName}
                    </div>
                  </div>

                  <div className="text-sm text-forest-900/55 md:text-right">
                    <p>{request.professionalName}</p>
                    <p className="mt-1">{formatDate(request.createdAt)}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-forest-900/65">
                  {request.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-forest-900/10 pt-4 text-sm text-forest-900/60">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4" />
                    {request.location}
                  </span>

                  <span>
                    Preferred date: {formatDate(request.preferredDate)}
                  </span>

                  <span>
                    Budget:{' '}
                    {request.budget === null
                      ? 'Not specified'
                      : request.budget.toLocaleString(undefined, {
                          style: 'currency',
                          currency: request.currency,
                          maximumFractionDigits: 0,
                        })}
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

export default ClientDashboardPage

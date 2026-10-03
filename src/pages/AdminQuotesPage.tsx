import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'

type QuoteStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'cancelled'
  | 'completed'

type Quote = {
  id: string
  clientUserId: string
  clientName: string
  clientEmail: string
  professionalId: string
  professionalName: string
  businessName: string
  title: string
  description: string
  location: string
  professionalLocation: string
  preferredDate: string | null
  budget: number | null
  currency: string
  status: QuoteStatus
  createdAt: string
  updatedAt: string
}

type QuoteResponse = {
  quotes: Quote[]
  page: number
  limit: number
  total: number
  totalPages: number
}

function formatDate(value: string | null) {
  if (!value) return '—'

  const date = new Date(value.includes(' ') ? value.replace(' ', 'T') + 'Z' : value)

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function formatBudget(budget: number | null, currency: string) {
  if (budget === null) return 'No budget'

  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(budget)
}

function statusClass(status: QuoteStatus) {
  switch (status) {
    case 'pending':
      return 'bg-amber-100 text-amber-800'
    case 'accepted':
      return 'bg-green-100 text-green-800'
    case 'completed':
      return 'bg-blue-100 text-blue-800'
    case 'declined':
    case 'cancelled':
      return 'bg-red-100 text-red-800'
  }
}

function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [professionalLocation, setProfessionalLocation] = useState('')
  const [minBudget, setMinBudget] = useState('')
  const [maxBudget, setMaxBudget] = useState('')
  const [preferredDateFrom, setPreferredDateFrom] = useState('')
  const [preferredDateTo, setPreferredDateTo] = useState('')
  const [sort, setSort] = useState('newest')

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Quote | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchQuotes = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: '10',
          sort,
        })

        if (search.trim()) params.set('search', search.trim())
        if (status) params.set('status', status)

        if (professionalLocation.trim()) {
          params.set('professionalLocation', professionalLocation.trim())
        }

        if (minBudget.trim()) params.set('minBudget', minBudget.trim())
        if (maxBudget.trim()) params.set('maxBudget', maxBudget.trim())

        if (preferredDateFrom) {
          params.set('preferredDateFrom', preferredDateFrom)
        }

        if (preferredDateTo) {
          params.set('preferredDateTo', preferredDateTo)
        }

        const response = await fetch(
          `/api/admin/quote-requests?${params.toString()}`,
          { credentials: 'include' },
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load quotes.')
        }

        if (cancelled) return

        const result = data as QuoteResponse

        setQuotes(result.quotes)
        setTotal(result.total)
        setTotalPages(Math.max(result.totalPages, 1))
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load quotes.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void fetchQuotes()

    return () => {
      cancelled = true
    }
  }, [
    page,
    search,
    status,
    professionalLocation,
    minBudget,
    maxBudget,
    preferredDateFrom,
    preferredDateTo,
    sort,
  ])

  const deleteQuote = async () => {
    if (!deleteTarget) return

    setDeleteLoading(true)
    setError('')

    try {
      const response = await fetch(
        `/api/admin/quote-requests/${deleteTarget.id}`,
        {
          method: 'DELETE',
          credentials: 'include',
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete quote.')
      }

      setDeleteTarget(null)

      if (selectedQuote?.id === deleteTarget.id) {
        setSelectedQuote(null)
      }

      if (quotes.length === 1 && page > 1) {
        setPage((current) => current - 1)
      } else {
        const params = new URLSearchParams({
          page: String(page),
          limit: '10',
          sort,
        })

        if (search.trim()) params.set('search', search.trim())
        if (status) params.set('status', status)
        if (professionalLocation.trim()) {
          params.set('professionalLocation', professionalLocation.trim())
        }
        if (minBudget.trim()) params.set('minBudget', minBudget.trim())
        if (maxBudget.trim()) params.set('maxBudget', maxBudget.trim())
        if (preferredDateFrom) {
          params.set('preferredDateFrom', preferredDateFrom)
        }
        if (preferredDateTo) {
          params.set('preferredDateTo', preferredDateTo)
        }

        const refresh = await fetch(
          `/api/admin/quote-requests?${params.toString()}`,
          { credentials: 'include' },
        )

        const refreshed = await refresh.json()

        if (!refresh.ok) {
          throw new Error(refreshed.error || 'Failed to refresh quotes.')
        }

        setQuotes(refreshed.quotes)
        setTotal(refreshed.total)
        setTotalPages(Math.max(refreshed.totalPages, 1))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quote.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const resetFilters = () => {
    setSearch('')
    setStatus('')
    setProfessionalLocation('')
    setMinBudget('')
    setMaxBudget('')
    setPreferredDateFrom('')
    setPreferredDateTo('')
    setSort('newest')
    setPage(1)
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Quote management"
        title="Quotes"
        description="Review, inspect, filter, and remove marketplace quote requests."
      />

      <div className="mt-8 rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr]">
          <label className="relative block">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-900/40"
            />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search title, client, professional, location..."
              className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none focus:border-forest-900/30"
            />
          </label>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value)
              setPage(1)
            }}
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          >
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={sort}
            onChange={(event) => {
              setSort(event.target.value)
              setPage(1)
            }}
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="budget-high">Budget high → low</option>
            <option value="budget-low">Budget low → high</option>
            <option value="date-asc">Work date earliest</option>
            <option value="date-desc">Work date latest</option>
          </select>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <input
            value={professionalLocation}
            onChange={(event) => {
              setProfessionalLocation(event.target.value)
              setPage(1)
            }}
            placeholder="Professional location"
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          />

          <input
            type="number"
            min="0"
            value={minBudget}
            onChange={(event) => {
              setMinBudget(event.target.value)
              setPage(1)
            }}
            placeholder="Minimum budget"
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          />

          <input
            type="number"
            min="0"
            value={maxBudget}
            onChange={(event) => {
              setMaxBudget(event.target.value)
              setPage(1)
            }}
            placeholder="Maximum budget"
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          />

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-2xl border border-forest-900/10 px-5 py-3 text-sm font-bold transition hover:bg-cream"
          >
            Reset filters
          </button>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <label className="relative">
            <CalendarDays
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-900/40"
            />
            <input
              type="date"
              value={preferredDateFrom}
              onChange={(event) => {
                setPreferredDateFrom(event.target.value)
                setPage(1)
              }}
              className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none"
            />
          </label>

          <label className="relative">
            <CalendarDays
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-900/40"
            />
            <input
              type="date"
              value={preferredDateTo}
              onChange={(event) => {
                setPreferredDateTo(event.target.value)
                setPage(1)
              }}
              className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-forest-900/50">
          {total} {total === 1 ? 'quote' : 'quotes'}
        </p>

        {error && (
          <p className="text-sm font-semibold text-red-700">{error}</p>
        )}
      </div>

      <div className="mt-3 overflow-hidden rounded-3xl border border-forest-900/10 bg-paper">
        <div className="max-h-[620px] overflow-y-auto">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-forest-900/10 border-t-forest-900" />
            </div>
          ) : quotes.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <FileText size={32} className="text-forest-900/30" />
              <h2 className="mt-4 text-lg font-extrabold">
                No quotes found
              </h2>
              <p className="mt-2 text-sm text-forest-900/50">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-forest-900/10">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-cream/60"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedQuote(quote)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-extrabold">
                        {quote.title}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${statusClass(quote.status)}`}
                      >
                        {quote.status}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-forest-900/50">
                      <span>{quote.clientName}</span>
                      <span>{quote.businessName}</span>
                      <span>{quote.location}</span>
                    </div>
                  </button>

                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-extrabold">
                      {formatBudget(quote.budget, quote.currency)}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-forest-900/40">
                      Work: {formatDate(quote.preferredDate)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(quote)}
                    title="Delete quote"
                    className="rounded-xl p-2.5 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-semibold text-forest-900/50">
          Page {page} of {totalPages}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(current - 1, 1))}
            className="rounded-xl border border-forest-900/10 bg-paper p-2.5 transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1)
            .slice(
              Math.max(0, Math.min(page - 3, totalPages - 5)),
              Math.min(totalPages, Math.max(5, page + 2)),
            )
            .map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                onClick={() => setPage(pageNumber)}
                className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition ${
                  pageNumber === page
                    ? 'bg-forest-900 text-white'
                    : 'border border-forest-900/10 bg-paper hover:bg-cream'
                }`}
              >
                {pageNumber}
              </button>
            ))}

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() =>
              setPage((current) => Math.min(current + 1, totalPages))
            }
            className="rounded-xl border border-forest-900/10 bg-paper p-2.5 transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {selectedQuote && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8">
          <button
            type="button"
            aria-label="Close quote details"
            onClick={() => setSelectedQuote(null)}
            className="absolute inset-0 bg-forest-900/30 backdrop-blur-sm"
          />

          <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-paper p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
                  Quote overview
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                  {selectedQuote.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                className="rounded-xl p-2 transition hover:bg-cream"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase ${statusClass(selectedQuote.status)}`}
              >
                {selectedQuote.status}
              </span>

              <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-bold">
                {formatBudget(selectedQuote.budget, selectedQuote.currency)}
              </span>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                ['Client', selectedQuote.clientName],
                ['Client email', selectedQuote.clientEmail],
                ['Professional', selectedQuote.professionalName],
                ['Business', selectedQuote.businessName],
                ['Job location', selectedQuote.location],
                [
                  'Professional location',
                  selectedQuote.professionalLocation,
                ],
                ['Preferred work date', formatDate(selectedQuote.preferredDate)],
                ['Created', formatDate(selectedQuote.createdAt)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                    {label}
                  </p>
                  <p className="mt-2 break-words text-sm font-bold">
                    {value || '—'}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-cream p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                Description
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-forest-900/70">
                {selectedQuote.description}
              </p>
            </div>

            <div className="mt-7 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setSelectedQuote(null)
                  setDeleteTarget(selectedQuote)
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete quote
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-5">
          <button
            type="button"
            aria-label="Cancel deletion"
            onClick={() => !deleteLoading && setDeleteTarget(null)}
            className="absolute inset-0 bg-forest-900/40 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-md rounded-3xl bg-paper p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold">
              Delete this quote?
            </h2>

            <p className="mt-3 text-sm leading-6 text-forest-900/60">
              This permanently removes the quote request from Beaver.
            </p>

            <div className="mt-7 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => setDeleteTarget(null)}
                className="rounded-xl border border-forest-900/10 px-4 py-2.5 text-sm font-bold transition hover:bg-cream disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => void deleteQuote()}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleteLoading ? 'Deleting...' : 'Delete permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  )
}

export default AdminQuotesPage

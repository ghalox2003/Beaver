import { SlidersHorizontal, Sparkles, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'
import {
  getProfessionals,
  getTrades,
  ProfessionalCard,
  type Professional,
  type Trade,
} from '../features/professionals'
import ProfessionalsMap from '../features/map/components/ProfessionalsMap'
import { ApiError } from '../lib/api'

function ProfessionalsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [professionals, setProfessionals] = useState<Professional[]>([])
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)
  const [tradesLoading, setTradesLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [location, setLocation] = useState(searchParams.get('location') ?? '')
  const [trade, setTrade] = useState(searchParams.get('trade') ?? '')
  const [availability, setAvailability] = useState(
    searchParams.get('availability') ?? '',
  )
  const [serviceRadius, setServiceRadius] = useState(
    searchParams.get('serviceRadius') ?? '',
  )
  const [verified, setVerified] = useState(searchParams.get('verified') === 'true')
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'name')
  const [selectedId, setSelectedId] = useState<string | undefined>()

  useEffect(() => {
      let active = true

    getTrades()
      .then((result) => {
        if (active) setTrades(result.trades)
      })
      .finally(() => {
        if (active) setTradesLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const active = true
      setLoading(true)
      setError(null)

      getProfessionals({
        search,
        location,
        trade,
        availability,
        serviceRadius,
        verified,
        sort,
      })
        .then((result) => {
          if (active) {
            setProfessionals(result.professionals)
            setSelectedId((current) =>
              result.professionals.some((professional) => professional.id === current)
                ? current
                : result.professionals[0]?.id,
            )
          }
        })
        .catch((caught: unknown) => {
          if (active) {
            setError(
              caught instanceof Error && 'status' in caught
                ? (caught as ApiError)
                : new ApiError(500, 'Could not load professionals.'),
            )
          }
        })
        .finally(() => {
          if (active) setLoading(false)
        })
    }, 180)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [availability, location, search, serviceRadius, sort, trade, verified])

  useEffect(() => {
    const next = new URLSearchParams()

    if (search) next.set('search', search)
    if (location) next.set('location', location)
    if (trade) next.set('trade', trade)
    if (availability) next.set('availability', availability)
    if (serviceRadius) next.set('serviceRadius', serviceRadius)
    if (verified) next.set('verified', 'true')
    if (sort !== 'name') next.set('sort', sort)

    setSearchParams(next, { replace: true })
  }, [
    availability,
    location,
    search,
    serviceRadius,
    setSearchParams,
    sort,
    trade,
    verified,
  ])

  const activeFilters = useMemo(
    () =>
      [
        search,
        location,
        trade,
        availability,
        serviceRadius,
        verified ? 'verified' : '',
      ].filter(Boolean).length,
    [availability, location, search, serviceRadius, trade, verified],
  )

  function clearFilters() {
    setSearch('')
    setLocation('')
    setTrade('')
    setAvailability('')
    setServiceRadius('')
    setVerified(false)
    setSort('name')
  }

  return (
    <main className="min-h-[calc(100vh-6rem)] bg-cream">
      <PageContainer className="pb-16 pt-10">
        <PageHeader
          eyebrow="Professional marketplace"
          title="Find the right person for the job."
          description="Explore skilled tradespeople, compare their service areas, and discover professionals ready to help."
          action={
            <div className="hidden items-center gap-2 rounded-full border border-forest-900/10 bg-paper px-4 py-2 text-sm font-bold text-forest-800 sm:flex">
              <Sparkles className="size-4" />
              {professionals.length} professionals
            </div>
          }
        />

        <section className="mt-8 rounded-3xl border border-forest-900/10 bg-paper p-4 shadow-sm sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
            <label className="relative">
              <span className="sr-only">Search professionals</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search plumber, carpenter, Montreal..."
                className="h-12 w-full rounded-2xl border border-forest-900/10 bg-cream px-4 text-sm font-semibold outline-none transition placeholder:text-forest-900/35 focus:border-forest-700 focus:ring-4 focus:ring-sage/20"
              />
            </label>

            <label>
              <span className="sr-only">Trade</span>
              <select
                value={trade}
                onChange={(event) => setTrade(event.target.value)}
                disabled={tradesLoading}
                className="h-12 w-full rounded-2xl border border-forest-900/10 bg-cream px-4 text-sm font-bold outline-none focus:border-forest-700"
              >
                <option value="">All trades</option>
                {trades.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Availability</span>
              <select
                value={availability}
                onChange={(event) => setAvailability(event.target.value)}
                className="h-12 w-full rounded-2xl border border-forest-900/10 bg-cream px-4 text-sm font-bold outline-none focus:border-forest-700"
              >
                <option value="">Any availability</option>
                <option value="available">Available now</option>
                <option value="busy">Currently busy</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </label>

            <button
              type="button"
              onClick={() => setVerified((current) => !current)}
              className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl border px-4 text-sm font-bold transition ${
                verified
                  ? 'border-forest-800 bg-forest-900 !text-paper'
                  : 'border-forest-900/10 bg-cream text-forest-900 hover:border-forest-900/20'
              }`}
            >
              <SlidersHorizontal className="size-4" />
              Verified
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 border-t border-forest-900/8 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-wrap gap-3">
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Location"
                className="h-10 min-w-[150px] flex-1 rounded-xl border border-forest-900/10 bg-cream px-3 text-sm font-semibold outline-none focus:border-forest-700"
              />

              <select
                value={serviceRadius}
                onChange={(event) => setServiceRadius(event.target.value)}
                className="h-10 rounded-xl border border-forest-900/10 bg-cream px-3 text-sm font-bold outline-none focus:border-forest-700"
              >
                <option value="">Any service radius</option>
                <option value="25">25+ km</option>
                <option value="50">50+ km</option>
                <option value="75">75+ km</option>
              </select>

              {activeFilters > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-sm font-bold text-forest-700 hover:bg-cream"
                >
                  <X className="size-4" />
                  Clear {activeFilters} filter{activeFilters === 1 ? '' : 's'}
                </button>
              )}
            </div>

            <label className="flex shrink-0 items-center gap-2 text-sm font-bold">
              <span className="text-forest-900/50">Sort</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-10 rounded-xl border border-forest-900/10 bg-cream px-3 outline-none focus:border-forest-700"
              >
                <option value="name">Name</option>
                <option value="experience">Experience</option>
                <option value="newest">Newest</option>
              </select>
            </label>
          </div>
        </section>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(480px,1.08fr)]">
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-forest-900/55">
                {loading
                  ? 'Finding professionals...'
                  : `${professionals.length} result${professionals.length === 1 ? '' : 's'}`}
              </p>
            </div>

            {error ? (
              <ErrorState
                title="Could not load professionals"
                message={error.message}
              />
            ) : loading ? (
              <LoadingState message="Finding professionals..." />
            ) : professionals.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-forest-900/15 bg-paper p-10 text-center">
                <p className="text-xl font-extrabold">No professionals found.</p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-forest-900/55">
                  Try a broader search, another location, or remove one of the
                  filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-forest-900 px-5 py-2.5 text-sm font-bold !text-paper"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {professionals.map((professional) => (
                  <ProfessionalCard
                    key={professional.id}
                    professional={professional}
                    selected={professional.id === selectedId}
                    onSelect={() => setSelectedId(professional.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <aside className="xl:sticky xl:top-28 xl:h-[calc(100vh-9rem)]">
            <ProfessionalsMap
              professionals={professionals}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </aside>
        </div>
      </PageContainer>
    </main>
  )
}

export default ProfessionalsPage

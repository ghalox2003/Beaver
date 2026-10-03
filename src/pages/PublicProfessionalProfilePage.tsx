import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Clock3,
  Globe,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorState from '../components/ErrorState'
import LoadingState from '../components/LoadingState'
import PageContainer from '../components/PageContainer'
import {
  getProfessional,
  type Professional,
} from '../features/professionals'
import { ApiError } from '../lib/api'

function PublicProfessionalProfilePage() {
  const { id } = useParams<{ id: string }>()
  const [professional, setProfessional] = useState<Professional | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    if (!id) return

    getProfessional(id)
      .then((result) => setProfessional(result.professional))
      .catch((caught: unknown) => {
        setError(
          caught instanceof Error && 'status' in caught
            ? (caught as ApiError)
            : new ApiError(500, 'Could not load this professional.'),
        )
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-6rem)] bg-cream">
        <PageContainer>
          <LoadingState message="Loading professional profile..." />
        </PageContainer>
      </main>
    )
  }

  if (error || !professional) {
    return (
      <main className="min-h-[calc(100vh-6rem)] bg-cream">
        <PageContainer>
          <ErrorState
            title="Professional not found"
            message={error?.message ?? 'This profile may no longer be available.'}
          />
          <Link
            to="/professionals"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold !text-forest-800"
          >
            <ArrowLeft className="size-4" />
            Back to professionals
          </Link>
        </PageContainer>
      </main>
    )
  }

  const initials = professional.fullName
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  return (
    <main className="min-h-[calc(100vh-6rem)] bg-cream">
      <PageContainer className="pb-16 pt-10">
        <Link
          to="/professionals"
          className="inline-flex items-center gap-2 text-sm font-bold !text-forest-800"
        >
          <ArrowLeft className="size-4" />
          Back to professionals
        </Link>

        <section className="mt-6 overflow-hidden rounded-[2rem] border border-forest-900/10 bg-paper shadow-sm">
          <div className="h-32 bg-forest-900 sm:h-44" />

          <div className="-mt-12 px-5 pb-7 sm:-mt-16 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex size-24 items-center justify-center rounded-3xl border-4 border-paper bg-forest-900 text-2xl font-extrabold text-sage shadow-lg sm:size-32 sm:text-4xl">
                  {initials}
                </div>

                <div className="pb-1">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-forest-700">
                    {professional.trade.name}
                  </p>
                  <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {professional.businessName}
                  </h1>
                  <p className="mt-1 text-sm font-semibold text-forest-900/55">
                    {professional.fullName}
                  </p>
                </div>
              </div>

              {professional.verificationStatus === 'verified' && (
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-sage/25 px-4 py-2 text-sm font-bold text-forest-800">
                  <BadgeCheck className="size-5" />
                  Verified professional
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-cream p-4">
                <MapPin className="size-5 text-forest-700" />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-forest-900/45">
                  Based in
                </p>
                <p className="mt-1 font-bold">{professional.location}</p>
              </div>

              <div className="rounded-2xl bg-cream p-4">
                <BriefcaseBusiness className="size-5 text-forest-700" />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-forest-900/45">
                  Experience
                </p>
                <p className="mt-1 font-bold">
                  {professional.yearsExperience} years
                </p>
              </div>

              <div className="rounded-2xl bg-cream p-4">
                <MapPin className="size-5 text-forest-700" />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-forest-900/45">
                  Service area
                </p>
                <p className="mt-1 font-bold">
                  {professional.serviceRadius} km radius
                </p>
              </div>

              <div className="rounded-2xl bg-cream p-4">
                <Clock3 className="size-5 text-forest-700" />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-forest-900/45">
                  Availability
                </p>
                <p className="mt-1 font-bold">
                  {professional.availability === 'available'
                    ? 'Available now'
                    : professional.availability === 'busy'
                      ? 'Currently busy'
                      : 'Unavailable'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="rounded-3xl border border-forest-900/10 bg-paper p-6 shadow-sm sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
              About the professional
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Work you can understand before you hire.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-forest-900/65">
              {professional.description}
            </p>

            <div className="mt-8 border-t border-forest-900/8 pt-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-forest-700" />
                <div>
                  <p className="font-bold">Beaver profile information</p>
                  <p className="text-sm text-forest-900/50">
                    Professional details are provided through the Beaver marketplace.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-forest-900/10 bg-forest-900 p-6 text-paper shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage">
              Work with {professional.businessName}
            </p>
            <h2 className="mt-2 text-2xl font-extrabold">
              Ready to get the job done?
            </h2>
            <p className="mt-3 text-sm leading-6 text-paper/65">
              Tell this professional what you need and send a quote request
              directly through Beaver.
            </p>

            <Link
              to={`/professionals/${professional.id}/request`}
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-sage px-4 py-3.5 text-sm font-extrabold !text-forest-950 transition hover:brightness-105"
            >
              Request a quote
              <ArrowUpRight className="size-4" />
            </Link>

            {professional.website && (
              <a
                href={professional.website}
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center justify-between rounded-2xl bg-paper/10 px-4 py-3 text-sm font-bold !text-paper transition hover:bg-paper/15"
              >
                <span className="flex items-center gap-2">
                  <Globe className="size-4" />
                  Visit website
                </span>
                <ArrowUpRight className="size-4" />
              </a>
            )}

            <div className="mt-5 flex items-start gap-3 border-t border-paper/10 pt-5">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sage" />
              <p className="text-xs leading-5 text-paper/55">
                Beaver keeps the professional information and request flow in
                one place so clients can start with confidence.
              </p>
            </div>
          </aside>
        </div>
      </PageContainer>
    </main>
  )
}

export default PublicProfessionalProfilePage

import { ArrowUpRight, BadgeCheck, MapPin, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Professional } from '../types'

type ProfessionalCardProps = {
  professional: Professional
  selected?: boolean
  onSelect?: () => void
}

function ProfessionalCard({
  professional,
  selected = false,
  onSelect,
}: ProfessionalCardProps) {
  return (
    <article
      className={`group rounded-3xl border bg-paper p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        selected
          ? 'border-forest-700 ring-2 ring-sage/60'
          : 'border-forest-900/8'
      }`}
      onMouseEnter={onSelect}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest-900 text-lg font-extrabold text-sage">
            {professional.fullName
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold uppercase tracking-[0.14em] text-forest-700">
              {professional.trade.name}
            </p>
            <h2 className="truncate text-lg font-extrabold text-forest-950">
              {professional.businessName}
            </h2>
          </div>
        </div>

        {professional.verificationStatus === 'verified' && (
          <span
            title="Verified professional"
            className="flex shrink-0 items-center gap-1 rounded-full bg-sage/30 px-2.5 py-1 text-xs font-bold text-forest-800"
          >
            <BadgeCheck className="size-3.5" />
            Verified
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-forest-900/65">
        {professional.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-forest-900/65">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5">
          <MapPin className="size-3.5" />
          {professional.location}
        </span>

        <span className="rounded-full bg-cream px-3 py-1.5">
          {professional.yearsExperience} years experience
        </span>

        <span className="rounded-full bg-cream px-3 py-1.5">
          {professional.serviceRadius} km radius
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-forest-900/8 pt-4">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold ${
            professional.availability === 'available'
              ? 'text-forest-700'
              : professional.availability === 'busy'
                ? 'text-forest-900/55'
                : 'text-forest-900/35'
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              professional.availability === 'available'
                ? 'bg-forest-700'
                : professional.availability === 'busy'
                  ? 'bg-sage'
                  : 'bg-forest-900/25'
            }`}
          />
          {professional.availability === 'available'
            ? 'Available now'
            : professional.availability === 'busy'
              ? 'Currently busy'
              : 'Unavailable'}
        </span>

        <Link
          to={`/professionals/${professional.id}`}
          className="inline-flex items-center gap-1 text-sm font-bold !text-forest-800 transition group-hover:gap-2"
        >
          View profile
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {professional.verificationStatus === 'verified' && (
        <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-forest-900/45">
          <ShieldCheck className="size-3.5" />
          Identity and professional details verified
        </div>
      )}
    </article>
  )
}

export default ProfessionalCard

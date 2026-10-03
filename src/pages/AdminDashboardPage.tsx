import {
  ArrowRight,
  BriefcaseBusiness,
  FileText,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'

const sections = [
  {
    title: 'Quotes',
    description:
      'Review, search, filter, inspect, and remove quote requests from the marketplace.',
    to: '/admin/quotes',
    icon: FileText,
  },
  {
    title: 'Users',
    description:
      'Manage client and professional accounts, inspect profiles, and remove accounts.',
    to: '/admin/users',
    icon: Users,
  },
  {
    title: 'Jobs',
    description:
      'Current jobs will appear here once the core jobs workflow is implemented.',
    to: '/admin/jobs',
    icon: BriefcaseBusiness,
    disabled: true,
  },
]

function AdminDashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Admin dashboard"
        title="Beaver administration"
        description="Manage the people and activity powering the Beaver marketplace."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {sections.map(({ title, description, to, icon: Icon, disabled }) => {
          if (disabled) {
            return (
              <div
                key={title}
                className="rounded-3xl border border-forest-900/10 bg-paper p-7 opacity-70"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream text-forest-900">
                  <Icon size={23} />
                </div>

                <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
                  {title}
                </h2>

                <p className="mt-3 min-h-14 text-sm leading-6 text-forest-900/60">
                  {description}
                </p>

                <div className="mt-7 inline-flex items-center gap-2 rounded-xl bg-cream px-4 py-2.5 text-sm font-bold text-forest-900/50">
                  Coming soon
                </div>
              </div>
            )
          }

          return (
            <Link
              key={title}
              to={to}
              className="group rounded-3xl border border-forest-900/10 bg-paper p-7 transition hover:-translate-y-0.5 hover:border-forest-900/20 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-900 text-white transition group-hover:scale-105">
                <Icon size={23} />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold tracking-tight">
                {title}
              </h2>

              <p className="mt-3 min-h-14 text-sm leading-6 text-forest-900/60">
                {description}
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-forest-700">
                Manage {title.toLowerCase()}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          )
        })}
      </div>
    </PageContainer>
  )
}

export default AdminDashboardPage

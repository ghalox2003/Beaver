import {
  BriefcaseBusiness,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth'

type DashboardShellProps = {
  role: 'client' | 'professional' | 'admin'
}

const navigation = {
  client: [
    { label: 'Dashboard', to: '/client', icon: LayoutDashboard },
    { label: 'My jobs', to: '/client/jobs', icon: BriefcaseBusiness },
    { label: 'Professionals', to: '/client/professionals', icon: Search },
  ],
  professional: [
    { label: 'Dashboard', to: '/professional', icon: LayoutDashboard },
    { label: 'Find work', to: '/professional/jobs', icon: Search },
    {
      label: 'Applications',
      to: '/professional/applications',
      icon: BriefcaseBusiness,
    },
    { label: 'Profile', to: '/professional/profile', icon: UserRound },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard },
    { label: 'Users', to: '/admin/users', icon: UserRound },
    { label: 'Jobs', to: '/admin/jobs', icon: BriefcaseBusiness },
    { label: 'Reports', to: '/admin/reports', icon: ShieldCheck },
  ],
}

const roleLabels = {
  client: 'Client',
  professional: 'Professional',
  admin: 'Admin',
}

function DashboardShell({ role }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef<HTMLDivElement>(null)
  const initials =
    (user?.fullName ?? '')
      .split(/\s+/)
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U'
  const searchPath = {
    client: '/client/professionals',
    professional: '/professional/jobs',
    admin: '/admin/users',
  }[role]

  // Close the account menu on any outside click, or on Escape.
  useEffect(() => {
    if (!accountOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !accountRef.current?.contains(event.target)) {
        setAccountOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setAccountOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [accountOpen])

  async function handleLogout() {
    setMobileOpen(false)
    navigate('/', { replace: true })
    await logout()
  }

  const items = navigation[role]

  return (
    <div className="min-h-screen bg-cream text-forest-900">
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-forest-900/20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-forest-900/10 bg-paper px-5 py-6 transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-forest-900"
            onClick={() => setMobileOpen(false)}
          >
            Beaver
          </Link>

          <button
            type="button"
            aria-label="Close navigation"
            className="rounded-full p-2 text-forest-900/60 hover:bg-cream lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-8 rounded-2xl bg-cream px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest-700">
            Account
          </p>
          <p className="mt-1 truncate font-bold">{user?.fullName ?? roleLabels[role]}</p>
          <p className="truncate text-xs text-forest-900/50">{user?.email ?? roleLabels[role]}</p>
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === `/${role}`}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-forest-900 !text-white'
                    : 'text-forest-900/65 hover:bg-cream hover:text-forest-900'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-forest-900/65 hover:bg-cream hover:text-forest-900"
        >
          <LogOut size={18} />
          Log out
        </button>

        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-forest-900/65 hover:bg-cream hover:text-forest-900"
          onClick={() => setMobileOpen(false)}
        >
          <Settings size={18} />
          Back to website
        </Link>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-forest-900/10 bg-cream/90 px-5 backdrop-blur-md sm:px-8">
          <button
            type="button"
            aria-label="Open navigation"
            className="rounded-xl p-2 text-forest-900 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm font-bold text-forest-900/60">
              {roleLabels[role]} workspace
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to={searchPath}
              aria-label="Search"
              className="rounded-full p-2.5 text-forest-900/60 hover:bg-forest-900/5 hover:text-forest-900"
            >
              <Search size={19} />
            </Link>

            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-label="Account menu"
                aria-expanded={accountOpen}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-sm font-bold text-white transition hover:scale-105"
              >
                {initials}
              </button>

              {accountOpen && (
                <div className="absolute right-0 top-12 w-64 rounded-2xl border border-forest-900/10 bg-paper p-2 shadow-xl">
                  <div className="px-3 py-2">
                    <p className="truncate text-sm font-bold">{user?.fullName}</p>
                    <p className="truncate text-xs text-forest-900/50">{user?.email}</p>
                  </div>

                  <div className="my-1 border-t border-forest-900/10" />

                  <Link
                    to="/"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-cream"
                  >
                    <Settings size={16} />
                    Back to website
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false)
                      void handleLogout()
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-cream"
                  >
                    <LogOut size={16} />
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardShell

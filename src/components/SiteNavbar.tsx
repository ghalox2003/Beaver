import { Menu, Wrench, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { dashboardPathForRole, useAuth } from '../features/auth'

const navLinks = [
  { label: 'How it works', to: '/#how-it-works' },
  { label: 'Find a professional', to: '/professionals' },
  { label: 'For professionals', to: '/#for-pros' },
]

function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { user, status, logout } = useAuth()

  // Close the mobile menu on any click outside the navbar, or on Escape.
  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  async function handleLogout() {
    setMenuOpen(false)
    await logout()
  }

  const dashboardPath = user ? dashboardPathForRole(user.role) : null

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div ref={containerRef} className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between rounded-full border border-forest-900/10 bg-paper/90 px-4 py-3 shadow-lg shadow-forest-950/5 backdrop-blur-md sm:px-6">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-paper">
              <Wrench size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">beaver</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition-opacity hover:opacity-60">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {status === 'loading' ? null : dashboardPath ? (
              <>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-60"
                >
                  Log out
                </button>
                <Link
                  to={dashboardPath}
                  className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold !text-paper transition-transform hover:scale-[1.03]"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-60"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold !text-paper transition-transform hover:scale-[1.03]"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-full p-2 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="mt-2 rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl px-4 py-3 font-medium hover:bg-cream"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {status !== 'loading' && (
                <div className="mt-3 border-t border-forest-900/10 pt-3">
                  {dashboardPath && user ? (
                    <>
                      <p className="truncate px-4 pb-2 text-xs text-forest-900/50">
                        Signed in as {user.fullName}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="rounded-xl px-4 py-3 text-sm font-semibold hover:bg-cream"
                        >
                          Log out
                        </button>
                        <Link
                          to={dashboardPath}
                          onClick={() => setMenuOpen(false)}
                          className="rounded-xl bg-forest-900 px-4 py-3 text-center text-sm font-semibold !text-paper"
                        >
                          Dashboard
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-xl px-4 py-3 text-center text-sm font-semibold hover:bg-cream"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMenuOpen(false)}
                        className="rounded-xl bg-forest-900 px-4 py-3 text-center text-sm font-semibold !text-paper"
                      >
                        Get started
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default SiteNavbar

import { createPortal } from 'react-dom'
import {
  ChevronLeft,
  ChevronRight,
  Search,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import PageContainer from '../components/PageContainer'
import PageHeader from '../components/PageHeader'

type User = {
  id: string
  email: string
  fullName: string
  role: 'client' | 'professional' | 'admin'
  status: 'active' | 'suspended'
  createdAt: string
  businessName: string | null
  trade: string | null
  location: string | null
  verificationStatus: 'unverified' | 'pending' | 'verified' | null
  availability: 'available' | 'busy' | 'unavailable' | null
}

type UserDetail = User & {
  description: string | null
  latitude: number | null
  longitude: number | null
  serviceRadius: number | null
  yearsExperience: number | null
  website: string | null
  professionalCreatedAt: string | null
  professionalUpdatedAt: string | null
}

type UserResponse = {
  users: User[]
  page: number
  limit: number
  total: number
  totalPages: number
}

function formatDate(value: string) {
  const date = new Date(value.replace(' ', 'T') + 'Z')

  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function badgeClass(value: string) {
  switch (value) {
    case 'active':
    case 'verified':
    case 'available':
      return 'bg-green-100 text-green-800'
    case 'pending':
    case 'busy':
      return 'bg-amber-100 text-amber-800'
    case 'suspended':
    case 'unverified':
    case 'unavailable':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-cream text-forest-900/60'
  }
}

function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [trade, setTrade] = useState('')
  const [location, setLocation] = useState('')
  const [verificationStatus, setVerificationStatus] = useState('')
  const [availability, setAvailability] = useState('')
  const [sort, setSort] = useState('newest')

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [detailLoading, setDetailLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    setError('')

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: '10',
        sort,
      })

      if (search.trim()) params.set('search', search.trim())
      if (role) params.set('role', role)
      if (trade.trim()) params.set('trade', trade.trim())
      if (location.trim()) params.set('location', location.trim())
      if (verificationStatus) {
        params.set('verificationStatus', verificationStatus)
      }
      if (availability) params.set('availability', availability)

      const response = await fetch(`/api/admin/users?${params.toString()}`, {
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load users.')
      }

      const result = data as UserResponse

      setUsers(result.users)
      setTotal(result.total)
      setTotalPages(Math.max(result.totalPages, 1))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let cancelled = false

    const fetchUsers = async () => {
      setLoading(true)
      setError('')

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: '10',
          sort,
        })

        if (search.trim()) params.set('search', search.trim())
        if (role) params.set('role', role)
        if (trade.trim()) params.set('trade', trade.trim())
        if (location.trim()) params.set('location', location.trim())
        if (verificationStatus) {
          params.set('verificationStatus', verificationStatus)
        }
        if (availability) params.set('availability', availability)

        const response = await fetch(`/api/admin/users?${params.toString()}`, {
          credentials: 'include',
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to load users.')
        }

        if (cancelled) return

        const result = data as UserResponse
        setUsers(result.users)
        setTotal(result.total)
        setTotalPages(Math.max(result.totalPages, 1))
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load users.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void fetchUsers()

    return () => {
      cancelled = true
    }
  }, [page, search, role, trade, location, verificationStatus, availability, sort])

  const openUser = async (user: User) => {
    setSelectedUser(null)
    setDetailLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load user.')
      }

      setSelectedUser(data.user as UserDetail)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user.')
    } finally {
      setDetailLoading(false)
    }
  }

  const deleteUser = async () => {
    if (!deleteTarget) return

    setDeleteLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/admin/users/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user.')
      }

      if (selectedUser?.id === deleteTarget.id) {
        setSelectedUser(null)
      }

      setDeleteTarget(null)

      if (users.length === 1 && page > 1) {
        setPage((current) => current - 1)
      } else {
        await loadUsers()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user.')
    } finally {
      setDeleteLoading(false)
    }
  }

  const resetFilters = () => {
    setSearch('')
    setRole('')
    setTrade('')
    setLocation('')
    setVerificationStatus('')
    setAvailability('')
    setSort('newest')
    setPage(1)
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="User management"
        title="Users"
        description="Search, inspect, and manage every Beaver client and professional account."
      />

      <div className="mt-8 rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[2fr_repeat(3,1fr)]">
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
              placeholder="Search name, email, business, location..."
              className="w-full rounded-2xl border border-forest-900/10 bg-cream py-3 pl-11 pr-4 text-sm outline-none transition focus:border-forest-900/30"
            />
          </label>

          <select
            value={role}
            onChange={(event) => {
              setRole(event.target.value)
              setPage(1)
            }}
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          >
            <option value="">All roles</option>
            <option value="client">Clients</option>
            <option value="professional">Professionals</option>
          </select>

          <select
            value={verificationStatus}
            onChange={(event) => {
              setVerificationStatus(event.target.value)
              setPage(1)
            }}
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          >
            <option value="">All verification</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="unverified">Unverified</option>
          </select>

          <select
            value={availability}
            onChange={(event) => {
              setAvailability(event.target.value)
              setPage(1)
            }}
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          >
            <option value="">All availability</option>
            <option value="available">Available</option>
            <option value="busy">Busy</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
          <input
            value={trade}
            onChange={(event) => {
              setTrade(event.target.value)
              setPage(1)
            }}
            placeholder="Trade"
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          />

          <input
            value={location}
            onChange={(event) => {
              setLocation(event.target.value)
              setPage(1)
            }}
            placeholder="Location"
            className="rounded-2xl border border-forest-900/10 bg-cream px-4 py-3 text-sm outline-none"
          />

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
            <option value="name">Name A–Z</option>
          </select>

          <button
            type="button"
            onClick={resetFilters}
            className="rounded-2xl border border-forest-900/10 px-5 py-3 text-sm font-bold text-forest-900/70 transition hover:bg-cream"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-forest-900/50">
          {total} {total === 1 ? 'user' : 'users'}
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
          ) : users.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <UserRound size={32} className="text-forest-900/30" />
              <h2 className="mt-4 text-lg font-extrabold">No users found</h2>
              <p className="mt-2 text-sm text-forest-900/50">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-forest-900/10">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-cream/60"
                >
                  <button
                    type="button"
                    onClick={() => void openUser(user)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="truncate font-extrabold">
                        {user.fullName}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClass(user.role)}`}
                      >
                        {user.role}
                      </span>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeClass(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-forest-900/50">
                      <span>{user.email}</span>

                      {user.businessName && (
                        <span>{user.businessName}</span>
                      )}

                      {user.trade && <span>{user.trade}</span>}

                      {user.location && <span>{user.location}</span>}
                    </div>
                  </button>

                  <div className="hidden text-right sm:block">
                    <p className="text-xs font-semibold text-forest-900/40">
                      Joined
                    </p>
                    <p className="mt-1 text-sm font-bold">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDeleteTarget(user)}
                    disabled={user.role === 'admin'}
                    title={
                      user.role === 'admin'
                        ? 'Admin accounts cannot be deleted here'
                        : 'Delete account'
                    }
                    className="rounded-xl p-2.5 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-20"
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

      {selectedUser &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-5 py-8">
            <button
              type="button"
              aria-label="Close user details"
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-forest-900/30 backdrop-blur-sm"
            />

            <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-paper p-6 shadow-2xl sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
                    User overview
                  </p>
                  <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                    {selectedUser.fullName}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedUser(null)}
                  className="rounded-xl p-2 transition hover:bg-cream"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                    Email
                  </p>
                  <p className="mt-2 break-all text-sm font-bold">
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                    Role
                  </p>
                  <p className="mt-2 text-sm font-bold capitalize">
                    {selectedUser.role}
                  </p>
                </div>

                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                    Account status
                  </p>
                  <p className="mt-2 text-sm font-bold capitalize">
                    {selectedUser.status}
                  </p>
                </div>

                <div className="rounded-2xl bg-cream p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                    Joined
                  </p>
                  <p className="mt-2 text-sm font-bold">
                    {formatDate(selectedUser.createdAt)}
                  </p>
                </div>
              </div>

              {selectedUser.role === 'professional' && (
                <div className="mt-8 border-t border-forest-900/10 pt-7">
                  <h3 className="text-xl font-extrabold">
                    Professional profile
                  </h3>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {[
                      ['Business', selectedUser.businessName],
                      ['Trade', selectedUser.trade],
                      ['Location', selectedUser.location],
                      ['Verification', selectedUser.verificationStatus],
                      ['Availability', selectedUser.availability],
                      [
                        'Experience',
                        selectedUser.yearsExperience !== null
                          ? `${selectedUser.yearsExperience} years`
                          : null,
                      ],
                      [
                        'Service radius',
                        selectedUser.serviceRadius !== null
                          ? `${selectedUser.serviceRadius} km`
                          : null,
                      ],
                      ['Website', selectedUser.website],
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

                  {selectedUser.description && (
                    <div className="mt-4 rounded-2xl bg-cream p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-forest-900/40">
                        Description
                      </p>
                      <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-forest-900/70">
                        {selectedUser.description}
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const user = selectedUser
                    setSelectedUser(null)
                    setDeleteTarget(user)
                  }}
                  disabled={selectedUser.role === 'admin'}
                  className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Trash2 size={16} />
                  Delete account
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {detailLoading && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-forest-900/20 backdrop-blur-sm">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-white/40 border-t-white" />
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
              Delete this account?
            </h2>

            <p className="mt-3 text-sm leading-6 text-forest-900/60">
              This will permanently delete{' '}
              <strong>{deleteTarget.fullName}</strong> and anything linked to
              this account through the database relationships.
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
                onClick={() => void deleteUser()}
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

export default AdminUsersPage

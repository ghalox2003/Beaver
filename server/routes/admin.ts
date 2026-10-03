import { Router } from 'express'
import { db } from '../db/connection.ts'
import {
  deleteUserById,
  findAdminUserById,
  listAdminUsers,
} from '../db/users.ts'
import {
  deleteQuoteRequestById,
  findQuoteRequestById,
  listAdminQuoteRequests,
  type QuoteRequestStatus,
} from '../db/quoteRequests.ts'
import { requireRole } from '../middleware/auth.ts'

export const adminRouter = Router()

const MAX_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 10

const quoteStatuses: QuoteRequestStatus[] = [
  'pending',
  'accepted',
  'declined',
  'cancelled',
  'completed',
]

const professionalVerificationStatuses = [
  'unverified',
  'pending',
  'verified',
] as const

const professionalAvailabilityStatuses = [
  'available',
  'busy',
  'unavailable',
] as const

function parsePositiveInteger(
  value: unknown,
  fallback: number,
): number | null {
  if (value === undefined) return fallback

  const parsed = Number(value)

  if (!Number.isInteger(parsed) || parsed < 1) return null

  return parsed
}

function parseOptionalNumber(value: unknown): number | undefined | null {
  if (value === undefined || value === '') return undefined

  const parsed = Number(value)

  if (!Number.isFinite(parsed)) return null

  return parsed
}

function parseDate(value: unknown): string | undefined | null {
  if (value === undefined || value === '') return undefined

  if (typeof value !== 'string') return null

  const date = new Date(`${value}T00:00:00.000Z`)

  if (Number.isNaN(date.getTime())) return null

  return value
}

function isOneOf<T extends string>(
  value: unknown,
  values: readonly T[],
): value is T {
  return typeof value === 'string' && values.includes(value as T)
}

adminRouter.get('/stats', ...requireRole('admin'), (_req, res) => {
  const counts = { client: 0, professional: 0, admin: 0 }

  for (const row of dbRows(
    'SELECT role, COUNT(*) AS count FROM users GROUP BY role',
  )) {
    const role = String(row.role) as keyof typeof counts
    if (role in counts) counts[role] = Number(row.count)
  }

  res.json({
    users: {
      total: counts.client + counts.professional + counts.admin,
      ...counts,
    },
  })
})

adminRouter.get('/users', ...requireRole('admin'), (req, res) => {
  const page = parsePositiveInteger(req.query.page, 1)
  const requestedLimit = parsePositiveInteger(req.query.limit, DEFAULT_PAGE_SIZE)

  if (page === null || requestedLimit === null) {
    res.status(400).json({
      error: 'Page and limit must be positive integers.',
      code: 'invalid_pagination',
    })
    return
  }

  const limit = Math.min(requestedLimit, MAX_PAGE_SIZE)

  const role =
    req.query.role === undefined || req.query.role === ''
      ? undefined
      : req.query.role

  if (
    role !== undefined &&
    role !== 'client' &&
    role !== 'professional'
  ) {
    res.status(400).json({
      error: 'Invalid user role filter.',
      code: 'invalid_role',
    })
    return
  }

  const sort =
    req.query.sort === undefined || req.query.sort === ''
      ? 'newest'
      : req.query.sort

  if (
    sort !== 'newest' &&
    sort !== 'oldest' &&
    sort !== 'name'
  ) {
    res.status(400).json({
      error: 'Invalid user sort.',
      code: 'invalid_sort',
    })
    return
  }

  const verificationStatus =
    req.query.verificationStatus === undefined ||
    req.query.verificationStatus === ''
      ? undefined
      : req.query.verificationStatus

  if (
    verificationStatus !== undefined &&
    !isOneOf(
      verificationStatus,
      professionalVerificationStatuses,
    )
  ) {
    res.status(400).json({
      error: 'Invalid verification status filter.',
      code: 'invalid_verification_status',
    })
    return
  }

  const availability =
    req.query.availability === undefined ||
    req.query.availability === ''
      ? undefined
      : req.query.availability

  if (
    availability !== undefined &&
    !isOneOf(availability, professionalAvailabilityStatuses)
  ) {
    res.status(400).json({
      error: 'Invalid availability filter.',
      code: 'invalid_availability',
    })
    return
  }

  const result = listAdminUsers({
    search:
      typeof req.query.search === 'string'
        ? req.query.search.trim() || undefined
        : undefined,
    role: role as 'client' | 'professional' | undefined,
    trade:
      typeof req.query.trade === 'string'
        ? req.query.trade.trim() || undefined
        : undefined,
    location:
      typeof req.query.location === 'string'
        ? req.query.location.trim() || undefined
        : undefined,
    verificationStatus:
      verificationStatus as
        | 'unverified'
        | 'pending'
        | 'verified'
        | undefined,
    availability:
      availability as
        | 'available'
        | 'busy'
        | 'unavailable'
        | undefined,
    sort: sort as 'newest' | 'oldest' | 'name',
    page,
    limit,
  })

  res.json(result)
})

adminRouter.get('/users/:id', ...requireRole('admin'), (req, res) => {
  const userId = String(req.params.id)
  const user = findAdminUserById(userId)

  if (!user) {
    res.status(404).json({
      error: 'User not found.',
      code: 'user_not_found',
    })
    return
  }

  res.json({ user })
})

adminRouter.delete('/users/:id', ...requireRole('admin'), (req, res) => {
  const targetId = String(req.params.id)
  const requesterId = req.user?.id

  if (!requesterId) {
    res.status(401).json({
      error: 'Authentication required.',
      code: 'unauthenticated',
    })
    return
  }

  if (targetId === requesterId) {
    res.status(400).json({
      error: 'You cannot delete your own admin account.',
      code: 'cannot_delete_self',
    })
    return
  }

  const user = findAdminUserById(targetId)

  if (!user) {
    res.status(404).json({
      error: 'User not found.',
      code: 'user_not_found',
    })
    return
  }

  if (user.role === 'admin') {
    res.status(403).json({
      error: 'Admin accounts cannot be deleted from this endpoint.',
      code: 'admin_deletion_forbidden',
    })
    return
  }

  deleteUserById(targetId)

  res.json({
    success: true,
    deletedUserId: targetId,
  })
})

adminRouter.get(
  '/quote-requests',
  ...requireRole('admin'),
  (req, res) => {
    const page = parsePositiveInteger(req.query.page, 1)
    const requestedLimit = parsePositiveInteger(
      req.query.limit,
      DEFAULT_PAGE_SIZE,
    )

    if (page === null || requestedLimit === null) {
      res.status(400).json({
        error: 'Page and limit must be positive integers.',
        code: 'invalid_pagination',
      })
      return
    }

    const limit = Math.min(requestedLimit, MAX_PAGE_SIZE)

    const status =
      req.query.status === undefined || req.query.status === ''
        ? undefined
        : req.query.status

    if (
      status !== undefined &&
      !isOneOf(status, quoteStatuses)
    ) {
      res.status(400).json({
        error: 'Invalid quote status filter.',
        code: 'invalid_status',
      })
      return
    }

    const sort =
      req.query.sort === undefined || req.query.sort === ''
        ? 'newest'
        : req.query.sort

    if (
      sort !== 'newest' &&
      sort !== 'oldest' &&
      sort !== 'budget-high' &&
      sort !== 'budget-low' &&
      sort !== 'date-asc' &&
      sort !== 'date-desc'
    ) {
      res.status(400).json({
        error: 'Invalid quote sort.',
        code: 'invalid_sort',
      })
      return
    }

    const minBudget = parseOptionalNumber(req.query.minBudget)
    const maxBudget = parseOptionalNumber(req.query.maxBudget)

    if (minBudget === null || maxBudget === null) {
      res.status(400).json({
        error: 'Budget filters must be valid numbers.',
        code: 'invalid_budget',
      })
      return
    }

    if (
      minBudget !== undefined &&
      maxBudget !== undefined &&
      minBudget > maxBudget
    ) {
      res.status(400).json({
        error: 'Minimum budget cannot exceed maximum budget.',
        code: 'invalid_budget_range',
      })
      return
    }

    const preferredDateFrom = parseDate(req.query.preferredDateFrom)
    const preferredDateTo = parseDate(req.query.preferredDateTo)

    if (preferredDateFrom === null || preferredDateTo === null) {
      res.status(400).json({
        error: 'Preferred date filters must be valid dates.',
        code: 'invalid_preferred_date',
      })
      return
    }

    if (
      preferredDateFrom !== undefined &&
      preferredDateTo !== undefined &&
      preferredDateFrom > preferredDateTo
    ) {
      res.status(400).json({
        error: 'Preferred date range is invalid.',
        code: 'invalid_preferred_date_range',
      })
      return
    }

    const result = listAdminQuoteRequests({
      search:
        typeof req.query.search === 'string'
          ? req.query.search.trim() || undefined
          : undefined,
      status: status as QuoteRequestStatus | undefined,
      clientUserId:
        typeof req.query.clientUserId === 'string'
          ? req.query.clientUserId.trim() || undefined
          : undefined,
      professionalId:
        typeof req.query.professionalId === 'string'
          ? req.query.professionalId.trim() || undefined
          : undefined,
      professionalLocation:
        typeof req.query.professionalLocation === 'string'
          ? req.query.professionalLocation.trim() || undefined
          : undefined,
      minBudget,
      maxBudget,
      preferredDateFrom,
      preferredDateTo,
      sort: sort as
        | 'newest'
        | 'oldest'
        | 'budget-high'
        | 'budget-low'
        | 'date-asc'
        | 'date-desc',
      page,
      limit,
    })

    res.json(result)
  },
)

adminRouter.get(
  '/quote-requests/:id',
  ...requireRole('admin'),
  (req, res) => {
    const quoteId = String(req.params.id)
    const quote = findQuoteRequestById(quoteId)

    if (!quote) {
      res.status(404).json({
        error: 'Quote request not found.',
        code: 'quote_not_found',
      })
      return
    }

    res.json({ quote })
  },
)

adminRouter.delete(
  '/quote-requests/:id',
  ...requireRole('admin'),
  (req, res) => {
    const quoteId = String(req.params.id)
    const quote = findQuoteRequestById(quoteId)

    if (!quote) {
      res.status(404).json({
        error: 'Quote request not found.',
        code: 'quote_not_found',
      })
      return
    }

    deleteQuoteRequestById(quoteId)

    res.json({
      success: true,
      deletedQuoteId: quoteId,
    })
  },
)

function dbRows(sql: string): Record<string, unknown>[] {
  return db.prepare(sql).all() as Record<string, unknown>[]
}

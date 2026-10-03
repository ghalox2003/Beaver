import { Router } from 'express'
import {
  createQuoteRequest,
  listQuoteRequestsForClient,
  listQuoteRequestsForProfessional,
} from '../db/quoteRequests.ts'
import {
  findProfessionalById,
  findProfessionalByUserId,
} from '../db/professionals.ts'
import { requireRole } from '../middleware/auth.ts'

export const quoteRequestsRouter = Router()

function readRequiredString(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

function readOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') return null

  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

quoteRequestsRouter.post(
  '/',
  ...requireRole('client'),
  (req, res) => {
    const professionalId = readRequiredString(req.body?.professionalId)
    const title = readRequiredString(req.body?.title)
    const description = readRequiredString(req.body?.description)
    const location = readRequiredString(req.body?.location)
    const preferredDate = readOptionalString(req.body?.preferredDate)

    if (!professionalId || !title || !description || !location) {
      res.status(400).json({
        error: 'Please complete all required fields.',
        code: 'validation_error',
      })
      return
    }

    if (
      title.length > 120 ||
      description.length > 5000 ||
      location.length > 200 ||
      (preferredDate && preferredDate.length > 40)
    ) {
      res.status(400).json({
        error: 'One or more fields are too long.',
        code: 'validation_error',
      })
      return
    }

    const professional = findProfessionalById(professionalId)

    if (!professional) {
      res.status(404).json({
        error: 'Professional not found.',
        code: 'professional_not_found',
      })
      return
    }

    let budget: number | null = null

    if (req.body?.budget !== undefined && req.body?.budget !== '') {
      const parsedBudget =
        typeof req.body.budget === 'number'
          ? req.body.budget
          : Number(req.body.budget)

      if (
        !Number.isFinite(parsedBudget) ||
        parsedBudget < 0 ||
        parsedBudget > 1_000_000_000
      ) {
        res.status(400).json({
          error: 'Please enter a valid budget.',
          code: 'validation_error',
        })
        return
      }

      budget = parsedBudget
    }

    const request = createQuoteRequest({
      clientUserId: req.user!.id,
      professionalId,
      title,
      description,
      location,
      preferredDate,
      budget,
    })

    res.status(201).json({ request })
  },
)

quoteRequestsRouter.get(
  '/mine',
  ...requireRole('client'),
  (req, res) => {
    res.json({
      requests: listQuoteRequestsForClient(req.user!.id),
    })
  },
)

quoteRequestsRouter.get(
  '/incoming',
  ...requireRole('professional'),
  (req, res) => {
    const professional = findProfessionalByUserId(req.user!.id)

    if (!professional) {
      res.status(404).json({
        error: 'Professional profile not found.',
        code: 'professional_not_found',
      })
      return
    }

    res.json({
      requests: listQuoteRequestsForProfessional(professional.id),
    })
  },
)

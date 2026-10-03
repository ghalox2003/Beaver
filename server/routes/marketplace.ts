import { Router } from 'express'
import {
  findProfessionalById,
  listProfessionals,
  listTrades,
} from '../db/professionals.ts'

export const marketplaceRouter = Router()

marketplaceRouter.get('/trades', (_req, res) => {
  res.json({ trades: listTrades() })
})

marketplaceRouter.get('/professionals', (req, res) => {
  const serviceRadiusRaw =
    typeof req.query.serviceRadius === 'string'
      ? Number(req.query.serviceRadius)
      : undefined

  const serviceRadius =
    serviceRadiusRaw !== undefined && Number.isFinite(serviceRadiusRaw)
      ? serviceRadiusRaw
      : undefined

  const verified =
    req.query.verified === 'true'
      ? true
      : req.query.verified === 'false'
        ? false
        : undefined

  const availability =
    req.query.availability === 'available' ||
    req.query.availability === 'busy' ||
    req.query.availability === 'unavailable'
      ? req.query.availability
      : undefined

  const sort =
    req.query.sort === 'experience' || req.query.sort === 'newest'
      ? req.query.sort
      : 'name'

  res.json({
    professionals: listProfessionals({
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      trade: typeof req.query.trade === 'string' ? req.query.trade : undefined,
      location:
        typeof req.query.location === 'string'
          ? req.query.location
          : undefined,
      serviceRadius,
      verified,
      availability,
      sort,
    }),
  })
})

marketplaceRouter.get('/professionals/:id', (req, res) => {
  const professional = findProfessionalById(req.params.id)

  if (!professional) {
    res.status(404).json({
      error: 'Professional not found.',
      code: 'professional_not_found',
    })
    return
  }

  res.json({ professional })
})

import { apiRequest } from '../../../lib/api'
import type { Professional, Trade } from '../types'

type ProfessionalsResponse = {
  professionals: Professional[]
}

type TradesResponse = {
  trades: Trade[]
}

type ProfessionalResponse = {
  professional: Professional
}

export type ProfessionalFilters = {
  search?: string
  trade?: string
  location?: string
  serviceRadius?: string
  verified?: boolean
  availability?: string
  sort?: string
}

export function getTrades(): Promise<TradesResponse> {
  return apiRequest<TradesResponse>('/trades')
}

export function getProfessionals(
  filters: ProfessionalFilters,
): Promise<ProfessionalsResponse> {
  const params = new URLSearchParams()

  if (filters.search) params.set('search', filters.search)
  if (filters.trade) params.set('trade', filters.trade)
  if (filters.location) params.set('location', filters.location)
  if (filters.serviceRadius) params.set('serviceRadius', filters.serviceRadius)
  if (filters.verified) params.set('verified', 'true')
  if (filters.availability) params.set('availability', filters.availability)
  if (filters.sort) params.set('sort', filters.sort)

  const query = params.toString()
  return apiRequest<ProfessionalsResponse>(
    `/professionals${query ? `?${query}` : ''}`,
  )
}

export function getProfessional(id: string): Promise<ProfessionalResponse> {
  return apiRequest<ProfessionalResponse>(`/professionals/${id}`)
}

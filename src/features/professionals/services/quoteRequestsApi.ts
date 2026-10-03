import { apiRequest } from '../../../lib/api'
import type { QuoteRequest } from '../types'

type QuoteRequestResponse = {
  request: QuoteRequest
}

type QuoteRequestsResponse = {
  requests: QuoteRequest[]
}

export type CreateQuoteRequestInput = {
  professionalId: string
  title: string
  description: string
  location: string
  preferredDate?: string
  budget?: number
}

export function createQuoteRequest(
  input: CreateQuoteRequestInput,
): Promise<QuoteRequestResponse> {
  return apiRequest<QuoteRequestResponse>('/quote-requests', {
    method: 'POST',
    body: input,
  })
}

export function getMyQuoteRequests(): Promise<QuoteRequestsResponse> {
  return apiRequest<QuoteRequestsResponse>('/quote-requests/mine')
}

export function getIncomingQuoteRequests(): Promise<QuoteRequestsResponse> {
  return apiRequest<QuoteRequestsResponse>('/quote-requests/incoming')
}

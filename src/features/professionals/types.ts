export type Trade = {
  id: string
  name: string
  slug: string
  description: string
}

export type Availability = 'available' | 'busy' | 'unavailable'
export type VerificationStatus = 'unverified' | 'pending' | 'verified'

export type Professional = {
  id: string
  userId: string
  fullName: string
  email: string
  businessName: string
  description: string
  trade: Trade
  location: string
  latitude: number
  longitude: number
  serviceRadius: number
  yearsExperience: number
  website: string | null
  verificationStatus: VerificationStatus
  availability: Availability
  createdAt: string
}

export type ProfessionalFilters = {
  search?: string
  trade?: string
  location?: string
  verified?: boolean
  availability?: Availability
  minServiceRadius?: number
  sort?: string
}

export type CurrencyCode = 'CAD' | 'EUR' | 'MAD' | 'GBP'

export type QuoteRequestStatus =
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'cancelled'
  | 'completed'

export type QuoteRequest = {
  id: string
  clientUserId: string
  clientName: string
  clientEmail: string
  professionalId: string
  professionalName: string
  businessName: string
  title: string
  description: string
  location: string
  preferredDate: string | null
  budget: number | null
  currency: CurrencyCode
  status: QuoteRequestStatus
  createdAt: string
  updatedAt: string
}

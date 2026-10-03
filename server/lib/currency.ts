export type CurrencyCode = 'CAD' | 'EUR' | 'MAD' | 'GBP'

export function getCurrencyForLocation(location: string): CurrencyCode {
  const value = location.toLowerCase()

  if (
    value.includes('canada') ||
    value.includes('toronto') ||
    value.includes('montreal') ||
    value.includes('vancouver') ||
    value.includes('calgary')
  ) {
    return 'CAD'
  }

  if (
    value.includes('france') ||
    value.includes('paris') ||
    value.includes('lyon') ||
    value.includes('marseille') ||
    value.includes('toulouse')
  ) {
    return 'EUR'
  }

  if (
    value.includes('italy') ||
    value.includes('italia') ||
    value.includes('rome') ||
    value.includes('milan') ||
    value.includes('milano') ||
    value.includes('turin') ||
    value.includes('torino')
  ) {
    return 'EUR'
  }

  if (
    value.includes('united kingdom') ||
    value.includes('uk') ||
    value.includes('england') ||
    value.includes('london')
  ) {
    return 'GBP'
  }

  // Beaver's current fallback market.
  return 'MAD'
}

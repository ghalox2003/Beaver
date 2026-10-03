import { randomBytes } from 'node:crypto'
import { runMigrations } from '../db/migrate.ts'
import {
  createProfessional,
  createTrade,
  listTrades,
} from '../db/professionals.ts'
import { createUser, findUserByEmail } from '../db/users.ts'
import type { UserRole } from '../db/users.ts'
import { hashPassword } from '../lib/password.ts'

runMigrations()

// One shared password for the seeded accounts. Set SEED_PASSWORD in .env to choose it;
// otherwise a random one is generated and printed once. Never commit real passwords.
const generated = !process.env.SEED_PASSWORD
const password = process.env.SEED_PASSWORD || randomBytes(9).toString('base64url')

const accounts: { email: string; fullName: string; role: UserRole }[] = [
  { email: 'admin@beaver.test', fullName: 'Beaver Admin', role: 'admin' },
  { email: 'client@beaver.test', fullName: 'Demo Client', role: 'client' },
  { email: 'pro@beaver.test', fullName: 'Demo Professional', role: 'professional' },
]

let created = 0
for (const account of accounts) {
  if (findUserByEmail(account.email)) {
    console.log(`exists   ${account.email}`)
    continue
  }
  createUser({ ...account, passwordHash: await hashPassword(password) })
  console.log(`created  ${account.email} (${account.role})`)
  created++
}

if (created > 0) {
  console.log(generated ? `\nPassword for new accounts (shown once): ${password}` : '\nNew accounts use SEED_PASSWORD from .env.')
}


const trades = [
  ['plumbing', 'Plumbing', 'Plumbing, repairs, installations, leaks, fixtures, and water systems.'],
  ['electrical', 'Electrical', 'Residential and commercial electrical installation, repair, and maintenance.'],
  ['carpentry', 'Carpentry', 'Custom woodwork, framing, cabinetry, repairs, and finish carpentry.'],
  ['painting', 'Painting', 'Interior and exterior painting, finishing, preparation, and decorating.'],
  ['masonry', 'Masonry', 'Brick, stone, concrete, foundations, walls, patios, and structural masonry.'],
  ['hvac', 'HVAC', 'Heating, ventilation, air conditioning, and climate-control services.'],
  ['roofing', 'Roofing', 'Roof installation, repairs, waterproofing, inspections, and maintenance.'],
  ['landscaping', 'Landscaping', 'Garden design, maintenance, irrigation, planting, and outdoor work.'],
]

for (const [id, name, description] of trades) {
  const existing = listTrades().find((trade) => trade.id === id)
  if (!existing) {
    createTrade({ id, name, slug: id, description })
    console.log(`created  trade ${name}`)
  }
}

const seededProfessionals = [
  {
    email: 'marc.duval@beaver.test',
    fullName: 'Marc Duval',
    businessName: 'Duval Plumbing',
    description: 'Residential and commercial plumbing with a focus on clean repairs, installations, and emergency call-outs.',
    trade: 'plumbing',
    location: 'Montreal, Canada',
    latitude: 45.5017,
    longitude: -73.5673,
    serviceRadius: 45,
    yearsExperience: 14,
    website: 'https://example.com/duval-plumbing',
    verificationStatus: 'verified',
    availability: 'available',
  },
  {
    email: 'sarah.martin@beaver.test',
    fullName: 'Sarah Martin',
    businessName: 'Martin Électricité',
    description: 'Licensed electrical professional serving homes and small businesses across the Montreal area.',
    trade: 'electrical',
    location: 'Montreal, Canada',
    latitude: 45.5088,
    longitude: -73.554,
    serviceRadius: 35,
    yearsExperience: 11,
    website: 'https://example.com/martin-electricite',
    verificationStatus: 'verified',
    availability: 'available',
  },
  {
    email: 'lucas.moreau@beaver.test',
    fullName: 'Lucas Moreau',
    businessName: 'Moreau Menuiserie',
    description: 'Custom cabinetry, built-ins, repairs, and detailed finish carpentry for residential projects.',
    trade: 'carpentry',
    location: 'Lyon, France',
    latitude: 45.764,
    longitude: 4.8357,
    serviceRadius: 60,
    yearsExperience: 17,
    website: 'https://example.com/moreau-menuiserie',
    verificationStatus: 'verified',
    availability: 'busy',
  },
  {
    email: 'camille.bernard@beaver.test',
    fullName: 'Camille Bernard',
    businessName: 'Bernard Peinture',
    description: 'Interior and exterior painting with careful preparation and clean finishing work.',
    trade: 'painting',
    location: 'Paris, France',
    latitude: 48.8566,
    longitude: 2.3522,
    serviceRadius: 40,
    yearsExperience: 9,
    website: 'https://example.com/bernard-peinture',
    verificationStatus: 'pending',
    availability: 'available',
  },
  {
    email: 'antoine.roche@beaver.test',
    fullName: 'Antoine Roche',
    businessName: 'Roche Maçonnerie',
    description: 'Stone, brick, concrete, and renovation work for residential and heritage properties.',
    trade: 'masonry',
    location: 'Bordeaux, France',
    latitude: 44.8378,
    longitude: -0.5792,
    serviceRadius: 80,
    yearsExperience: 22,
    website: null,
    verificationStatus: 'verified',
    availability: 'available',
  },
  {
    email: 'giulia.rossi@beaver.test',
    fullName: 'Giulia Rossi',
    businessName: 'Rossi Impianti',
    description: 'Electrical installations, upgrades, lighting, and troubleshooting for homes and businesses.',
    trade: 'electrical',
    location: 'Milan, Italy',
    latitude: 45.4642,
    longitude: 9.19,
    serviceRadius: 50,
    yearsExperience: 13,
    website: 'https://example.com/rossi-impianti',
    verificationStatus: 'verified',
    availability: 'available',
  },
  {
    email: 'marco.bianchi@beaver.test',
    fullName: 'Marco Bianchi',
    businessName: 'Bianchi Idraulica',
    description: 'Plumbing installation and maintenance, bathroom renovations, and heating connections.',
    trade: 'plumbing',
    location: 'Rome, Italy',
    latitude: 41.9028,
    longitude: 12.4964,
    serviceRadius: 55,
    yearsExperience: 19,
    website: null,
    verificationStatus: 'verified',
    availability: 'busy',
  },
  {
    email: 'elena.ferrari@beaver.test',
    fullName: 'Elena Ferrari',
    businessName: 'Ferrari Garden Studio',
    description: 'Garden design and maintenance with planting, irrigation, and seasonal outdoor care.',
    trade: 'landscaping',
    location: 'Turin, Italy',
    latitude: 45.0703,
    longitude: 7.6869,
    serviceRadius: 45,
    yearsExperience: 8,
    website: 'https://example.com/ferrari-garden',
    verificationStatus: 'pending',
    availability: 'available',
  },
  {
    email: 'david.thompson@beaver.test',
    fullName: 'David Thompson',
    businessName: 'Thompson Roofing',
    description: 'Roof repairs, replacements, waterproofing, and inspection services for residential properties.',
    trade: 'roofing',
    location: 'Toronto, Canada',
    latitude: 43.6532,
    longitude: -79.3832,
    serviceRadius: 70,
    yearsExperience: 16,
    website: 'https://example.com/thompson-roofing',
    verificationStatus: 'verified',
    availability: 'available',
  },
  {
    email: 'olivia.brown@beaver.test',
    fullName: 'Olivia Brown',
    businessName: 'Brown Climate Solutions',
    description: 'HVAC installation and servicing for comfortable, efficient homes throughout the Toronto area.',
    trade: 'hvac',
    location: 'Toronto, Canada',
    latitude: 43.7001,
    longitude: -79.4163,
    serviceRadius: 50,
    yearsExperience: 12,
    website: null,
    verificationStatus: 'verified',
    availability: 'busy',
  },
  {
    email: 'ethan.wilson@beaver.test',
    fullName: 'Ethan Wilson',
    businessName: 'Wilson Woodworks',
    description: 'Furniture, cabinetry, repairs, and custom woodworking with a practical modern style.',
    trade: 'carpentry',
    location: 'Vancouver, Canada',
    latitude: 49.2827,
    longitude: -123.1207,
    serviceRadius: 65,
    yearsExperience: 10,
    website: 'https://example.com/wilson-woodworks',
    verificationStatus: 'unverified',
    availability: 'available',
  },
]

for (const professional of seededProfessionals) {
  if (findUserByEmail(professional.email)) {
    continue
  }

  const user = createUser({
    email: professional.email,
    fullName: professional.fullName,
    role: 'professional',
    passwordHash: await hashPassword(password),
  })

  createProfessional({
    userId: user.id,
    businessName: professional.businessName,
    description: professional.description,
    tradeId: professional.trade,
    location: professional.location,
    latitude: professional.latitude,
    longitude: professional.longitude,
    serviceRadius: professional.serviceRadius,
    yearsExperience: professional.yearsExperience,
    website: professional.website,
    verificationStatus: professional.verificationStatus as 'unverified' | 'pending' | 'verified',
    availability: professional.availability as 'available' | 'busy' | 'unavailable',
  })

  console.log(`created  professional ${professional.businessName}`)
}

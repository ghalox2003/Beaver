# Beaver

Beaver is a marketplace for skilled tradespeople and clients.

The goal is to connect people who need work done with local professionals such as:

- Plumbers
- Electricians
- Carpenters
- HVAC technicians
- Painters
- Masonry / construction workers
- Handymen
- Other skilled trades

The initial target markets are:

- Canada
- France
- Italy

The product combines:

- Professional listings
- Interactive maps
- Job requests
- Appels d'offres / tenders
- Client accounts
- Professional accounts
- Reviews
- Verification
- Regional demand information
- Administrative management

Payments are deliberately postponed until after the core marketplace works.

---

# Project state

Current phase: Phase 0 complete, Phase 2 (application structure) next.

What exists today:
- Landing page (`src/pages/LandingPage.tsx`), responsive, with mobile nav.
- Project structure and conventions (see `CONVENTIONS.md`).

What does not exist yet: routing, auth, database, marketplace, map, jobs.

Run locally:

    npm install
    cp .env.example .env
    npm run dev

Checks before every commit: `npm run lint` and `npm run build`.

---

# 1. PRODUCT PRINCIPLES

Beaver should feel like a real modern startup product, not a school project.

## Design principles

- Clean
- Modern
- Fast
- Mobile-friendly
- Professional
- Trustworthy
- Easy to understand
- Minimal unnecessary UI
- Strong visual hierarchy
- Real functionality over decorative sections

Current visual direction:

- Forest green
- Sage
- Cream / off-white
- Bricolage Grotesque
- Rounded cards
- Rounded buttons
- Subtle borders
- Soft shadows
- Large typography
- Map-based visual language

Avoid:

- Generic Bootstrap-looking interfaces
- Excessive gradients
- Huge walls of text
- Fake statistics
- Decorative UI that does nothing
- Placeholder features presented as finished
- Overengineering
- Building payment infrastructure before the marketplace works

---

# 2. CURRENT STACK

Frontend:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React
- Motion
- Leaflet
- React Leaflet

Current package dependencies should remain aligned with the existing project unless there is a concrete reason to change them.

Do not introduce unnecessary libraries.

---

# 3. MVP DEFINITION

The MVP is considered complete when a user can realistically:

1. Visit Beaver.
2. Understand what Beaver does.
3. Create an account.
4. Log in.
5. Have an account stored in the database.
6. Choose whether they are a client or professional.
7. Complete their profile.
8. Browse professionals.
9. Browse jobs/tenders.
10. View professionals on an interactive map.
11. Filter the marketplace.
12. Open a professional profile.
13. Post a job.
14. View their own posted jobs.
15. Apply/respond to jobs as a professional.
16. View applications/responses.
17. Leave reviews after a completed interaction.
18. See verification information.
19. Use the main dashboard appropriate to their account type.
20. Allow administrators to manage the platform.

The MVP does NOT require:

- Stripe
- Online payments
- Subscriptions
- Complex billing
- Escrow
- Advanced messaging
- Native mobile apps
- AI matching
- Complex recommendation algorithms

Those are future work.

---

# 4. DEVELOPMENT RULES (Tech shit, ignore if not engineering it)

## IMPORTANT

1. Inspect the current repository.
2. Read this README.
3. Determine which checklist item is currently being implemented.
4. Inspect the existing code before modifying it.
5. Implement one coherent feature at a time.
6. Run the build.
7. Fix errors.
8. Test the feature.
9. Update this README/checklist.
10. Only then move to the next feature.

Do not rewrite working functionality unnecessarily.

Do not replace working components just because another implementation is possible.

---

# 5. DEVELOPMENT PHASES

The project should roughly progress through:

```text
PHASE 0  → Foundation
PHASE 1  → Landing / public frontend
PHASE 2  → Application routing / layout
PHASE 3  → Authentication
PHASE 4  → Database / users
PHASE 5  → Profiles
PHASE 6  → Marketplace
PHASE 7  → Interactive map
PHASE 8  → Jobs / appels d'offres
PHASE 9  → Professional applications
PHASE 10 → Reviews / verification
PHASE 11 → Client dashboard
PHASE 12 → Professional dashboard
PHASE 13 → Admin dashboard
PHASE 14 → Search / filtering / polish
PHASE 15 → Security / validation / edge cases
PHASE 16 → Deployment
PHASE 17 → Payments
PHASE 18 → Post-MVP features
```

# Beaver

## Phase 0 — Foundation

### Repository & Project Setup

- [x] Create React + TypeScript + Vite project
- [x] Initialize Git repository
- [x] Connect repository to GitHub
- [x] Configure GitHub remote
- [x] Install React
- [x] Install TypeScript
- [x] Install Vite
- [x] Install Tailwind CSS
- [x] Install Lucide React
- [x] Install Motion
- [x] Install React Router
- [x] Install Leaflet
- [x] Install React Leaflet
- [x] Establish final project structure
- [x] Remove unused Vite starter files
- [x] Remove unused starter assets
- [x] Establish environment variable strategy
- [x] Establish coding conventions
- [x] Establish feature/module conventions

### Foundation Verification

- [x] `npm run build` succeeds
- [x] `npm run lint` succeeds
- [x] Application runs correctly locally
- [x] Git working tree is clean
- [x] README reflects actual project state

---

## Phase 1 — Landing Page

### Public Website

- [x] Create navigation
- [x] Create hero section
- [x] Create marketplace explanation
- [x] Create how-it-works section
- [x] Create professional CTA
- [x] Create final CTA
- [x] Create footer
- [x] Create responsive mobile navigation
- [x] Establish Beaver visual identity
- [x] Add Bricolage Grotesque
- [x] Establish forest/sage/cream palette
- [x] Replace temporary content
- [ ] Add final responsive polish
- [x] Add SEO metadata
- [x] Add proper favicon
- [x] Add social sharing metadata

### Landing Page Principle

- [x] Keep landing page focused on explaining the product
- [ ] Avoid endlessly polishing marketing UI before the marketplace works
- [ ] Redirect development effort toward actual application functionality

---

## Phase 2 — Application Structure

### Routing

- [ ] Configure React Router
- [ ] Create public routes
- [ ] Create authentication routes
- [ ] Create client routes
- [ ] Create professional routes
- [ ] Create admin routes
- [ ] Create protected routes
- [ ] Create role-based route protection
- [ ] Create 404 route

### Application Layout

- [ ] Create application shell
- [ ] Create dashboard shell
- [ ] Create navigation system
- [ ] Create sidebar
- [ ] Create top navigation
- [ ] Create reusable page container
- [ ] Create reusable page header
- [ ] Create reusable loading state
- [ ] Create reusable error state
- [ ] Create reusable empty state
- [ ] Create reusable modal/dialog system
- [ ] Create reusable toast/notification system

### Project Structure

- [ ] Create `components/`
- [ ] Create `pages/`
- [ ] Create `layouts/`
- [ ] Create `features/`
- [ ] Create `services/`
- [ ] Create `lib/`
- [ ] Create `types/`
- [ ] Create `hooks/`
- [ ] Create `data/`
- [ ] Create `utils/`

---

## Phase 3 — Authentication

### Account Creation

- [ ] Create signup page
- [ ] Create login page
- [ ] Create logout functionality
- [ ] Create password reset flow
- [ ] Create email verification flow
- [ ] Create session handling
- [ ] Persist authenticated user
- [ ] Handle authentication errors
- [ ] Handle expired sessions

### User Roles

- [ ] Add Client role
- [ ] Add Professional role
- [ ] Add Admin role
- [ ] Store user role in database
- [ ] Restrict routes according to role
- [ ] Prevent unauthorized API access
- [ ] Redirect users to the correct dashboard

### Authentication UX

- [ ] Add form validation
- [ ] Add loading states
- [ ] Add error messages
- [ ] Add success states
- [ ] Add password visibility toggle
- [ ] Add password strength requirements

---

## Phase 4 — Database

### Database Foundation

- [ ] Choose production database
- [ ] Configure database connection
- [ ] Create database schema
- [ ] Create migrations
- [ ] Configure development database
- [ ] Configure production database
- [ ] Create seed data
- [ ] Create database utilities
- [ ] Create server-side database access layer

### Core Entities

- [ ] Create Users table
- [ ] Create Clients table
- [ ] Create Professionals table
- [ ] Create Trades table
- [ ] Create Jobs table
- [ ] Create Applications table
- [ ] Create Reviews table
- [ ] Create Verifications table
- [ ] Create Badges table
- [ ] Create ProfessionalBadges table
- [ ] Create Notifications table
- [ ] Create Messages table
- [ ] Create Reports table

### Relationships

- [ ] User → Client relationship
- [ ] User → Professional relationship
- [ ] Professional → Trade relationship
- [ ] Professional → Location relationship
- [ ] Client → Jobs relationship
- [ ] Job → Trade relationship
- [ ] Job → Applications relationship
- [ ] Application → Professional relationship
- [ ] Job → Reviews relationship
- [ ] Professional → Reviews relationship
- [ ] Professional → Verification relationship
- [ ] Professional → Badges relationship

---

## Phase 5 — User Profiles

### Client Profile

- [ ] Create client profile
- [ ] Add first name
- [ ] Add last name
- [ ] Add profile photo
- [ ] Add phone number
- [ ] Add location
- [ ] Add preferred contact method
- [ ] Add profile editing
- [ ] Add profile deletion

### Professional Profile

- [ ] Create professional profile
- [ ] Add business/professional name
- [ ] Add profile photo/logo
- [ ] Add description
- [ ] Add trade
- [ ] Add services
- [ ] Add location
- [ ] Add service radius
- [ ] Add years of experience
- [ ] Add phone number
- [ ] Add website
- [ ] Add availability
- [ ] Add profile editing
- [ ] Add profile preview

### Profile Quality

- [ ] Add profile completion percentage
- [ ] Show missing profile information
- [ ] Encourage professionals to complete profiles
- [ ] Prevent publishing incomplete professional profiles where required

---

## Phase 6 — Professional Marketplace

### Professional Listings

- [ ] Create professional marketplace page
- [ ] Display professional cards
- [ ] Display professional name
- [ ] Display trade
- [ ] Display location
- [ ] Display rating
- [ ] Display review count
- [ ] Display verification status
- [ ] Display badges
- [ ] Display availability
- [ ] Display service radius
- [ ] Add professional profile page

### Professional Discovery

- [ ] Search professionals
- [ ] Filter by trade
- [ ] Filter by location
- [ ] Filter by service radius
- [ ] Filter by rating
- [ ] Filter by verification
- [ ] Filter by availability
- [ ] Sort results
- [ ] Add pagination/infinite scrolling

---

## Phase 7 — Interactive Map

### Map Foundation

- [ ] Configure Leaflet
- [ ] Configure React Leaflet
- [ ] Create reusable map component
- [ ] Add map container
- [ ] Add zoom controls
- [ ] Add location markers
- [ ] Add marker popups
- [ ] Add map/list synchronized navigation

### Professional Map

- [ ] Display professionals on map
- [ ] Cluster nearby professionals
- [ ] Filter map markers
- [ ] Select professional from marker
- [ ] Open professional profile from marker
- [ ] Center map on selected professional

### Location

- [ ] Add geocoding
- [ ] Convert addresses to coordinates
- [ ] Store latitude
- [ ] Store longitude
- [ ] Allow location-based searching
- [ ] Add current-location option
- [ ] Handle location permission denial

---

## Phase 8 — Appels d'offres / Jobs

### Job Creation

- [ ] Create job posting page
- [ ] Add job title
- [ ] Add job description
- [ ] Select trade
- [ ] Add location
- [ ] Add budget
- [ ] Add desired date
- [ ] Add deadline
- [ ] Add photos/files
- [ ] Add additional requirements
- [ ] Validate job form
- [ ] Publish job

### Job Marketplace

- [ ] Create job marketplace
- [ ] Display job cards
- [ ] Display job location
- [ ] Display trade
- [ ] Display budget
- [ ] Display deadline
- [ ] Display posting date
- [ ] Filter jobs by trade
- [ ] Filter jobs by location
- [ ] Filter jobs by budget
- [ ] Filter jobs by deadline
- [ ] Search jobs

### Job Details

- [ ] Create job details page
- [ ] Display complete job information
- [ ] Display client information
- [ ] Display job location
- [ ] Display applications
- [ ] Add apply button for professionals
- [ ] Add edit job functionality for clients
- [ ] Add close/cancel job functionality

---

## Phase 9 — Professional Applications

### Application Creation

- [ ] Create application form
- [ ] Add message
- [ ] Add proposed price
- [ ] Add proposed date
- [ ] Add estimated duration
- [ ] Submit application
- [ ] Prevent duplicate applications
- [ ] Allow professional to withdraw application

### Client Application Management

- [ ] Display received applications
- [ ] Display applicant profile
- [ ] Display applicant rating
- [ ] Display applicant verification
- [ ] Display proposed price
- [ ] Display proposed date
- [ ] Accept application
- [ ] Reject application
- [ ] Contact applicant

### Application Status

- [ ] Pending
- [ ] Accepted
- [ ] Rejected
- [ ] Withdrawn
- [ ] Completed
- [ ] Cancelled

---

## Phase 10 — Reviews & Ratings

### Review System

- [ ] Create review form
- [ ] Add star rating
- [ ] Add written review
- [ ] Allow client to review professional
- [ ] Allow professional to review client
- [ ] Associate review with completed job
- [ ] Prevent duplicate reviews
- [ ] Display reviews on profiles

### Rating Calculations

- [ ] Calculate average rating
- [ ] Calculate review count
- [ ] Update rating after new review
- [ ] Handle deleted/moderated reviews correctly

---

## Phase 11 — Professional Verification

### Verification

- [ ] Create verification workflow
- [ ] Allow professionals to request verification
- [ ] Collect required information
- [ ] Collect verification documents
- [ ] Create verification status
- [ ] Add pending status
- [ ] Add approved status
- [ ] Add rejected status
- [ ] Add expired status

### Admin Verification

- [ ] Display pending verification requests
- [ ] View submitted information
- [ ] View submitted documents
- [ ] Approve verification
- [ ] Reject verification
- [ ] Request additional information
- [ ] Record reviewer
- [ ] Record verification date

### Public Verification

- [ ] Display verified badge
- [ ] Explain verification meaning
- [ ] Prevent misleading verification claims

---

## Phase 12 — Professional Badges

### Badge System

- [ ] Create badge entity
- [ ] Create badge administration
- [ ] Display badges on profiles
- [ ] Display badge descriptions
- [ ] Create badge assignment system
- [ ] Record badge award date

### Initial Badges

- [ ] Verified Professional
- [ ] Highly Rated
- [ ] Fast Responder
- [ ] Experienced Professional
- [ ] Reliable Professional
- [ ] Completed Jobs milestone

### Badge Logic

- [ ] Define badge requirements
- [ ] Automatically calculate eligible badges where appropriate
- [ ] Prevent duplicate badges
- [ ] Allow admin override where necessary

---

## Phase 13 — Client Dashboard

### Dashboard

- [ ] Create client dashboard
- [ ] Display active jobs
- [ ] Display pending applications
- [ ] Display accepted jobs
- [ ] Display completed jobs
- [ ] Display recent activity

### Job Management

- [ ] Create new job from dashboard
- [ ] Edit existing job
- [ ] Close job
- [ ] Cancel job
- [ ] View applications
- [ ] Accept professional
- [ ] Reject professional
- [ ] Mark job completed
- [ ] Leave review

### Client Profile

- [ ] View profile
- [ ] Edit profile
- [ ] Change account settings
- [ ] Manage notifications

---

## Phase 14 — Professional Dashboard

### Dashboard

- [ ] Create professional dashboard
- [ ] Display profile completion
- [ ] Display active applications
- [ ] Display accepted jobs
- [ ] Display completed jobs
- [ ] Display ratings
- [ ] Display recent activity

### Job Discovery

- [ ] Display recommended jobs
- [ ] Display nearby jobs
- [ ] Display jobs matching trade
- [ ] Display jobs within service radius
- [ ] Allow application from dashboard

### Professional Management

- [ ] Edit professional profile
- [ ] Manage services
- [ ] Manage availability
- [ ] Manage service radius
- [ ] View reviews
- [ ] View badges
- [ ] Manage verification

---

## Phase 15 — Admin Dashboard

### Admin Overview

- [ ] Create admin dashboard
- [ ] Display user count
- [ ] Display professional count
- [ ] Display client count
- [ ] Display active jobs
- [ ] Display pending applications
- [ ] Display pending verifications
- [ ] Display reports

### User Management

- [ ] Search users
- [ ] View user
- [ ] Edit user
- [ ] Suspend user
- [ ] Reactivate user
- [ ] Delete user where appropriate
- [ ] Change role where authorized

### Marketplace Management

- [ ] View jobs
- [ ] Moderate jobs
- [ ] View applications
- [ ] Moderate reviews
- [ ] Manage professionals
- [ ] Manage trades
- [ ] Manage badges

### Verification Management

- [ ] Review verification requests
- [ ] Approve verification
- [ ] Reject verification
- [ ] Request additional information

---

## Phase 16 — Search & Discovery

### Global Search

- [ ] Create search interface
- [ ] Search professionals
- [ ] Search jobs
- [ ] Search trades/services
- [ ] Add search suggestions
- [ ] Add recent searches

### Filters

- [ ] Trade filter
- [ ] Location filter
- [ ] Distance filter
- [ ] Rating filter
- [ ] Verification filter
- [ ] Availability filter
- [ ] Budget filter
- [ ] Date filter

### Sorting

- [ ] Sort by relevance
- [ ] Sort by distance
- [ ] Sort by rating
- [ ] Sort by newest
- [ ] Sort by price where relevant

---

## Phase 17 — Location System

### Geographic Data

- [ ] Standardize countries
- [ ] Standardize regions
- [ ] Standardize cities
- [ ] Store coordinates
- [ ] Store service radius
- [ ] Validate locations

### Geographic Discovery

- [ ] Find professionals near a location
- [ ] Find jobs near a location
- [ ] Calculate approximate distance
- [ ] Filter by geographic radius
- [ ] Display regional demand

### Initial Markets

- [ ] Canada
- [ ] France
- [ ] Italy
- [ ] Design architecture so additional countries can be added later

---

## Phase 18 — Notifications

### Notification System

- [ ] Create notification entity
- [ ] Create notification service
- [ ] Display notification center
- [ ] Mark notification as read
- [ ] Mark all notifications as read
- [ ] Delete/clear notifications where appropriate

### Notification Events

- [ ] New application
- [ ] Application accepted
- [ ] Application rejected
- [ ] New message
- [ ] Job deadline approaching
- [ ] Job completed
- [ ] Review received
- [ ] Verification approved
- [ ] Verification rejected
- [ ] Account-related events

### Delivery

- [ ] In-app notifications
- [ ] Email notifications
- [ ] Notification preferences
- [ ] Notification frequency controls

---

## Phase 19 — Messaging

### Messaging Foundation

- [ ] Create conversations
- [ ] Create messages
- [ ] Display conversation list
- [ ] Display message thread
- [ ] Send messages
- [ ] Receive messages
- [ ] Mark messages as read

### Marketplace Messaging

- [ ] Allow client to contact professional
- [ ] Allow professional to contact client
- [ ] Link conversations to jobs
- [ ] Prevent unauthorized conversation access
- [ ] Add message timestamps

### Messaging UX

- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Unread indicators
- [ ] Mobile messaging layout

---

## Phase 20 — Security

### Authentication Security

- [ ] Hash passwords securely
- [ ] Protect sessions
- [ ] Validate authentication server-side
- [ ] Protect privileged routes
- [ ] Prevent privilege escalation
- [ ] Implement secure password reset

### Authorization

- [ ] Verify ownership of resources
- [ ] Verify user roles server-side
- [ ] Protect admin functionality
- [ ] Protect private messages
- [ ] Protect private documents
- [ ] Protect verification documents

### Input Security

- [ ] Validate all user input
- [ ] Sanitize user-generated content
- [ ] Prevent SQL injection
- [ ] Prevent XSS
- [ ] Prevent unauthorized file uploads
- [ ] Add rate limiting where required

---

## Phase 21 — File Uploads

### Upload System

- [ ] Choose storage provider
- [ ] Configure file storage
- [ ] Create upload service
- [ ] Validate file types
- [ ] Validate file sizes
- [ ] Generate safe filenames
- [ ] Secure uploaded files

### User Uploads

- [ ] Profile photos
- [ ] Professional portfolio images
- [ ] Job images
- [ ] Verification documents
- [ ] Message attachments where appropriate

### File Management

- [ ] Preview uploaded files
- [ ] Delete files
- [ ] Replace files
- [ ] Handle failed uploads
- [ ] Restrict access to private files

---

## Phase 22 — Responsive Design

### Desktop

- [ ] Optimize landing page
- [ ] Optimize marketplace
- [ ] Optimize map
- [ ] Optimize dashboards
- [ ] Optimize admin dashboard

### Mobile

- [ ] Mobile navigation
- [ ] Mobile marketplace
- [ ] Mobile map
- [ ] Mobile job creation
- [ ] Mobile job details
- [ ] Mobile applications
- [ ] Mobile messaging
- [ ] Mobile dashboards
- [ ] Mobile admin interface where appropriate

### Responsive Verification

- [ ] Test small phones
- [ ] Test large phones
- [ ] Test tablets
- [ ] Test laptops
- [ ] Test large desktop screens

---

## Phase 23 — Error & Loading States

### Loading

- [ ] Page loading states
- [ ] Component loading states
- [ ] Button loading states
- [ ] Form submission states
- [ ] Map loading state
- [ ] Image loading states

### Errors

- [ ] Network error handling
- [ ] Authentication errors
- [ ] Authorization errors
- [ ] Validation errors
- [ ] Database errors
- [ ] Upload errors
- [ ] Map errors
- [ ] 404 page
- [ ] Global error boundary

### Empty States

- [ ] No professionals found
- [ ] No jobs found
- [ ] No applications
- [ ] No messages
- [ ] No notifications
- [ ] No reviews
- [ ] No search results

---

## Phase 24 — UX Polish

### General UX

- [ ] Consistent spacing
- [ ] Consistent typography
- [ ] Consistent buttons
- [ ] Consistent forms
- [ ] Consistent cards
- [ ] Consistent modals
- [ ] Consistent status indicators
- [ ] Consistent iconography

### Interaction

- [ ] Add hover states
- [ ] Add focus states
- [ ] Add active states
- [ ] Add disabled states
- [ ] Add transitions
- [ ] Add meaningful animations
- [ ] Avoid unnecessary animations

### Accessibility

- [ ] Keyboard navigation
- [ ] Visible focus states
- [ ] Semantic HTML
- [ ] Form labels
- [ ] Accessible buttons
- [ ] Accessible dialogs
- [ ] Sufficient contrast
- [ ] Screen-reader-friendly states

---

## Phase 25 — Legal & Trust

### Legal Pages

- [ ] Privacy policy
- [ ] Terms of service
- [ ] Cookie policy where required
- [ ] Community guidelines
- [ ] Professional verification explanation
- [ ] Review policy

### Trust

- [ ] Explain verification
- [ ] Explain reviews
- [ ] Explain reporting
- [ ] Explain user safety
- [ ] Add report functionality
- [ ] Add block functionality where appropriate
- [ ] Add contact/support functionality

---

## Phase 26 — Analytics

### Product Analytics

- [ ] Choose analytics solution
- [ ] Configure analytics
- [ ] Track landing page visits
- [ ] Track registrations
- [ ] Track profile creation
- [ ] Track job creation
- [ ] Track professional discovery
- [ ] Track applications
- [ ] Track completed jobs
- [ ] Track reviews

### Marketplace Metrics

- [ ] Number of clients
- [ ] Number of professionals
- [ ] Number of active jobs
- [ ] Number of applications
- [ ] Application rate
- [ ] Job completion rate
- [ ] Review rate
- [ ] Regional activity

---

## Phase 27 — Performance

### Frontend Performance

- [ ] Optimize images
- [ ] Lazy-load heavy content
- [ ] Code-split routes
- [ ] Reduce unnecessary dependencies
- [ ] Optimize map rendering
- [ ] Optimize large lists
- [ ] Avoid unnecessary re-renders

### Backend Performance

- [ ] Add database indexes
- [ ] Optimize queries
- [ ] Paginate large datasets
- [ ] Cache where appropriate
- [ ] Optimize API responses

### Performance Verification

- [ ] Test production build
- [ ] Test slow network
- [ ] Test low-end devices
- [ ] Test large datasets

---

## Phase 28 — Testing

### Unit Tests

- [ ] Configure testing framework
- [ ] Test utility functions
- [ ] Test validation
- [ ] Test calculations
- [ ] Test business logic

### Component Tests

- [ ] Test forms
- [ ] Test buttons
- [ ] Test cards
- [ ] Test navigation
- [ ] Test authentication UI
- [ ] Test dashboards

### Integration Tests

- [ ] Test signup
- [ ] Test login
- [ ] Test profile creation
- [ ] Test job creation
- [ ] Test application flow
- [ ] Test review flow
- [ ] Test verification flow

### End-to-End Tests

- [ ] Test complete client journey
- [ ] Test complete professional journey
- [ ] Test admin journey
- [ ] Test marketplace discovery
- [ ] Test job application
- [ ] Test job completion

---

## Phase 29 — Deployment

### Production Setup

- [ ] Choose hosting provider
- [ ] Configure production frontend
- [ ] Configure production backend
- [ ] Configure production database
- [ ] Configure environment variables
- [ ] Configure custom domain
- [ ] Configure HTTPS
- [ ] Configure DNS

### Deployment

- [ ] Create production build
- [ ] Deploy frontend
- [ ] Deploy backend
- [ ] Run database migrations
- [ ] Seed required production data
- [ ] Verify authentication
- [ ] Verify marketplace
- [ ] Verify map
- [ ] Verify jobs
- [ ] Verify applications

---

## Phase 30 — Monitoring

### Infrastructure

- [ ] Configure error monitoring
- [ ] Configure uptime monitoring
- [ ] Monitor server health
- [ ] Monitor database health
- [ ] Monitor storage
- [ ] Monitor API errors

### Product Monitoring

- [ ] Monitor signup failures
- [ ] Monitor job creation failures
- [ ] Monitor application failures
- [ ] Monitor messaging failures
- [ ] Monitor verification failures

### Recovery

- [ ] Configure database backups
- [ ] Test database restoration
- [ ] Document rollback procedure
- [ ] Document incident procedure

---

## Phase 31 — Payments

### Payment Architecture

- [ ] Choose payment provider
- [ ] Design payment model
- [ ] Design transaction model
- [ ] Design platform fees
- [ ] Design refunds
- [ ] Design disputes
- [ ] Design payout system

### Payment Implementation

- [ ] Client payment flow
- [ ] Professional payout flow
- [ ] Payment status tracking
- [ ] Transaction history
- [ ] Refund handling
- [ ] Failed payment handling
- [ ] Webhook handling
- [ ] Payment security

### Important

- [ ] Keep payments out of the initial MVP
- [ ] Do not build payment infrastructure before the marketplace itself works

---

## Phase 32 — Advanced Matching

### Matching

- [ ] Match jobs to professionals
- [ ] Match based on trade
- [ ] Match based on location
- [ ] Match based on service radius
- [ ] Match based on availability
- [ ] Match based on ratings
- [ ] Match based on previous jobs
- [ ] Display recommended professionals
- [ ] Display recommended jobs

### Matching Improvements

- [ ] Track successful matches
- [ ] Measure match quality
- [ ] Improve ranking algorithm
- [ ] Allow users to hide irrelevant recommendations

---

## Phase 33 — Demand Analytics

### Regional Demand

- [ ] Calculate jobs by region
- [ ] Calculate jobs by trade
- [ ] Calculate professional density
- [ ] Calculate supply/demand ratio
- [ ] Display demand on map
- [ ] Display high-demand regions
- [ ] Display high-demand trades

### Professional Insights

- [ ] Show demand near professional
- [ ] Show underserved areas
- [ ] Show popular services
- [ ] Show seasonal demand
- [ ] Show marketplace trends

---

## Phase 34 — Advanced Professional Tools

### Business Management

- [ ] Professional job history
- [ ] Professional earnings overview
- [ ] Customer history
- [ ] Availability calendar
- [ ] Service management
- [ ] Portfolio management
- [ ] Business information management

### Professional Growth

- [ ] Performance statistics
- [ ] Profile analytics
- [ ] Application analytics
- [ ] Review analytics
- [ ] Badge progression
- [ ] Profile optimization suggestions

---

## Phase 35 — Advanced Client Tools

### Client Management

- [ ] Saved professionals
- [ ] Favorite professionals
- [ ] Saved searches
- [ ] Job templates
- [ ] Previous jobs
- [ ] Repeat professional hiring

### Client Discovery

- [ ] Compare professionals
- [ ] Shortlist professionals
- [ ] Save jobs
- [ ] Get recommendations
- [ ] Receive local demand/service suggestions

---

## Phase 36 — AI Features

### AI-Assisted Job Creation

- [ ] Generate job description
- [ ] Detect missing information
- [ ] Suggest appropriate trade
- [ ] Suggest relevant questions
- [ ] Suggest budget range where appropriate
- [ ] Improve job clarity

### AI-Assisted Discovery

- [ ] Natural-language search
- [ ] Semantic professional search
- [ ] Semantic job search
- [ ] Intelligent recommendations

### AI-Assisted Professionals

- [ ] Generate profile descriptions
- [ ] Improve service descriptions
- [ ] Suggest profile improvements
- [ ] Summarize reviews
- [ ] Generate response suggestions

### AI Safety

- [ ] Never allow AI to make unsupported claims
- [ ] Clearly distinguish AI-generated content
- [ ] Allow users to edit AI-generated content
- [ ] Do not make AI a dependency for core marketplace functionality

---

## Phase 37 — Internationalization

### Languages

- [ ] Prepare translation architecture
- [ ] Support English
- [ ] Support French
- [ ] Support Italian
- [ ] Prepare for additional languages
- [ ] Translate navigation
- [ ] Translate forms
- [ ] Translate dashboards
- [ ] Translate marketplace
- [ ] Translate system messages

### Regionalization

- [ ] Country-specific locations
- [ ] Country-specific address formats
- [ ] Country-specific phone formats
- [ ] Currency support
- [ ] Date formatting
- [ ] Time formatting
- [ ] Legal requirements by market

---

## Phase 38 — Advanced Marketplace Features

### Marketplace Tools

- [ ] Saved searches
- [ ] Favorite professionals
- [ ] Favorite jobs
- [ ] Professional comparison
- [ ] Job comparison
- [ ] Advanced filtering
- [ ] Advanced sorting
- [ ] Marketplace recommendations

### Portfolio

- [ ] Professional portfolios
- [ ] Before/after images
- [ ] Project descriptions
- [ ] Project categories
- [ ] Portfolio filtering

### Availability

- [ ] Professional availability calendar
- [ ] Client preferred dates
- [ ] Availability matching
- [ ] Availability status

---

## Phase 39 — Moderation & Trust & Safety

### Reporting

- [ ] Report user
- [ ] Report job
- [ ] Report review
- [ ] Report message
- [ ] Report professional
- [ ] Create moderation queue

### Moderation

- [ ] Admin moderation interface
- [ ] Review reports
- [ ] Resolve reports
- [ ] Suspend accounts
- [ ] Remove inappropriate content
- [ ] Record moderation actions
- [ ] Create moderation audit log

### Abuse Prevention

- [ ] Rate-limit suspicious actions
- [ ] Detect spam
- [ ] Detect duplicate accounts
- [ ] Detect suspicious reviews
- [ ] Detect suspicious applications
- [ ] Protect users from harassment
- [ ] Provide blocking functionality

---

## Phase 40 — MVP Completion

### Core User Journey

- [ ] Visitor can open landing page
- [ ] Visitor can understand Beaver
- [ ] Visitor can register
- [ ] User can choose Client or Professional
- [ ] User can create profile
- [ ] Client can browse professionals
- [ ] Client can browse the map
- [ ] Client can create a job
- [ ] Job appears in marketplace
- [ ] Professional can discover job
- [ ] Professional can apply
- [ ] Client can view application
- [ ] Client can accept professional
- [ ] Users can communicate
- [ ] Job can be completed
- [ ] Users can review each other

### Admin Journey

- [ ] Admin can access dashboard
- [ ] Admin can manage users
- [ ] Admin can manage jobs
- [ ] Admin can manage professionals
- [ ] Admin can verify professionals
- [ ] Admin can moderate reviews
- [ ] Admin can handle reports

---

## Phase 41 — MVP QA

### Functional QA

- [ ] Test signup
- [ ] Test login
- [ ] Test logout
- [ ] Test profile creation
- [ ] Test professional discovery
- [ ] Test map
- [ ] Test job creation
- [ ] Test job discovery
- [ ] Test applications
- [ ] Test messaging
- [ ] Test job completion
- [ ] Test reviews
- [ ] Test verification
- [ ] Test admin controls

### Edge Cases

- [ ] Test empty database
- [ ] Test missing profile information
- [ ] Test invalid forms
- [ ] Test duplicate applications
- [ ] Test deleted users
- [ ] Test deleted jobs
- [ ] Test unauthorized access
- [ ] Test expired sessions
- [ ] Test failed network requests
- [ ] Test failed uploads

---

## Phase 42 — Production UX Review

### Visual Consistency

- [ ] Review typography
- [ ] Review spacing
- [ ] Review colors
- [ ] Review buttons
- [ ] Review cards
- [ ] Review forms
- [ ] Review navigation
- [ ] Review dashboards
- [ ] Review map
- [ ] Review mobile layouts

### Product Consistency

- [ ] Ensure every button has a real action
- [ ] Remove fake interactions
- [ ] Remove placeholder data where possible
- [ ] Remove dead routes
- [ ] Remove unused components
- [ ] Remove unused dependencies
- [ ] Remove debug logging
- [ ] Remove temporary UI

---

## Phase 43 — Launch Preparation

### Product

- [ ] Confirm MVP scope
- [ ] Confirm supported countries
- [ ] Confirm supported trades
- [ ] Confirm user roles
- [ ] Confirm verification process
- [ ] Confirm moderation process
- [ ] Confirm support process

### Technical

- [ ] Production environment configured
- [ ] Database backups configured
- [ ] Error monitoring configured
- [ ] Analytics configured
- [ ] Domain configured
- [ ] HTTPS verified
- [ ] Authentication verified
- [ ] Database migrations verified
- [ ] Deployment process documented

### Documentation

- [ ] Update README
- [ ] Document local development
- [ ] Document environment variables
- [ ] Document deployment
- [ ] Document database setup
- [ ] Document admin access
- [ ] Document troubleshooting

---

## Phase 44 — Initial Launch

### Launch

- [ ] Deploy production application
- [ ] Verify production application
- [ ] Create production admin account
- [ ] Add initial trade categories
- [ ] Add initial supported locations
- [ ] Test production signup
- [ ] Test production login
- [ ] Test production marketplace
- [ ] Test production jobs
- [ ] Test production applications
- [ ] Test production messaging
- [ ] Test production reviews

### Initial Marketplace

- [ ] Recruit initial professionals
- [ ] Create initial professional profiles
- [ ] Recruit initial clients
- [ ] Collect initial jobs
- [ ] Monitor marketplace activity
- [ ] Identify marketplace bottlenecks

---

## Phase 45 — Post-Launch Iteration

### Feedback

- [ ] Collect client feedback
- [ ] Collect professional feedback
- [ ] Track support requests
- [ ] Track failed user journeys
- [ ] Identify confusing UX
- [ ] Identify missing features

### Iteration

- [ ] Fix critical bugs
- [ ] Fix broken workflows
- [ ] Improve onboarding
- [ ] Improve marketplace discovery
- [ ] Improve job creation
- [ ] Improve applications
- [ ] Improve messaging
- [ ] Improve trust features

### Product Discipline

- [ ] Prioritize actual user problems
- [ ] Avoid building features without evidence
- [ ] Avoid premature scaling
- [ ] Avoid unnecessary redesigns
- [ ] Keep the marketplace core functional

---

## Phase 46 — Scale

### Technical Scaling

- [ ] Monitor database growth
- [ ] Monitor API load
- [ ] Monitor frontend performance
- [ ] Add caching where necessary
- [ ] Add database indexes where necessary
- [ ] Optimize expensive queries
- [ ] Introduce background jobs where necessary
- [ ] Introduce queues where necessary
- [ ] Improve infrastructure reliability

### Marketplace Scaling

- [ ] Expand supported cities
- [ ] Expand supported regions
- [ ] Expand supported countries
- [ ] Expand trade categories
- [ ] Improve professional onboarding
- [ ] Improve client acquisition
- [ ] Improve marketplace liquidity

---

## Phase 47 — Long-Term Product Expansion

### Marketplace Expansion

- [ ] Expand beyond initial countries
- [ ] Add additional trades
- [ ] Add business accounts
- [ ] Add teams
- [ ] Add companies
- [ ] Add larger projects
- [ ] Add recurring work
- [ ] Add commercial clients

### Platform Expansion

- [ ] Advanced payments
- [ ] Contracts
- [ ] Invoices
- [ ] Quotes
- [ ] Scheduling
- [ ] Calendar integration
- [ ] Accounting integrations
- [ ] Business management tools

### Ecosystem

- [ ] Build professional network effects
- [ ] Build client retention mechanisms
- [ ] Build reputation system
- [ ] Build regional marketplace intelligence

---

## Phase 48 — Suggested Data Model

### User

- [ ] `id`
- [ ] `email`
- [ ] `password_hash`
- [ ] `role`
- [ ] `first_name`
- [ ] `last_name`
- [ ] `phone`
- [ ] `avatar`
- [ ] `country`
- [ ] `city`
- [ ] `created_at`
- [ ] `updated_at`

### Professional

- [ ] `id`
- [ ] `user_id`
- [ ] `business_name`
- [ ] `description`
- [ ] `trade_id`
- [ ] `location`
- [ ] `latitude`
- [ ] `longitude`
- [ ] `service_radius`
- [ ] `years_experience`
- [ ] `website`
- [ ] `verification_status`
- [ ] `availability`
- [ ] `created_at`
- [ ] `updated_at`

### Client

- [ ] `id`
- [ ] `user_id`
- [ ] `location`
- [ ] `latitude`
- [ ] `longitude`
- [ ] `created_at`
- [ ] `updated_at`

### Trade

- [ ] `id`
- [ ] `name`
- [ ] `slug`
- [ ] `description`

### Job

- [ ] `id`
- [ ] `client_id`
- [ ] `trade_id`
- [ ] `title`
- [ ] `description`
- [ ] `location`
- [ ] `latitude`
- [ ] `longitude`
- [ ] `budget_min`
- [ ] `budget_max`
- [ ] `budget_type`
- [ ] `desired_date`
- [ ] `deadline`
- [ ] `status`
- [ ] `created_at`
- [ ] `updated_at`

### Application

- [ ] `id`
- [ ] `job_id`
- [ ] `professional_id`
- [ ] `message`
- [ ] `proposed_price`
- [ ] `proposed_date`
- [ ] `estimated_duration`
- [ ] `status`
- [ ] `created_at`
- [ ] `updated_at`

### Review

- [ ] `id`
- [ ] `job_id`
- [ ] `author_id`
- [ ] `recipient_id`
- [ ] `rating`
- [ ] `text`
- [ ] `status`
- [ ] `created_at`

### Verification

- [ ] `id`
- [ ] `professional_id`
- [ ] `type`
- [ ] `status`
- [ ] `documents`
- [ ] `reviewed_by`
- [ ] `reviewed_at`
- [ ] `created_at`

### Badge

- [ ] `id`
- [ ] `name`
- [ ] `description`
- [ ] `icon`

### ProfessionalBadge

- [ ] `professional_id`
- [ ] `badge_id`
- [ ] `awarded_at`

### Core Relationships

- [ ] User → Client
- [ ] User → Professional
- [ ] Professional → Trade
- [ ] Professional → Location
- [ ] Professional → Applications
- [ ] Professional → Reviews
- [ ] Professional → Verification
- [ ] Professional → Badges
- [ ] Client → Jobs
- [ ] Client → Reviews
- [ ] Job → Client
- [ ] Job → Trade
- [ ] Job → Location
- [ ] Job → Applications
- [ ] Application → Job
- [ ] Application → Professional
- [ ] Review → Author
- [ ] Review → Recipient
- [ ] Review → Job

---

## Phase 49 — GOLDEN RULE

### The Core Rule

- [ ] Build the thing people can actually use before building the thing that makes the screenshot look impressive.

### Beaver Development Priority

- [ ] Landing page
- [ ] Real application
- [ ] Real users
- [ ] Real professionals
- [ ] Real clients
- [ ] Real jobs
- [ ] Real applications
- [ ] Real communication
- [ ] Real completed jobs
- [ ] Real reviews
- [ ] Real marketplace activity
- [ ] Payments only after the marketplace itself works
- [ ] Advanced AI only after the core product works
- [ ] Advanced analytics only after real marketplace data exists
- [ ] Scaling only when actual usage requires it

### AI Coding Workflow

- [ ] Inspect the current repository before making changes
- [ ] Read the current README
- [ ] Check `git status`
- [ ] Check the current branch
- [ ] Inspect the relevant existing files
- [ ] Identify what is already implemented
- [ ] Identify the next unchecked task
- [ ] Identify the minimum files required
- [ ] Implement one coherent feature
- [ ] Build the application
- [ ] Test the feature
- [ ] Fix errors
- [ ] Update this README
- [ ] Mark completed tasks with `[x]`
- [ ] Commit the change
- [ ] Push the change
- [ ] Move to the next task

### Standard Git Workflow

- [ ] Run `git status`
- [ ] Run `git diff`
- [ ] Run `npm run build`
- [ ] Run `npm run lint`
- [ ] Run `git add .`
- [ ] Run `git commit -m "feat: description"`
- [ ] Run `git push`

### AI Must Not

- [ ] Rebuild features that already exist
- [ ] Replace working architecture without a reason
- [ ] Make assumptions about the current repository state
- [ ] Create unnecessary files
- [ ] Introduce unnecessary dependencies
- [ ] Implement multiple unrelated features at once
- [ ] Skip testing
- [ ] Leave the README out of sync
- [ ] Prioritize visual polish over broken core functionality
- [ ] Build payments before the marketplace works
- [ ] Build AI before the underlying workflow works
- [ ] Build complex infrastructure before it is needed

### Final Product Flow

- [ ] Visitor can understand Beaver
- [ ] Visitor can create an account
- [ ] User can choose Client or Professional
- [ ] User can create a profile
- [ ] Client can discover professionals
- [ ] Client can discover professionals geographically
- [ ] Client can create an appel d'offre/job
- [ ] Professional can discover jobs
- [ ] Professional can apply to jobs
- [ ] Client can review applications
- [ ] Client can select a professional
- [ ] Client and professional can communicate
- [ ] Job can be completed
- [ ] Both sides can leave reviews
- [ ] Professional reputation can grow
- [ ] Admin can manage the marketplace
- [ ] Beaver can support a real marketplace transaction flow

### GOLDEN RULE

- [ ] **Build the thing people can actually use before building the thing that makes the screenshot look impressive.**

### Remember

- [ ] The core product is the marketplace.
- [ ] Every implementation decision should be evaluated against whether it makes the marketplace more functional, trustworthy, usable, or scalable.
- [ ] A beautiful landing page with no marketplace is not the product.
- [ ] Stripe is not the product.
- [ ] AI is not the product.
- [ ] Analytics are not the product.
- [ ] The marketplace is the product.

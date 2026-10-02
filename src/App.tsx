import {
  ArrowRight,
  Check,
  ChevronDown,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
} from 'lucide-react'
import { useState } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-forest-900">
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-forest-900/10 bg-paper/90 px-4 py-3 shadow-lg shadow-forest-950/5 backdrop-blur-md sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-900 text-paper">
              <Wrench size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight">beaver</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a className="transition-opacity hover:opacity-60" href="#how-it-works">
              How it works
            </a>
            <a className="transition-opacity hover:opacity-60" href="#professionals">
              Find a professional
            </a>
            <a className="transition-opacity hover:opacity-60" href="#for-pros">
              For professionals
            </a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-60">
              Log in
            </button>
            <button className="rounded-full bg-forest-900 px-5 py-2.5 text-sm font-semibold text-paper transition-transform hover:scale-[1.03]">
              Get started
            </button>
          </div>

          <button
            className="rounded-full p-2 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-forest-900/10 bg-paper p-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-1">
              <a
                href="#how-it-works"
                className="rounded-xl px-4 py-3 font-medium hover:bg-cream"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it works
              </a>
              <a
                href="#professionals"
                className="rounded-xl px-4 py-3 font-medium hover:bg-cream"
                onClick={() => setMobileMenuOpen(false)}
              >
                Find a professional
              </a>
              <a
                href="#for-pros"
                className="rounded-xl px-4 py-3 font-medium hover:bg-cream"
                onClick={() => setMobileMenuOpen(false)}
              >
                For professionals
              </a>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-forest-900/10 pt-3">
                <button className="rounded-xl px-4 py-3 text-sm font-semibold">
                  Log in
                </button>
                <button className="rounded-xl bg-forest-900 px-4 py-3 text-sm font-semibold text-paper">
                  Get started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <main>
        <section className="relative isolate min-h-[760px] overflow-hidden px-4 pb-20 pt-36 sm:px-6 lg:px-8">
          <div className="absolute left-1/2 top-24 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sage/30 blur-3xl" />

          <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-forest-900/10 bg-paper px-3.5 py-2 text-xs font-semibold shadow-sm">
                <Sparkles size={14} />
                <span>Better work starts here</span>
              </div>

              <h1 className="text-balance text-5xl font-extrabold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                The right pro.
                <br />
                <span className="text-forest-700">Right when you need one.</span>
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-forest-900/65 sm:text-xl">
                Find trusted local tradespeople, post a job, and let the right
                professionals come to you.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <button className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest-900 px-6 py-3.5 font-semibold text-paper transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  Find a professional
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-900/15 bg-paper px-6 py-3.5 font-semibold transition-all hover:-translate-y-0.5 hover:bg-white">
                  Post a job
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-forest-900/60">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} />
                  Verified professionals
                </span>
                <span className="flex items-center gap-2">
                  <Star size={16} fill="currentColor" />
                  Real reviews
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  Local jobs
                </span>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-800 shadow-2xl shadow-forest-950/20">
                <img
                  src="/src/assets/hero.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-luminosity"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/40 to-transparent" />

                <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-paper/20 bg-paper/95 p-5 shadow-2xl backdrop-blur-md sm:inset-x-7 sm:bottom-7 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-forest-900/45">
                        Your area
                      </p>
                      <div className="mt-1 flex items-center gap-1.5 font-bold">
                        <MapPin size={16} />
                        Montreal
                      </div>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/40">
                      <Search size={17} />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      ['Plumber', '12 available nearby'],
                      ['Electrician', '8 available nearby'],
                      ['Carpenter', '6 available nearby'],
                    ].map(([trade, availability]) => (
                      <div
                        key={trade}
                        className="flex items-center justify-between rounded-2xl border border-forest-900/8 bg-cream px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-paper">
                            <Wrench size={14} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{trade}</p>
                            <p className="text-xs text-forest-900/50">
                              {availability}
                            </p>
                          </div>
                        </div>

                        <ArrowRight size={15} className="text-forest-900/40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-forest-900/10 bg-paper p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage">
                    <Check size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Verified</p>
                    <p className="text-xs text-forest-900/50">
                      Professionals you can trust
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-y border-forest-900/10 bg-paper px-4 py-7 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-medium text-forest-900/50 sm:justify-between">
            <span>PLUMBING</span>
            <span>ELECTRICAL</span>
            <span>CARPENTRY</span>
            <span>HVAC</span>
            <span>PAINTING</span>
            <span>AND MORE</span>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
                Simple by design
              </p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Getting work done shouldn't be complicated.
              </h2>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Describe your job',
                  text: 'Tell us what needs doing, where, and what you are looking for.',
                },
                {
                  number: '02',
                  title: 'Meet the right pros',
                  text: 'Discover professionals nearby, compare their profiles, and see their work.',
                },
                {
                  number: '03',
                  title: 'Get it done',
                  text: 'Choose the professional that fits your job and get to work.',
                },
              ].map((step) => (
                <article
                  key={step.number}
                  className="group rounded-[2rem] border border-forest-900/10 bg-paper p-7 transition-transform hover:-translate-y-1 sm:p-9"
                >
                  <span className="text-sm font-bold text-forest-700">
                    {step.number}
                  </span>
                  <h3 className="mt-12 text-2xl font-bold">{step.title}</h3>
                  <p className="mt-3 leading-7 text-forest-900/60">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Marketplace preview */}
        <section
          id="professionals"
          className="overflow-hidden bg-forest-900 px-4 py-24 text-paper sm:px-6 lg:px-8 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-sage">
                One marketplace
              </p>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                See what's happening around you.
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-paper/65">
                Browse professionals and open jobs on an interactive map.
                Filter by trade, location, and the kind of work you need.
              </p>

              <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3.5 font-semibold text-forest-900 transition-transform hover:-translate-y-0.5">
                Explore the marketplace
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-forest-800">
              <div className="absolute inset-0 opacity-40">
                <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,rgba(159,202,179,0.5)_1px,transparent_1px)] bg-[length:32px_32px]" />
              </div>

              <div className="absolute inset-8 rounded-[1.5rem] border border-paper/10 bg-forest-950/20">
                <div className="absolute left-[24%] top-[22%] h-4 w-4 rounded-full bg-sage shadow-[0_0_0_8px_rgba(159,202,179,0.12)]" />
                <div className="absolute left-[63%] top-[32%] h-4 w-4 rounded-full bg-sage shadow-[0_0_0_8px_rgba(159,202,179,0.12)]" />
                <div className="absolute left-[42%] top-[57%] h-4 w-4 rounded-full bg-sage shadow-[0_0_0_8px_rgba(159,202,179,0.12)]" />
                <div className="absolute left-[72%] top-[69%] h-4 w-4 rounded-full bg-sage shadow-[0_0_0_8px_rgba(159,202,179,0.12)]" />
                <div className="absolute left-[20%] top-[76%] h-4 w-4 rounded-full bg-sage shadow-[0_0_0_8px_rgba(159,202,179,0.12)]" />

                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-paper p-4 text-forest-900 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-900/45">
                    <MapPin size={13} />
                    Nearby activity
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-extrabold">26</p>
                      <p className="text-xs text-forest-900/50">
                        professionals & jobs
                      </p>
                    </div>
                    <span className="rounded-full bg-sage/40 px-3 py-1 text-xs font-bold">
                      Live area
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professionals CTA */}
        <section id="for-pros" className="px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-sage/35 px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
                  For professionals
                </p>
                <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Good work deserves good work.
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-forest-900/65">
                  Build your profile, showcase your expertise, and find jobs
                  that actually fit what you do.
                </p>
              </div>

              <button className="group inline-flex w-fit items-center gap-2 rounded-full bg-forest-900 px-6 py-3.5 font-semibold text-paper">
                Join Beaver
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ-ish final CTA */}
        <section className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2rem] bg-paper px-6 py-16 text-center shadow-sm sm:px-12">
            <div className="mx-auto max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
                Ready when you are
              </p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Let's get something fixed.
              </h2>
              <p className="mt-5 text-lg text-forest-900/60">
                Find a professional or post your first job in just a few
                minutes.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <button className="rounded-full bg-forest-900 px-7 py-3.5 font-semibold text-paper">
                  Get started
                </button>
                <button className="inline-flex items-center justify-center gap-2 rounded-full border border-forest-900/15 px-7 py-3.5 font-semibold">
                  Learn more
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-forest-900/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-900 text-paper">
              <Wrench size={15} />
            </div>
            <span className="font-extrabold">beaver</span>
          </div>

          <p className="text-sm text-forest-900/45">
            The marketplace for getting good work done.
          </p>

          <p className="text-xs text-forest-900/40">
            © {new Date().getFullYear()} Beaver
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
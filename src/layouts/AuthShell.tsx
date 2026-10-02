import { Link, Outlet } from "react-router-dom"

function AuthShell() {
  return (
    <div className="min-h-screen bg-cream text-forest-900 lg:grid lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="hidden bg-forest-900 px-10 py-12 text-paper lg:flex lg:flex-col lg:justify-between xl:px-16">
        <div>
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-paper"
          >
            Beaver
          </Link>

          <div className="mt-24 max-w-lg">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sage">
              Your local trades marketplace
            </p>

            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight xl:text-6xl">
              Find the right pro for the job.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-8 text-paper/65">
              Connect with trusted local tradespeople, discover opportunities,
              and get work moving.
            </p>
          </div>
        </div>

        <p className="text-sm text-paper/40">
          © {new Date().getFullYear()} Beaver
        </p>
      </aside>

      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-6 py-6 lg:hidden">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-forest-900"
          >
            Beaver
          </Link>

          <Link
            to="/"
            className="text-sm font-semibold text-forest-900/55 transition hover:text-forest-900"
          >
            Back home
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}

export default AuthShell

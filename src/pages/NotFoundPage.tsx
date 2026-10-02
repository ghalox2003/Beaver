import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-cream px-6 py-32 text-forest-900">
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-forest-700">
          404
        </p>

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-6xl">
          This page wandered off.
        </h1>

        <p className="mt-5 max-w-lg text-lg text-forest-900/60">
          The page you're looking for doesn't exist or may have moved.
        </p>

        <Link
          to="/"
          className="mt-8 rounded-full bg-forest-900 px-6 py-3 text-sm font-bold !text-white transition-transform hover:-translate-y-0.5"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage

import { Outlet } from 'react-router-dom'

function ApplicationShell() {
  return (
    <div className="min-h-screen bg-cream text-forest-900">
      <Outlet />
    </div>
  )
}

export default ApplicationShell

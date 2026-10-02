import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminJobsPage from './pages/AdminJobsPage'
import AdminReportsPage from './pages/AdminReportsPage'
import AdminUsersPage from './pages/AdminUsersPage'
import ClientDashboardPage from './pages/ClientDashboardPage'
import ClientJobsPage from './pages/ClientJobsPage'
import ClientProfessionalsPage from './pages/ClientProfessionalsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import JobsPage from './pages/JobsPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MarketplacePage from './pages/MarketplacePage'
import NewJobPage from './pages/NewJobPage'
import ProfessionalApplicationsPage from './pages/ProfessionalApplicationsPage'
import ProfessionalDashboardPage from './pages/ProfessionalDashboardPage'
import ProfessionalJobsPage from './pages/ProfessionalJobsPage'
import ProfessionalProfilePage from './pages/ProfessionalProfilePage'
import ProfessionalsPage from './pages/ProfessionalsPage'
import ProtectedRoute from './components/ProtectedRoute'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/professionals" element={<ProfessionalsPage />} />
        <Route path="/jobs" element={<JobsPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/client" element={<ClientDashboardPage />} />
          <Route path="/client/jobs" element={<ClientJobsPage />} />
          <Route path="/client/jobs/new" element={<NewJobPage />} />
          <Route
            path="/client/professionals"
            element={<ClientProfessionalsPage />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['professional']} />}>
          <Route
            path="/professional"
            element={<ProfessionalDashboardPage />}
          />
          <Route
            path="/professional/jobs"
            element={<ProfessionalJobsPage />}
          />
          <Route
            path="/professional/applications"
            element={<ProfessionalApplicationsPage />}
          />
          <Route
            path="/professional/profile"
            element={<ProfessionalProfilePage />}
          />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/jobs" element={<AdminJobsPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

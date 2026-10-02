import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import JobsPage from './pages/JobsPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import MarketplacePage from './pages/MarketplacePage'
import ProfessionalsPage from './pages/ProfessionalsPage'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App

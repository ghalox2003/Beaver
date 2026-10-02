import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JobsPage from './pages/JobsPage'
import LandingPage from './pages/LandingPage'
import MarketplacePage from './pages/MarketplacePage'
import ProfessionalsPage from './pages/ProfessionalsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/professionals" element={<ProfessionalsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

import React from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/static/landing-page'
import Dashboard from './pages/dashboard/dashboard'
import Test from './Components/test'
import Analytics from './pages/dashboard/analytics'
import Discover from './pages/dashboard/discover'
import Events from './pages/dashboard/events'
import Settings from './pages/dashboard/settings'
import Tickets from './pages/dashboard/tickets'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<Events />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/tickets" element={<Tickets />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  )
}

export default App
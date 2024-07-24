import React from 'react'
import { Routes, Route } from "react-router-dom"
import LandingPage from './pages/static/landing-page'
import Dashboard from './pages/dashboard/dashboard'
// import Test from './Components/test'
import Analytics from './pages/dashboard/analytics'
import Discover from './pages/dashboard/discover'
import Events from './pages/dashboard/events'
import Settings from './pages/dashboard/settings'
import Tickets from './pages/dashboard/tickets'
import EventDetails from './pages/dashboard/event-details'
import { useState, useEffect } from 'react'
import { KitContext } from './context/kit-context'
import { StarknetProvider } from './context/starknet-provider'
import { useConnect, useDisconnect } from "@starknet-react/core";
import { useAccount } from "@starknet-react/core";

const App = () => {

  const { connect, connectors } = useConnect();
  const { account, address, status} = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <StarknetProvider>
      <KitContext.Provider value={{connect, disconnect, connectors, address, account}}>
      <Routes>
        <Route path="/" element={status == 'disconnected' ? <LandingPage /> : <Dashboard />} />
        <Route path="/dashboard" element={status == 'disconnected' ? <LandingPage /> : <Dashboard />} />
        <Route path="/analytics" element={status == 'disconnected' ? <LandingPage /> : <Analytics />} />
        <Route path="/discover" element={status == 'disconnected' ? <LandingPage /> : <Discover />} />
        <Route path="/events" element={status == 'disconnected' ? <LandingPage /> : <Events />} />
        <Route path="/events/:id" element={status == 'disconnected' ? <LandingPage /> : <EventDetails />} />

        <Route path="/settings" element={status == 'disconnected' ? <LandingPage /> : <Settings />} />
        <Route path="/tickets" element={status == 'disconnected' ? <LandingPage /> : <Tickets />} />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </KitContext.Provider>
    </StarknetProvider>
  )
}

export default App
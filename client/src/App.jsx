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
import { KitContext } from './context/kit-context'
import { StarknetProvider } from './context/starknet-provider'
import { useConnect, useDisconnect } from "@starknet-react/core";
import { useAccount } from "@starknet-react/core";
import CreateEvent from './pages/dashboard/create-event'
import { useContract } from "@starknet-react/core";
import { Contract } from 'starknet'
import eventAbi from './Abis/eventAbi.json'

const App = () => {

  const contractAddr = '0x03a6401c4b28ad044e00b85b3126663cc060098c8323b62d823a60fca10ed215';
  const { connect, connectors } = useConnect();
  const { account, address, status} = useAccount();
  const { disconnect } = useDisconnect();
  const { contract } = useContract({ abi: eventAbi, address: contractAddr, provider: account})

  const eventContract = new Contract(eventAbi, contractAddr, account)

  return (
    <StarknetProvider>
      <KitContext.Provider value={{connect, disconnect, connectors, address, account, contract, contractAddr, eventAbi, eventContract}}>
      <Routes>
        <Route path="/" element={status == 'disconnected' ? <LandingPage /> : <Dashboard />} />
        <Route path="/dashboard" element={status == 'disconnected' ? <LandingPage /> : <Dashboard />} />
        <Route path="/analytics" element={status == 'disconnected' ? <LandingPage /> : <Analytics />} />
        <Route path="/discover" element={status == 'disconnected' ? <LandingPage /> : <Discover />} />
        <Route path="/events" element={status == 'disconnected' ? <LandingPage /> : <Events />} />
        <Route path="/events/:id" element={status == 'disconnected' ? <LandingPage /> : <EventDetails />} />
        <Route path="/create-events" element={status == 'disconnected' ? <LandingPage /> : <CreateEvent />} />
        <Route path="/settings" element={status == 'disconnected' ? <LandingPage /> : <Settings />} />
        <Route path="/tickets" element={status == 'disconnected' ? <LandingPage /> : <Tickets />} />
        {/* <Route path="/test" element={<Test />} /> */}
      </Routes>
    </KitContext.Provider>
    </StarknetProvider>
  )
}

export default App
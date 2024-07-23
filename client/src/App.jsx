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
import EventDetails from './pages/dashboard/event-details'
import { useState, useEffect } from 'react'
import { connect, disconnect } from 'starknetkit' 
import { KitContext } from './context/kit-context'

const App = () => {
  const [connection, setConnection] = useState("");
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {

    const connectToStarknet = async () => {

      const connection = await connect({ modalMode: "neverAsk" })

      if (connection && connection.isConnected) {
        setConnection(connection);
        setProvider(connection.account);
        setAddress(connection.selectedAddress);
      }
    };

    connectToStarknet();
  }, [])

  const connectWallet = async () => {
    const connection = await connect();

    if (connection && connection.isConnected) {
      setConnection(connection)
      setProvider(connection.account)
      setAddress(connection.selectedAddress)
    }
  }

  const disconnectWallet = async () => {

    await disconnect();

    setConnection(undefined);
    setProvider(undefined);
    setAddress('');
  }

  const sogo = "nice"


  return (
    <KitContext.Provider  value={{disconnectWallet, connectWallet, address, provider, connection, sogo}}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/settings" element={<Settings />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </KitContext.Provider>

  )
}

export default App
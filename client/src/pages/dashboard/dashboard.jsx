import React, { useContext } from 'react'
import Layout from '../../Components/dashboard/layout'
import { KitContext } from '../../context/kit-context'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const {connect, connectors, address, account} = useContext(KitContext)
  console.log(account)
  return (
    <Layout>
      {/* <button onClick={disconnectWallet}>connect</button> */}
      <div>Dashboard</div>
      <ul>
      {connectors.map((connector) => (
        <li key={connector.id}>
          <button onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        </li>
      ))}
    </ul>
    <h4>{address || 'nil'}</h4>
    </Layout>
  )
}

export default Dashboard
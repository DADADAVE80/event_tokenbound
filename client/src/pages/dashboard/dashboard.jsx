import React, { useContext } from 'react'
import Layout from '../../Components/dashboard/layout'
import { KitContext } from '../../context/kit-context'

const Dashboard = () => {
  const {sogo} = useContext(KitContext)
  console.log(sogo)
  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  )
}

export default Dashboard
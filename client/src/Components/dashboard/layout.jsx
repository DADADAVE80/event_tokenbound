import React from 'react'
import Sidebar from './sidebar'
import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <div className="bg-deep-blue w-screen md:w-full flex overflow-x-hidden  min-h-screen">
      <Sidebar />
      <div className="md:ml-64 grow bg-base-white rounded-l-[80px] pl-20 py-8 pr-10">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default Layout
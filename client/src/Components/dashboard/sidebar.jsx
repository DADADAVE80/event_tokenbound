import React from 'react'
import { Link } from 'react-router-dom'
import { eventMainSidebarData } from '../dummy-data'
import SidebarItem from './sidebar-item'
import { IoLogOutSharp } from 'react-icons/io5'

const Sidebar = () => {
    return (
        <div className="hidden h-screen w-64 md:block fixed bg-deep-blue ">
            <div className='flex flex-col py-16 justify-between h-screen'>
                <div className='flex flex-col gap-10'>
                    <div className="my-2 mx-6 flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="/assets/hostit-logo-light.png" alt="logo" width={150} height={36} />
                        </Link>
                    </div>
                    <div className="">
                        {eventMainSidebarData.map((menu, index) => (
                            <SidebarItem key={index} menu={menu} />
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-8 mx-3'>
                    <hr className='h-[1px] text-primary w-56' />
                    <div className='flex gap-3'>
                        <img src='/assets/profile-picture.png' alt='profile-picture' width={71} height={63} />
                        <div className='flex flex-col gap-2 justify-center'>
                            <p className='text-base text-white font-normal'>0x0FY8999*******</p>
                            <p className='text-base text-white font-normal'>0xgabriel.eth</p>
                        </div>
                    </div>
                    <div>
                        <SidebarItem menu={{
                            url: "#", icon: <IoLogOutSharp className="w-6 h-6" />,
                            title: "Log Out"
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
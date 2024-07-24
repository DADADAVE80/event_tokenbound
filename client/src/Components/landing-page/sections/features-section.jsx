import React from 'react'
import FeaturesCard from '../features-card'

const FeaturesSection = () => {
     const featuresData = [
        {
            icon: "/assets/event-management.png",
            title: "Event Management",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi. "
        }, {
            icon: "/assets/real-time-analytics.png",
            title: "Real Time Analytics",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi. "
        }, {
            icon: "/assets/poap-integration.png",
            title: "POAP Integration",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi. "
        }, {
            icon: "/assets/security.png",
            title: "Security",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi. "
        }, {
            icon: "/assets/decentralized-identity.png",
            title: "Decentralized Identity",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi. "
        },
    ]

    const cards = featuresData.map(({ icon, title, description }, index) => {
        return (
            <FeaturesCard icon={icon} title={title} description={description} key={index} />
        )
    })
    return (
        <div className='bg-base-white flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center max-w-[1280px]'>
            <h1 className='text-deep-blue text-6xl font-bold pt-16 pb-20'>Features</h1>
            <div className='flex justify-center items-center flex-wrap gap-6'>
                {cards}
            </div>
            </div>
        </div>
    )
}

export default FeaturesSection
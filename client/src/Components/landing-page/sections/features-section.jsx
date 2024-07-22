import React from 'react'
import FeaturesCard from '../features-card'
import {featuresData} from "../../dummy-data"

const FeaturesSection = () => {

    const cards = featuresData.map(({ icon, title, description }, index) => {
        return (
            <FeaturesCard icon={icon} title={title} description={description} key={index} />
        )
    })
    return (
        <div className='bg-base-white flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center max-w-[1280px]'>
            <h1 className='text-black text-6xl font-bold pt-16 pb-20'>Our Features</h1>
            <div className='flex justify-center items-center flex-wrap gap-6'>
                {cards}
            </div>
            </div>
        </div>
    )
}

export default FeaturesSection
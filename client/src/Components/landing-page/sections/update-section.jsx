import React from 'react'
import { updateData } from '../../dummy-data'

const UpdateSection = () => {

    const content = updateData.map(({ caption }, index) => {
        return (
            <div className='flex gap-12 justify-center items-center' key={index}>
                <img src='/assets/scroling-star.png' />
                <h1 className='text-white font-semibold text-3xl 2xl:text-5xl'>{caption}</h1>
            </div>
        )
    })
    return (
        <div className='bg-deep-blue h-20 flex gap-8 justify-center items-center -skew-y-1 overflow-y-hidden'>
            {content}
        </div>
    )
}

export default UpdateSection
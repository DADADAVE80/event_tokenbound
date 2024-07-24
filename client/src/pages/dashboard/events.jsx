import React, { useContext } from 'react'
import Layout from '../../Components/dashboard/layout'
import { Button } from '../../Components/shared/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { KitContext } from '../../context/kit-context'
import { useState, useEffect } from 'react'
import { useContractRead } from '@starknet-react/core'
import EventCard from '../../Components/dashboard/event-card'

const Events = () => {
    const {address, account, contract, eventAbi, contractAddr} = useContext(KitContext)
    console.log(account)

    const { data, isError, isLoading, error } = useContractRead({
        functionName: "get_event_count",
        args: [],
        abi: eventAbi,
        address: contractAddr,
        watch: true,
    });


console.log(data.toString())
    return (
        <Layout>
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl text-deep-blue font-semibold'>
                        All Events
                    </h1>
                    <Link to={"/create-events"}>
                        <Button className="bg-deep-blue text-primary px-8 py-6 text-lg flex gap-2 hover:text-deep-blue">
                            <Plus className='text-lg' /> Create Event
                        </Button>
                    </Link>
                </div>
            </div>
            <div>Events_count:{data && data.toString()} </div>
            <EventCard />

        </Layout>
    )
}

export default Events
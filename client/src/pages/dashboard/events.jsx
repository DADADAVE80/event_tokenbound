import React, { useContext } from 'react'
import Layout from '../../Components/dashboard/layout'
import { KitContext } from '../../context/kit-context'
import { useState, useEffect } from 'react'
import { useContractRead } from '@starknet-react/core'

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
            <div>Events_count: {data.toString()} </div>

        </Layout>
    )
}

export default Events
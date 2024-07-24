import React, { useContext } from 'react'
import Layout from '../../Components/dashboard/layout'
import { useContractRead } from '@starknet-react/core';
import { useParams } from 'react-router-dom';
import { KitContext } from '../../context/kit-context';

const EventDetails = () => {

    const {id} = useParams()
    const {address, account, contract, eventAbi, contractAddr} = useContext(KitContext)
    
    const { data, isError, isLoading, error } = useContractRead({
        functionName: "get_event",
        args: [id],
        abi: eventAbi,
        address: contractAddr,
        watch: true,
      });

      console.log(data)

    return (
        <Layout>
            <div>EventDetails</div>
        </Layout>
    )
}

export default EventDetails
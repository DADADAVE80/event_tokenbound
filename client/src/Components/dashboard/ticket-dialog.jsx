import React from 'react'
import QRCode from "react-qr-code";
import { Button } from "../shared/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../shared/dialog"

import strkAbi from '../../Abis/strkAbi.json'
import { useContractRead } from '@starknet-react/core';

const TicketDialog = ({theme, startDate, endDate, location, id, deployAccount, tba, getAccount}) => {

    const { data, isError, isLoading, error} = useContractRead({
        functionName: "balance_of",
        args: [tba],
        abi: strkAbi,
        address: '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
        watch: true,
    });

    console.log(data)

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"} size="lg" className="w-full max-w-md  border border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-primary">
                        View ticket
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-base-white">
                    <div className="bg-white rounded-lg my-3 m-1 p-3 w-full max-w-md shadow-2xl">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold">{theme}</h2>
                                <p className="text-gray-500 ">{`${startDate} - ${endDate}`}</p>
                                <p className="text-gray-500 ">{location}</p>
                            </div>
                            <div className="w-full max-w-[200px]">
                                <QRCode
                                    size={200}
                                    bgColor="transparent"
                                    fgColor="black"
                                    value={`${theme} event ticket`}
                                />
                            </div>
                            <div className="text-center flex flex-col gap-3">
                                {/* {
                                    isCancelled ?
                                        <p>Status: <span className="text-red-900">Not verified</span></p> : <p>Status: <span className="text-green-900">verified</span></p> 
                                } */}
                                {<p>Status: <span className="text-red-900">Not verified</span></p>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>strk</h4>
                        {data && data.toString() != 0 ? <h4>{data.toString()}</h4> : ''}
                    </div>
                    <DialogFooter>
                        <Button  onClick={deployAccount} className="bg-deep-blue text-primary hover:text-deep-blue">Verify Ticket</Button>
                        <Button onClick={getAccount}>get Assets</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TicketDialog
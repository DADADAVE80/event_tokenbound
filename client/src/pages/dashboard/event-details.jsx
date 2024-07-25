import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../Components/dashboard/layout'
import { useContractRead } from '@starknet-react/core';
import { useParams } from 'react-router-dom';
import { KitContext } from '../../context/kit-context';
import { Button } from '../../Components/shared/button';
import { Card } from '../../Components/shared/card';
import { CalendarIcon, ClockIcon, HandCoins, MapPinIcon, Tags, Ticket, TicketCheck, TicketMinus, User } from 'lucide-react';
import { feltToString } from '../../helpers';
import { epochToDatetime } from 'datetime-epoch-conversion';
import { MdLiveTv } from "react-icons/md";
import { TokenboundClient } from 'starknet-tokenbound-sdk';


const EventDetails = () => {

    const [event, setEvent] = useState()
    const { id } = useParams()
    const { address, account, contract, eventAbi, contractAddr, eventContract, readEventContract } = useContext(KitContext)

    const { data, isError, isLoading, error } = useContractRead({
        functionName: "get_event",
        args: [id],
        abi: eventAbi,
        address: contractAddr,
        watch: true,
    });

    const { data: userTicket, isError: userTicketIsError, isLoading: userTicketIsLoading, error: userTicketError } = useContractRead({
        functionName: "user_event_ticket",
        args: [id, address],
        abi: eventAbi,
        address: contractAddr,
        watch: true,
    });

    console.log(data)
    console.log(Number(userTicket))

    const startDateResponse = epochToDatetime(String(data?.start_date))
    const endDateResponse = epochToDatetime(String(data?.end_date))

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            await eventContract.purchase_ticket(id)
            alert('succesfully added')

        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    // reschedule event
    const rescheduleEvent = async (e) => {
        e.preventDefault()

        try {

            // await eventContract.reschedule_event(id)
            alert('succesfully added')

        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    // cancel event
    const cancelEvent = async (e) => {
        e.preventDefault()

        try {

            await eventContract.cancel_event(id)
            alert('succesfully added')

        } catch (error) {
            alert(error.message)
            console.log(error)
        }
    }

    // tokenbound integration
    const options = {
        account: account,
        registryAddress: `0x4101d3fa033024654083dd982273a300cb019b8cb96dd829267a4daf59f7b7e`,
        implementationAddress: `0x45d67b8590561c9b54e14dd309c9f38c4e2c554dd59414021f9d079811621bd`,
        jsonRPC: ``
    }

    let tokenbound;

    if (account) {
        tokenbound = new TokenboundClient(options)
    }

    console.log(tokenbound)

    // get account status
    const getStatus = async () => {
        const status = await tokenbound.checkAccountDeployment({
            tokenContract: `0x${data?.event_ticket_addr.toString(16)}`,
            tokenId: userTicket,
            salt: "3000000000"
        })

        console.log(status)
    }


    const deployAccount = async () => {
        try {
            await tokenbound.createAccount({
                tokenContract: `0x${data?.event_ticket_addr.toString(16)}`,
                tokenId: userTicket,
                salt: "3000000000"
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStatus()
    }, [])

    return (
        <Layout>
            <h1 className='text-3xl text-deep-blue font-semibold'>
                Event Details
            </h1>
            {isLoading ? (
                <h4>Loading ...</h4>
            ) : (
                <Card className="shadow-2xl pb-6 my-4 rounded-xl">
                    <div className="flex flex-col mx-10 mt-10">
                        <section className="rounded-2xl relative w-full h-[200px] sm:h-[300px] lg:h-[300px] overflow-hidden">
                            <img
                                src="/assets/about-image-podcast.jpg"
                                className="absolute inset-0 w-full h-[300px] object-cover "
                            />
                            <div className="absolute inset-0 bg-black/50 z-10" />
                            <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-base-white">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{feltToString(data?.theme)}</h1>
                                <p className="mt-4 max-w-3xl text-lg sm:text-xl mb-6">
                                    Join us for a day of inspiring talks, networking, and exploring the latest trends in the industry.
                                </p>
                                <div className="flex items-center gap-2 sm:gap-2">
                                    <User className="w-6 h-4 text-muted-foreground font-bold text-white" />
                                    <div className='flex gap-3 items-start'>
                                        <div className="text-[12px] font-bold  text-white">Organizer </div>
                                        <div className="text-[12px]  text-white">0x{(data?.organizer).toString(16)}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="">
                            <div className="flex justify-evenly items-start">
                                <div className='flex flex-col gap-6 mt-4 w-[50%]'>
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <CalendarIcon className="w-6 h-6 text-muted-foreground text-[#777D7F] " />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Start date  </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{startDateResponse.dateTime}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <ClockIcon className="w-6 h-6 text-muted-foreground text-[#777D7F]" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">End date  </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{endDateResponse.dateTime}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <MapPinIcon className="w-6 h-6 text-muted-foreground text-[#777D7F]" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Location </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{feltToString(data?.event_type)}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <Ticket className="w-6 h-6 text-muted-foreground text-[#777D7F]" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Ticket Price </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{String(data?.ticket_price).slice(0, -18)} STRK</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <MdLiveTv className="w-6 h-6 text-muted-foreground text-[#777D7F]" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Event status </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{(data?.is_canceled) ? "Ongoing" : "Ended"}</div>
                                        </div>
                                    </div>

                                </div>
                                <div className='flex flex-col gap-4 mt-4 w-[50%]'>
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <Tags className="w-6 h-6 text-muted-foreground text-d eep-blue" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Total Tickets  </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{String(data?.total_tickets)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <TicketMinus className="w-6 h-6 text-muted-foreground text-deep-blu e" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Total Ticket Sold  </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{String(data?.tickets_sold)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <TicketCheck className="w-6 h-6 text-muted-foreground text-deep-blu e" />
                                        <div className='flex flex-col gap-1'>
                                            <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Total Ticket Available </div>
                                            <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{String(data?.total_tickets - data?.tickets_sold)}</div>
                                        </div>
                                    </div>
                                    {
                                        address === `0x${data?.organizer.toString(16)}` ?
                                        <>
                                            <div className="flex items-start gap-4 sm:gap-6">
                                                <HandCoins className="w-6 h-6 text-muted-foreground text-[#777D7F]" />
                                                <div className='flex flex-col gap-1'>
                                                    <div className="text-sm sm:text-base font-medium  text-[#777D7F]">Total Amount  </div>
                                                    <div className="text-muted-foreground text-sm text-slate-700 font-semibold">{String(data?.ticket_price * data?.tickets_sold).slice(0, -18)} STRK</div>
                                                </div>
                                            </div> 
                                              <div className="flex gap-8">
                                              <Button onClick={""} variant={"outline"} size="lg" className="w-full max-w-md text-primary border border-deep-blue text-deep-blue hover:bg-primary hover:text-deep-blue">
                                                  Reschedule Event
                                              </Button>

                                              <Button onClick={""} size="lg" className="w-full max-w-md text-primary bg-deep-blue hover:bg-primary hover:text-deep-blue">
                                                  Cancel Event
                                              </Button>
                                          </div></>:
                                            <div className="flex">
                                                {Number(userTicket) == 0  ? 
                                                    <Button onClick={handleSubmit} size="lg" className="w-full max-w-md text-primary bg-deep-blue hover:bg-primary hover:text-deep-blue">
                                                        Get ticket
                                                    </Button>
                                                    :
                                                    <Button onClick={deployAccount} size="lg" className="w-full max-w-md text-primary bg-deep-blue hover:bg-primary hover:text-deep-blue">
                                                        verify your ticket
                                                    </Button>
                                                }
                                                
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href={`https://sepolia.voyager.online/contract/0x${data?.event_ticket_addr.toString(16)}`} target="_blank" rel="noopener noreferrer" className='underline text-blue-700 text-center w-full flex items-center justify-end pr-10 my-2'> View tickets NFT address</a>
                </Card>
            )}

        </Layout>
    )
}

export default EventDetails
import React, { useContext, useState } from 'react'
import Layout from '../../Components/dashboard/layout'
import { useContractRead } from '@starknet-react/core';
import { useParams } from 'react-router-dom';
import { KitContext } from '../../context/kit-context';
import { Button } from '../../Components/shared/button';
import { Card } from '../../Components/shared/card';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import { feltToString } from '../../helpers';

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

    console.log(data)
    // const {end_date, event_ticket_addr, event_type, is_canceled, organizer,  start_date, theme, ticket_price, tickets_sold, total_tickets} = data

    // const parseData = (data) => {
    //     if (!data) return undefined;

    //     return data.map((item) => ({
    //         id: item.id,
    //         theme: item.theme,
    //         organizer: item.organizer,
    //         type: item.type,
    //         start_time: item.start_time,
    //         end_time: item.end_time,
    //       }));
    // }

    // const trial = parseData(data)

    // const getEventDetails = async () => {
    //     try {

    //         const eventDetails = await readEventContract.get_event(id);

    //         setEvent({
    //             theme: eventDetails.theme.toString()
    //         })

    //         console.log(eventDetails, event)

    //     } catch (error) {
    //         alert(error.message)
    //     }
    // }

    // getEventDetails()

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

    return (
        <Layout>
            <h1 className='text-3xl text-deep-blue font-semibold'>
                Event Details
            </h1>
            {isLoading ? (
                <h4>Loading ...</h4>
            ) : (
                <Card className="shadow-2xl mt-4 rounded-xl">
                <div className="flex flex-col mx-10 mt-10">
                    <section className="rounded-2xl relative w-full h-[200px] sm:h-[300px] lg:h-[300px] overflow-hidden">
                        <img
                            src="/assets/about-image-podcast.jpg"
                            className="absolute inset-0 w-full h-[300px] object-cover "
                        />
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-base-white">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">{feltToString(data?.theme)}</h1>
                            <p className="mt-4 max-w-3xl text-lg sm:text-xl">
                                Join us for a day of inspiring talks, networking, and exploring the latest trends in the industry.
                            </p>
                        </div>
                    </section>
                    <div className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-evenly items-start">
                            <div className="grid gap-4 sm:gap-6 lg:gap-8">
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <CalendarIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">State date</div>
                                        <div className="text-muted-foreground  text-deep-blue">{String(data?.start_date)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <ClockIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">end date</div>
                                        <div className="text-muted-foreground  text-deep-blue">{String(data?.end_date)}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">Location</div>
                                        <div className="text-muted-foreground  text-deep-blue">Acme Conference Center, 123 Main St, Anytown USA</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 sm:gap-6">
                                    <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">Ticket Price</div>
                                        <div className="text-muted-foreground  text-deep-blue">$STRK-{String(data?.ticket_price)}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 sm:gap-6">
                                    <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">Event status</div>
                                        <div className="text-muted-foreground  text-deep-blue">{String(data?.is_canceled)}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="prose max-w-[800px]">
                                    <h2 className='font-bold text-xl text-deep-blue'>About the Event</h2>
                                    <p className=' text-deep-blue'>
                                        The Acme Inc Annual Conference is a must-attend event for anyone interested in the latest trends and
                                        innovations in the industry. Join us for a day of inspiring talks, interactive workshops, and networking
                                        opportunities with industry leaders and peers.
                                    </p>

                                    <p className=' text-deep-blue'>
                                        Whether you're a seasoned industry veteran or just starting out, this event is the perfect opportunity to
                                        learn, grow, and connect. Don't miss your chance to be a part of this exciting event!
                                    </p>
                                </div>
                                <div className='flex flex-col p-2 border border-slate-300'>
                                    <div className='flex flex-col'>
                                        <h4>event_ticket_contract_address</h4>
                                        <h4>{data?.event_ticket_addr.toString(16)}</h4>
                                    </div>
                                    <div className='grid grid-cols'>
                                        <div className='flex flex-col'>
                                            <h4>Total Tickets</h4>
                                            <h4>{String(data?.total_tickets)}</h4>
                                        </div>

                                        <div className='flex flex-col'>
                                            <h4>Tickets sold</h4>
                                            <h4>{String(data?.tickets_sold)}</h4>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <Button onClick={handleSubmit} size="lg" className="w-full max-w-md text-primary bg-deep-blue hover:bg-primary hover:text-deep-blue mt-6">
                                        Get ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            )}
    
        </Layout>
    )
}

export default EventDetails
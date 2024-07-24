import React, { useContext } from 'react'
import Layout from '../../Components/dashboard/layout'
import { useContractRead } from '@starknet-react/core';
import { useParams } from 'react-router-dom';
import { KitContext } from '../../context/kit-context';
import { Button } from '../../Components/shared/button';
import { Card } from '../../Components/shared/card';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';

const EventDetails = () => {

    const { id } = useParams()
    const { address, account, contract, eventAbi, contractAddr } = useContext(KitContext)

    const { data, isError, isLoading, error } = useContractRead({
        functionName: "get_event",
        args: [id],
        abi: eventAbi,
        address: contractAddr,
        watch: true,
    });

    console.log(data)
    // const {end_date, event_ticket_addr, event_type, is_canceled, organizer,  start_date, theme, ticket_price, tickets_sold, total_tickets} = data

    return (
        <Layout>
            <h1 className='text-3xl text-deep-blue font-semibold'>
                Event Details
            </h1>
            <Card className="shadow-2xl mt-4 rounded-xl">
                <div className="flex flex-col mx-10 mt-10">
                    <section className="rounded-2xl relative w-full h-[200px] sm:h-[300px] lg:h-[300px] overflow-hidden">
                        <img
                            src="/assets/about-image-podcast.jpg"
                            className="absolute inset-0 w-full h-[300px] object-cover "
                        />
                        <div className="absolute inset-0 bg-black/50 z-10" />
                        <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center text-base-white">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Startup Founder Meetup</h1>
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
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">Date</div>
                                        <div className="text-muted-foreground  text-deep-blue">June 15, 2024</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <ClockIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">Time</div>
                                        <div className="text-muted-foreground  text-deep-blue">9:00 AM - 5:00 PM</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:gap-6">
                                    <MapPinIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm sm:text-base font-medium  text-deep-blue">Location</div>
                                        <div className="text-muted-foreground  text-deep-blue">Acme Conference Center, 123 Main St, Anytown USA</div>
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
                                <div className="flex justify-center">
                                    <Button size="lg" className="w-full max-w-md text-primary bg-deep-blue hover:bg-primary hover:text-deep-blue mt-6">
                                        Get ticket
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

        </Layout>
    )
}

export default EventDetails
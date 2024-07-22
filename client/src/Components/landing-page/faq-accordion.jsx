import { FaqAccordion } from '../dummy-data'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../shared/accordion'
import React from 'react'

const HiwAccordion = () => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                FaqAccordion.map(({ title, description }, index) => {
                    return (
                        <AccordionItem className="rounded-md bg-white" value={`item-${index+1}`} key={index}>
                            <AccordionTrigger>
                                <div className='bg-deep-blue p-4 rounded-full flex gap-4 justify-center items-center'>
                                    <p className='text-xl font-semibold'>{title}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-[#777D7F]">
                                {description}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }
            <AccordionItem className="rounded-md bg-white" value="item-1">
                <AccordionTrigger>
                    <div className='bg-deep-blue p-4 rounded-full flex gap-4 justify-center items-center'>
                        <img src='/assets/decentralized-identity.png' className='w-8 h-8' />
                        <p className='text-xl font-semibold'>Create and verify your identity</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-[#777D7F]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default HiwAccordion
import { FaqAccordionData } from '../dummy-data'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../shared/accordion'
import React from 'react'

const FaqAccordion = () => {
    return (
        <Accordion type="single" collapsible className="w-[500px] flex flex-col gap-6">
            {
                FaqAccordionData.map(({ title, description }, index) => {
                    return (
                        <AccordionItem className="rounded-md bg-white w-[500px] border-y-2 border-r-2" value={`item-${index +1 }`} key={index}>
                            <AccordionTrigger className=" px-6  border-base-white h-16">
                                    <p className='text-xl font-semibold text-deep-blue'>{title}</p>
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-[#777D7F] px-6">
                                {description}
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}

export default FaqAccordion
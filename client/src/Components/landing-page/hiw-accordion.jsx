import { HiwAccordionData } from '../dummy-data'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../shared/accordion'
import React from 'react'

const HiwAccordion = () => {
    return (
        <Accordion type="single" collapsible className="w-[500px] p-8 gap-6">
            {
                HiwAccordionData.map(({ icon, title, description }, index) => {
                    return (
                        <AccordionItem className="rounded-md bg-white mb-6 w-[500px]" value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger icon={false}>
                                <div className='p-4 rounded-full flex gap-4 justify-center items-center'>
                                    <div className='bg-deep-blue p-4 rounded-full'>
                                        <img src={icon} className='w-8 h-8' />
                                    </div>
                                    <p className='text-xl font-semibold text-deep-blue'>{title}</p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-[#777D7F] px-6">
                                {description}
                            </AccordionContent>
                        </AccordionItem>)
                })}
        </Accordion>
    )
}

export default HiwAccordion
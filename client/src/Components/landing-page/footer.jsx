import React from 'react'
import { Button } from '../shared/button'
import { BsSendFill } from "react-icons/bs";

const Footer = () => {
  return (
    <div>
      <div>
        <div>
          <img src='/assets/hostit-logo.png' height={30} width={150} />
          <p className='text-[#777D7F] pt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit sapien eu efficitur tristique. Vivamus volutpat ornare ornare. Donec sed sollicitudin turpis. Donec iaculis aliquet mi.</p>
          <div className='p-3 border border-deep-blue '>
            <input type="text" placeholder='Enter email to subsribe to our newsletter' />
            <Button className="text-primary bg-deep-blue">
              <BsSendFill />
            </Button>
          </div>
        </div>
        <div className='flex gap-4'>

        </div>
      </div>
      <hr />
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Footer
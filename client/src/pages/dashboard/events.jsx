import React from 'react'
import Layout from '../../Components/dashboard/layout'
import { Button } from '../../Components/shared/button'
import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

const Events = () => {
    return (
        <Layout>
            <div>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl text-deep-blue font-semibold'>
                        All Events
                    </h1>
                    <Link to={"/create-events"}>
                        <Button className="bg-deep-blue text-primary px-8 py-6 text-lg flex gap-2 hover:text-deep-blue">
                            <Plus className='text-lg' /> Create Event
                        </Button>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export default Events
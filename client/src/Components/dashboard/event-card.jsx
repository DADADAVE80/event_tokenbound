import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../shared/card"
import { Button } from "../shared/button"
import { Badge } from '../shared/badge'

const EventCard = () => {
  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="bg-white p-4 flex items-center justify-between">
        <div className="grid gap-1">
          <CardTitle className="text-deep-blue">Startup Founders Meetup</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Host: 0x0000</span>
          </div>
        </div>
        <Badge variant="secondary" className="text-deep-blue">Upcoming</Badge>
      </CardHeader>
      <CardContent className="p-4 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-deep-blue">Event Type</div>
          <div className=''>Virtial</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-deep-blue">Date</div>
          <div>
            <time dateTime="2023-06-15">June 15, 2023</time> - <time dateTime="2023-06-16">June 16, 2023</time>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-deep-blue">Ticket Price</div>
          <div>$25</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-deep-blue">Total Tickets</div>
          <div>200</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-deep-blue">Tickets Sold</div>
          <div>150</div>
        </div>
      </CardContent>
      <CardFooter className="bg-base-white p-4 flex items-center justify-between">
        <Button variant="outline" size="sm" className="text-deep-blue border-deep-blue">
          View Details
        </Button>
        <Button variant="primary" className="bg-deep-blue text-primary hover:text-deep-blue" size="sm">
          Buy Tickets
        </Button>
      </CardFooter>
    </Card>
    )
}

export default EventCard
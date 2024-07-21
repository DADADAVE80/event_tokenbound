# CROWDPASS

### OVERVIEW
`Crowdpass` is a decentralized Event management platform, `crowdpass` aids event organizers to create and manage event ticketing, `crowdpass` also aids event attendees to purchase, sale and recliam tickets refund in the case of event cancellation.

### PROBLEM
The event industry faces several significant inefficiencies that impact both organizers and attendees.

#### For Organizers:

1. Ticket Management Issues: 
      - ``Duplication of Tickets``: Malicious actors can duplicate tickets, making it difficult to ensure that each ticket is unique and valid.
      - ``Unaccountable Funds``: There is often a lack of transparency and accountability in ticket sales, leading to potential capital and revenue loss. 

#### For Event Attendees:

1. Fake Tickets: Attendees risk purchasing counterfeit tickets, which can prevent them from accessing the event.
2. Refund Insecurities: If an event is canceled, attendees may face difficulties in getting refunds, creating financial insecurity.

   In summary, event organizers struggle with managing ticket sales, preventing fraud, and ensuring proper revenue tracking, while attendees worry about the authenticity of tickets and the security of their funds in case of event cancellations.

### SOLUTION
`Crowdpass` aims to fix all the above inefficiencies through creating tickets in form of nft's and minting these nft's to attendees that purchase the ticket for the said event, also with our recliam functionality event attendees can be able to cliam refunds for tickets on event cancellation.

> [!IMPORTANT]
> - Our smartcontract is an escrow contract, that handles all tickets (nft's) and funds from ticket purchase.
> - Event organizers can monitor but can cliam funds from ticket sales until after event end_date and after 50% of attendees give reviews stating event was held.
> - All tickets are token_bound accounts this is to aid for easy sale from one party to another and maximum security, incase of event cancelation the funds for the ticket is been refunded back to the ticket (tba) and also in events with digital badges (POAP), this badges will be sent to the ticket (tba). This will aid the ticket holder have all priviledges associated with holding the ticket.

### FUNCTIONALITIES
1. `create_event`:
2. `cancel_event`:
3. `reschedule_event`:
4. `create_ticket`:
5. `purchase_ticket`:
6. `resale_ticket`:
7. `cliam_ticket_refund`:

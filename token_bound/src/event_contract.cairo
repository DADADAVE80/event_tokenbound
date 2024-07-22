use starknet::{ContractAddress};

#[starknet::interface]
pub trait IEvent<TContractState> {

    fn create_event (ref self: TContractState, _theme: felt252, _organizer: ContractAddress, _event_type: felt252, _start_date: u64, _end_date: u64, _ticket_price: u256);
    fn reschedule_event (ref self: TContractState, _event_id: u32, _start_date: u64, _end_date: u64);
    fn cancel_event (ref self: TContractState, _event_id: u32);
    // fn create_ticket (ref self : TContractState, event_id: u32) -> bool;
    fn purchase_ticket (ref self: TContractState, _event_id: u32);
    // fn resale_ticket (ref self : TContractState, event_id: u32) -> bool;
    fn cliam_ticket_refund (ref self : TContractState, _event_id: u32);
    fn get_event (self: @TContractState, _event_id: u32) -> Events;
    fn get_event_count (self: @TContractState) -> u32;
}

#[derive(Drop, Serde, starknet::Store)]
struct Events {
    id: u32,
    theme: felt252,
    organizer: ContractAddress,
    event_type: felt252,
    total_tickets: u32,
    tickets_sold: u32,
    ticket_price: u256,
    start_date: u64,
    end_date: u64,
    is_canceled: bool,
    event_ticket_addr: ContractAddress
}

#[starknet::contract]
pub mod event_contract {

    use super::{Events, IEvent};
    use starknet::{get_caller_address, ContractAddress, get_block_timestamp, get_contract_address};
    use core::num::traits::zero::Zero;

    use token_bound::erc20_interface::{ IERC20Dispatcher, IERC20DispatcherTrait};
    use token_bound::ticket_factory::{ ITicketFactoryDispatcher, ITicketFactoryDispatcherTrait};

    // events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        EventCreated: EventCreated,
        EventRescheduled: EventRescheduled,
        EventCanceled: EventCanceled,
        TicketPurchased: TicketPurchased
    }

    #[derive(Drop, starknet::Event)]
    struct EventCreated {
        id: u32,
        organizer: ContractAddress
    }

    #[derive(Drop, starknet::Event)]
    struct EventRescheduled {
        id: u32,
        start_date: u64,
        end_date: u64
    }

    #[derive(Drop, starknet::Event)]
    struct EventCanceled {
        id: u32,
        is_canceled: bool
    }

    #[derive(Drop, starknet::Event)]
    struct TicketPurchased {
        event_id: u32,
        buyer: ContractAddress,
        amount: u256
    }

    // storage
    #[storage]
    struct Storage {
       event_count: u32,
       events: LegacyMap::<u32, Events>,
       token_address: ContractAddress,
       ticket_factory_address: ContractAddress
    }

    #[constructor]
    fn constructor(
        ref self: ContractState,
        _token_address: ContractAddress,
        _ticket_factory_address: ContractAddress
    ) {
        self.token_address.write(_token_address);
        self.ticket_factory_address.write(_ticket_factory_address);
    }

    // implementions and functions
    #[abi(embed_v0)]
    impl eventImpl of IEvent<ContractState>{
        
        fn create_event (ref self: ContractState, _theme: felt252, _organizer: ContractAddress, _event_type: felt252, _start_date: u64, _end_date: u64, _ticket_price: u256) {

            let caller = get_caller_address();
            let _event_count = self.event_count.read() + 1;
            let address_this = get_contract_address();
            let impl_hash: felt252 = 0x6832d60ac7a00d34feecbec2f5d45c6c851d58989abbec7d9757e1b42b50c37;

            // assert not zero ContractAddress
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            // deploy tickets contract here
            let ticket_factory = ITicketFactoryDispatcher {
                contract_address: self.ticket_factory_address.read()
            };

            let _event_ticket_addr = ticket_factory.deploy_ticket(impl_hash, caller, address_this, 0);

            // new event struct instance
            let event_instance = Events {
                id: _event_count,
                theme: _theme,
                organizer: caller,
                event_type: _event_type,
                total_tickets: 0,
                tickets_sold: 0,
                ticket_price: _ticket_price,
                start_date: _start_date,
                end_date: _end_date,
                is_canceled: false,
                event_ticket_addr: _event_ticket_addr
            };

            // map event_id to new_event
            self.events.write(_event_count, event_instance);

            // update event count
            self.event_count.write(_event_count);

            // emit event for event creation
            self.emit(EventCreated {id: _event_count, organizer: caller});

        }


        fn reschedule_event (ref self: ContractState, _event_id: u32, _start_date: u64, _end_date: u64) {
            
            let caller = get_caller_address();
            let _event_count = self.event_count.read();
            let _organizer = self.events.read(_event_id).organizer;
            let event_instance = self.events.read(_event_id);

            assert(_event_id <= _event_count, token_bound::errors::Errors::NOT_CREATED);

            // assert not zeroAddr caller
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            // assert caller is event organizer
            assert(caller == _organizer,  token_bound::errors::Errors::NOT_ORGANIZER);

            // reschedule event here
            self.events.write(_event_id, Events{
                id: event_instance.id,
                theme: event_instance.theme,
                organizer: event_instance.organizer,
                event_type: event_instance.event_type,
                total_tickets: event_instance.total_tickets,
                tickets_sold: event_instance.tickets_sold,
                ticket_price: event_instance.ticket_price,
                start_date: _start_date,
                end_date: _end_date,
                is_canceled: false,
                event_ticket_addr: event_instance.event_ticket_addr
            });


            self.emit(EventRescheduled {id: _event_id, start_date: _start_date, end_date: _end_date});
        }

        fn cancel_event (ref self: ContractState, _event_id: u32) {
            let caller = get_caller_address();
            let _event_count = self.event_count.read();
            let _organizer = self.events.read(_event_id).organizer;
            let event_instance = self.events.read(_event_id);

            assert(_event_id <= _event_count, token_bound::errors::Errors::NOT_CREATED);

            // assert not zeroAddr caller
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            // assert caller is event organizer
            assert(caller == _organizer, token_bound::errors::Errors::NOT_ORGANIZER);

            // assert event has not ended
            assert(event_instance.end_date > get_block_timestamp(), token_bound::errors::Errors::EVENT_ENDED);

            // cancel event here
            self.events.write(_event_id, Events{
                id: event_instance.id,
                theme: event_instance.theme,
                organizer: event_instance.organizer,
                event_type: event_instance.event_type,
                total_tickets: event_instance.total_tickets,
                tickets_sold: event_instance.tickets_sold,
                ticket_price: event_instance.ticket_price,
                start_date: event_instance.start_date,
                end_date: event_instance.end_date,
                is_canceled: true,
                event_ticket_addr: event_instance.event_ticket_addr
            });

            self.emit(EventCanceled {id: _event_id, is_canceled: event_instance.is_canceled})
        }


        fn purchase_ticket (ref self: ContractState, _event_id: u32) {

            let caller = get_caller_address();
            let _event_count = self.event_count.read();
            let address_this = get_contract_address();

            let mut event_instance = self.events.read(_event_id);

            let strk_erc20_contract = IERC20Dispatcher {
                contract_address: self.token_address.read()
            };

            // assert caler is nit addr 0
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            // assert is_valid event
            assert(_event_id <= _event_count, token_bound::errors::Errors::NOT_CREATED);

            // verify if token caller has enough strk for the ticket_price
            assert(strk_erc20_contract.balance_of(caller) >= event_instance.ticket_price, token_bound::errors::Errors::INSUFFICIENT_AMOUNT);

            // assert if caller have given allowance to transfer strk
            assert(strk_erc20_contract.allowance(caller, address_this) >= event_instance.ticket_price, token_bound::errors::Errors::LOW_TOKEN_ALLOWANCE);

            // transfer strk from callers address to  smart contract
            strk_erc20_contract.transfer_from(caller, address_this, event_instance.ticket_price);

            // mint the nft ticket to the user

            // increase ticket_sold count from event instance
            self.events.write(_event_id, Events {
                id: event_instance.id,
                theme: event_instance.theme,
                organizer: event_instance.organizer,
                event_type: event_instance.event_type,
                total_tickets: event_instance.total_tickets,
                tickets_sold: event_instance.tickets_sold + 1,
                ticket_price: event_instance.ticket_price,
                start_date: event_instance.start_date,
                end_date: event_instance.end_date,
                is_canceled: event_instance.is_canceled,
                event_ticket_addr: event_instance.event_ticket_addr
            });

            // emit event for ticket purchase
            self.emit(TicketPurchased{event_id: _event_id, buyer: caller,  amount: event_instance.ticket_price});

        }

        fn cliam_ticket_refund (ref self: ContractState, _event_id: u32) {
            
            let caller = get_caller_address();
            let _event_count = self.event_count.read();
            // let address_this = get_contract_address();

            let event_instance = self.events.read(_event_id);

            // let strk_erc20_contract = IERC20Dispatcher {
            //     contract_address: self.token_address.read()
            // };

            // assert caler is nit addr 0
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            // assert is_valid event
            assert(_event_id <= _event_count, token_bound::errors::Errors::NOT_CREATED);

            // assert if event is is_canceled
            assert(event_instance.is_canceled == true, token_bound::errors::Errors::EVENT_NOT_CANCELED);

            // confirm if caller is a ticket holder

            // confirm if user has been refunded

            // 

        }

        // view functions
        fn get_event_count (self: @ContractState) -> u32 {
            self.event_count.read()
        }

        fn get_event (self: @ContractState, _event_id: u32) -> Events {
            self.events.read(_event_id)
        }

    }
}
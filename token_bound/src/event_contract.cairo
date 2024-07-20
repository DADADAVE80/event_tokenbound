// SPDX-License-Identifier: MIT
use starknet::{ContractAddress};

#[starknet::interface]
pub trait IEvent<TContractState> {
    fn create_event (ref self: TContractState, _theme: felt252, _organizer: ContractAddress, _event_type: felt252, _start_date: u256, _end_date: u256, _ticket_price: u256);
    fn reschedule_event (ref self: TContractState, _event_id: u32, _start_date: u256, _end_date: u256);
    fn cancel_event (ref self : TContractState, _event_id: u32);
    // fn create_ticket (ref self : TContractState, event_id: u32) -> bool;
    // fn purchase_ticket (ref self : TContractState, event_id: u32) -> bool;
    // fn resale_ticket (ref self : TContractState, event_id: u32) -> bool;
    // fn recliam_ticket_refund (ref self : TContractState) -> bool;
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
    start_date: u256,
    end_date: u256,
    is_canceled: bool,
}

#[starknet::contract]
pub mod event_contract {
    use super::{Events, IEvent};
    use starknet::{get_caller_address, ContractAddress};
    use core::num::traits::zero::Zero;

    // events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        EventCreated: EventCreated,
        EventRescheduled: EventRescheduled,
        EventCanceled: EventCanceled
    }

    #[derive(Drop, starknet::Event)]
    struct EventCreated {
        id: u32,
        organizer: ContractAddress
    }

    #[derive(Drop, starknet::Event)]
    struct EventRescheduled {
        id: u32,
        start_date: u256,
        end_date: u256
    }

    #[derive(Drop, starknet::Event)]
    struct EventCanceled {
        id: u32,
        is_canceled: bool
    }

    // storage
    #[storage]
    struct Storage {
       event_count: u32,
       events: LegacyMap::<u32, Events>,
    }

    // implementions and functions
    #[abi(embed_v0)]
    impl eventImpl of IEvent<ContractState>{
        fn create_event (ref self: ContractState, _theme: felt252, _organizer: ContractAddress, _event_type: felt252, _start_date: u256, _end_date: u256, _ticket_price: u256) {
            let caller = get_caller_address();
            let _event_count = self.event_count.read() + 1;

            // assert not zero ContractAddress
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            //TODO: deploy tickets contract here

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
                is_canceled: false
            };

            // map event_id to new_event
            self.events.write(_event_count, event_instance);

            // update event count
            self.event_count.write(_event_count);

            // emit event for event creation
            self.emit(EventCreated {id: _event_count, organizer: caller});
        }

        fn reschedule_event (ref self: ContractState, _event_id: u32, _start_date: u256, _end_date: u256) {
            
            let caller = get_caller_address();
            let _event_count = self.event_count.read();

            assert(_event_id <= _event_count, token_bound::errors::Errors::NOT_CREATED);

            // assert not zeroAddr caller
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            let _organizer = self.events.read(_event_id).organizer;

            // assert caller is event organizer
            assert(caller == _organizer,  token_bound::errors::Errors::NOT_ORGANIZER);

            let mut event_instance = self.events.read(_event_id);

            // reschedule event here
            event_instance.start_date = _start_date;
            event_instance.end_date = _end_date;

            self.emit(EventRescheduled {id: _event_id, start_date: _start_date, end_date: _end_date});
        }

        fn cancel_event (ref self: ContractState, _event_id: u32) {
            let caller = get_caller_address();
            let _event_count = self.event_count.read();

            assert(_event_id <= _event_count, token_bound::errors::Errors::NOT_CREATED);

            // assert not zeroAddr caller
            assert(caller.is_non_zero(), token_bound::errors::Errors::ZERO_ADDRESS_CALLER);

            let _organizer = self.events.read(_event_id).organizer;

            // assert caller is event organizer
            assert(caller == _organizer, token_bound::errors::Errors::NOT_ORGANIZER);

            let mut event_instance = self.events.read(_event_id);

            // assert event has not ended
            // assert(event_instance.end_date > 0, token_bound::errors::Errors::EVENT_ENDED)

            // reschedule event here
            
            event_instance.is_canceled = true;

            self.emit(EventCanceled {id: _event_id, is_canceled: event_instance.is_canceled})
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
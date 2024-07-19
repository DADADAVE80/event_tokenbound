use starknet::{ContractAddress};

#[starknet::interface]
pub trait IEventTrait<TContractState> {

    fn create_event (ref self: TContractState) -> bool;
    fn reschedule_event (ref self: TContractState, event_id: u32) -> bool;
    fn cancel_event (ref self : TContractState, event_id: u32) -> bool;
    fn create_ticket (ref self : TContractState, event_id: u32) -> bool;
    fn purchase_ticket (ref self : TContractState, event_id: u32) -> bool;
    fn resale_ticket (ref self : TContractState, event_id: u32) -> bool;
    fn recliam_ticket_refund (ref self : TContractState) -> bool;

}

#[derive(Copy, Drop, Serde, starknet::Store)]
struct Event {
    id: u32,
    theme: felt252,
    organizer: ContractAddress,
    event_type: felt252,
    total_tickets: u32,
    tickets_sold: u32,
    ticket_price: u256,
    start_date: u256,
    end_date: u256,
}


#[starknet::contract]
pub mod event_contract {

    #[storage]
    struct Storage {
       
    }

}
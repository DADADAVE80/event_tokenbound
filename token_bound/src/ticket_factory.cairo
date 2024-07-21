// SPDX-License-Identifier: MIT

#[starknet::interface]
pub trait ITicketFactory<TContractState> {
    fn create_ticket(self: @TContractState, ticket_id: u256, ticket_price: u256);
}

#[starknet::contract]
mod TicketFactory {
    use token_bound::ticket_nft::TicketNFT;

    
}

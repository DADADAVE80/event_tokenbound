use starknet::ContractAddress;

use snforge_std::{declare, ContractClassTrait};
use token_bound::TicketNFT;
use token_bound::ITicketFactory;
use token_bound::ITicketFactoryTrait;
use token_bound::ITicketFactoryDispatcher;

#[test]
fn call_and_invoke() {
    let ticket_nft_contract = declare("TicketNFT");
    let ticket_factory_contract = declare("TicketFactory");
    let (ticket_factory_contract_address, _) = ticket_factory_contract
        .deploy(@ArrayTrait::new())
        .unwrap();

    let ticket_factory_dispatcher = ITicketFactoryDispatcher {
        contract_address: ticket_factory_contract_address
    };
}

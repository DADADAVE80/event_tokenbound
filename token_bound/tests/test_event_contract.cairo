use starknet::ContractAddress;
use snforge_std::{declare, ContractClassTrait};

use token_bound::ticket_nft::TicketNFT;
use token_bound::ticket_factory::{TicketFactory, ITicketFactory};
use token_bound::event_contract::EventContract;
use token_bound::event_contract::IEventContract::{IEventContractDispatcher, IEventContractDispatcherTrait};

const TOKEN_ADDRESS: felt252 = 'TOKEN_ADDRESS';
const TICKET_FACTORY_ADDRESS: felt252 = 'TICKET_FACTORY_ADDRESS';
const USER: felt252 = 'USER';

// Deploys a contract and returns its address.
pub fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();
    contract_address
}

// *************************************************************************
//                              SETUP 
// *************************************************************************
fn __setup__() -> (ContractAddress, felt252) {
    // Declare ticket NFT
    let ticket_nft_class_hash = declare("TicketNFT").unwrap();

    // Deploy ticket NFT factory
    let ticket_factory_contract_address = deploy_contract("TicketFactory");

    // Deploy event contract
    let event_contract = declare("EventContract").unwrap();
    let mut event_contract_constructor_calldata = array![];
    let (event_contract_address, _) = event_contract
        .deploy(@event_contract_constructor_calldata)
        .unwrap();

    return (event_contract_address, ticket_nft_class_hash.class_hash.into());
}

#[test]
fn test_create_event() {
    let (event_contract_address, ticket_nft_class_hash) = __setup__();

    let event_contract_dispatcher = IEventContractDispatcher {contract_address: event_contract_address};

    // First event
    start_cheat_caller_address(event_contract_address, 123.try_into().unwrap());

    event_contract_dispatcher.create_event(
        "Event 1".try_into().unwrap(),
        USER.try_into().unwrap(),
        "Virtual".try_into().unwrap(),
        100.try_into().unwrap(),
        2000.try_into().unwrap(),
        1.try_into().unwrap(),
    );

    assert();
}

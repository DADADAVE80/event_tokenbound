// SPDX-License-Identifier: MIT
pub use starknet::{ContractAddress, class_hash::ClassHash, syscalls::deploy_syscall, SyscallResultTrait};

#[starknet::interface]
pub trait ITicketFactory<TContractState> {
    fn deploy_ticket(ref self: TContractState, implementation_hash: felt252, default_admin: ContractAddress, pauser: ContractAddress, minter: ContractAddress, upgrader: ContractAddress, salt: felt252) -> ContractAddress;
}

#[starknet::contract]
pub mod TicketFactory {
    use super::ITicketFactory;
    use starknet::{ContractAddress, class_hash::ClassHash, syscalls::deploy_syscall, SyscallResultTrait};

    // storage
    #[storage]
    struct Storage {
        ticket_count: u32,
        tickets: LegacyMap::<u32, ContractAddress>,
    }
    
    #[abi(embed_v0)]
    impl ticket_factory of ITicketFactory<ContractState> {
        
        fn deploy_ticket(ref self: ContractState, implementation_hash: felt252, default_admin: ContractAddress, pauser: ContractAddress, minter: ContractAddress, upgrader: ContractAddress, salt: felt252) -> ContractAddress {

            let  _ticket_count = self.ticket_count.read() + 1;
            
            // formatting constructor arguments
            let mut constructor_calldata: Array<felt252> = array![
                default_admin.into(), pauser.into(), minter.into(), upgrader.into(),
            ];

            // deploying the contract
            let class_hash: ClassHash = implementation_hash.try_into().unwrap();
            let result = deploy_syscall(class_hash, salt, constructor_calldata.span(), true);
            let (ticket_address, _) = result.unwrap_syscall();

            self.tickets.write(_ticket_count, ticket_address);

            self.ticket_count.write(_ticket_count);

            ticket_address
        } 
    }
}

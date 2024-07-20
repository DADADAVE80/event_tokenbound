pub mod Errors {
    pub const ZERO_AMOUNT: felt252 = 'amount cannot be zero';
    pub const ZERO_ADDRESS_CALLER: felt252 = 'Caller cannot be zero addr';
    pub const ZERO_ADDRESS_OWNER: felt252 = 'Owner cannot be zero addr';
    pub const NOT_ORGANIZER: felt252 = 'Caller not organizer';
    pub const NOT_CREATED: felt252 = 'event not yet registered';
    pub const EVENT_ENDED: felt252 = 'event has ended';
}
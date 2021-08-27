// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract Contract {
    enum Status {Defaulted, Paid, Pending}
    Status status;
    string businessUEN;
    uint amount;
    address owner;
    
    constructor(string memory uen, uint amt) {
        owner = msg.sender;
        status = Status.Pending;
        amount = amt;
        businessUEN = uen;
    }
    
    function getStatus() public view returns(Status) {
        return status;
    }
    
    function setPaid() public {
        if (msg.sender == owner) {
             status = Status.Paid;
        }
    }
    
    function setDefaulted() public {
        if (msg.sender == owner) {
             status = Status.Defaulted;
        }
    }
    
}
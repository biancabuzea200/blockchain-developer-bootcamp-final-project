// SPDX-License-Identifier: UNLICENSED

/// @title A simulator for Berghain club entrance system
/// @author Bianca Buzea
/// @notice Uses Chainlink VRF to get a random number that describes entrance

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Entrance is VRFConsumerBase, Ownable {
    uint256 totalPeopleIn;  
   
    mapping (address => bool) private hasJoined;
    mapping (bytes32 => address) private reqIdToAddrMapping;
    mapping (address => bool) private hasRequestedAccess;
    mapping (address => bool) private isMemberBlacklisted;
    
    bytes32 internal keyHash;
    uint256 internal fee;

    event EnterClub(address, uint256);
   
    /**
     * Constructor inherits VRFConsumerBase
     * Network: Rinkeby
     * Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
     * LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
     * Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
     */
    
    constructor () VRFConsumerBase (
        0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, //VRF Coordinator
        0x01BE23585060835E02B77ef475b0Cc51aA1e0709 //LINK Token
    ) {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10 ** 18; // 0.1 LINK 
    }

    /**
     * Requests randomness
     */
     function letMeIn() public returns (bytes32 requestId) {
        require (isMemberBlacklisted[msg.sender] == false, "Sorry, the member is blacklisted"); 
        require (LINK.balanceOf(address(this)) >= fee, "Nor enough LINK - fund contract from the faucet ");

        reqIdToAddrMapping[requestId] = msg.sender;
        hasRequestedAccess[msg.sender] = true;
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     * get a random number between 0-1
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override{
        uint256 randomResult = (randomness % 2);

        if (randomResult == 1) {
            totalPeopleIn += 1;
            console.log("%s has got in!", reqIdToAddrMapping[requestId]);
            hasJoined[reqIdToAddrMapping[requestId]] = true;
        } else {
            hasJoined[reqIdToAddrMapping[requestId]] = false;
        }

        emit EnterClub(reqIdToAddrMapping[requestId], randomResult);
    }

    function setBlacklistStatus(address member, bool status) public onlyOwner {
        isMemberBlacklisted[member] = status;
    }

    function getBlacklistStatus(address member) public view returns (bool) {
        return isMemberBlacklisted[member];
    }

    function checkJoinStatus() public view returns (bool) {
        require(hasRequestedAccess[msg.sender] == true, "has not yet requested access");
        return hasJoined[msg.sender];
    }

    function getTotalPeopleIn() public view returns (uint256){
        console.log("There are %d total poeple in!", totalPeopleIn);
        return totalPeopleIn;
    }
}

   

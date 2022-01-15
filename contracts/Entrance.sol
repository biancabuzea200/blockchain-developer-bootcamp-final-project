// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title A simulator for Berghain club entrance system
/// @author Bianca Buzea
/// @notice Uses Chainlink VRF to get a random number that describes entrance
contract Entrance is VRFConsumerBase, Ownable {
    uint256 totalPeopleIn;  
   
    /// @dev mapping that holds if an address gets approved to enter the club or not
    mapping (address => bool) private hasJoined;
    /// @dev mapping between request id sent to Chainlink for a random number and the adress that sent the request
    mapping (bytes32 => address) private reqIdToAddrMapping;
    /// @dev mapping between an address and its ask for a random result
    mapping (address => bool) private hasRequestedAccess;
    /// @dev mapping between an address and its blacklist status
    mapping (address => bool) private isMemberBlacklisted;
    

    bytes32 internal keyHash;
    uint256 internal fee;

    ///@notice events that gets triggered upon entrance
    event EnterClub(address, uint256);
   
    /**
    * @dev Constructor inherits VRFConsumerBase
    * @dev Network: Rinkeby
    * @dev Chainlink VRF Coordinator address: 0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B
    * @dev LINK token address:                0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    * @dev Key Hash: 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311
    */
    
    constructor () VRFConsumerBase (
        0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, //VRF Coordinator
        0x01BE23585060835E02B77ef475b0Cc51aA1e0709 //LINK Token
    ) {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10 ** 18; // 0.1 LINK 
    }

    /**
     * @notice Let in a person based on random result
     * @dev Sends a request to Chainlink VRF for a random number
     */
     function letMeIn() public returns (bytes32 requestId) {
        require (isMemberBlacklisted[msg.sender] == false, "Sorry, the member is blacklisted"); 
        require (LINK.balanceOf(address(this)) >= fee, "Nor enough LINK - fund contract from the faucet ");

        reqIdToAddrMapping[requestId] = msg.sender;
        hasRequestedAccess[msg.sender] = true;
        return requestRandomness(keyHash, fee);
    }

    /**
     * @dev Callback function used by VRF Coordinator to get a random number between 0-1
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

     /**
     * @notice Gets called to set the blacklist status
     */
    function setBlacklistStatus(address member, bool status) public onlyOwner {
        isMemberBlacklisted[member] = status;
    }

     /**
     * @notice Get the blacklist status
     */
    function getBlacklistStatus(address member) public view returns (bool) {
        return isMemberBlacklisted[member];
    }

     /**
     * @notice Check the join status of a person
     */
    function checkJoinStatus() public view returns (bool) {
        require(hasRequestedAccess[msg.sender] == true, "has not yet requested access");
        return hasJoined[msg.sender];
    }

     /**
     * @notice Get the total number of people in
     */
    function getTotalPeopleIn() public view returns (uint256){
        console.log("There are %d total poeple in!", totalPeopleIn);
        return totalPeopleIn;
    }
}

   

const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("Entrance", function () {
  // Checks if the initial number of people is 0
  it("Should return the initial number of people in as 0", async function () {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    expect(await entranceInstance.getTotalPeopleIn()).to.equal(0);
  });

  // A user should not be allowed to check the status of his/her entrance request
  // if an entrance request was not submited previously
  // It expects to raise an error
  it("Cannot check status if has not requested access", async function(){
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    await expect(entranceInstance.checkJoinStatus()).to.be.revertedWith("has not yet requested access");
  })

  // Checks that a normal user (not the contract owner) cannot blacklist an address
  // It expects to raise an error
  it("Cannot blacklist an address if not the owner", async () => {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    const [owner, randomAccount] = await ethers.getSigners();

    await expect(entranceInstance.connect(randomAccount).setBlacklistStatus(owner.address, true)).to.be.revertedWith("Ownable: caller is not the owner");
  })

  // Checks that the contract owner can blacklist an address
  it("Can blacklist an address if the caller is the owner", async () => {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    const [owner, randomAccount] = await ethers.getSigners();

    let blacklistStatus = await entranceInstance.getBlacklistStatus(randomAccount.address);
    expect(blacklistStatus).to.be.equal(false);

    await entranceInstance.setBlacklistStatus(randomAccount.address, true);

    blacklistStatus = await entranceInstance.getBlacklistStatus(randomAccount.address);
    expect(blacklistStatus).to.be.equal(true);
  })

  // Check that a blacklisted address cannot request the entrance
  // It expects to raise an error
  it("Does not permit to request entrance for a blacklisted address", async () => {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    const [owner, randomAccount] = await ethers.getSigners();

    await entranceInstance.setBlacklistStatus(randomAccount.address, true);

    await expect(entranceInstance.connect(randomAccount).letMeIn()).to.be.revertedWith("Sorry, the member is blacklisted");
  })
});
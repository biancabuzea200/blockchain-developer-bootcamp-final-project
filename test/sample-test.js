const { ethers } = require("hardhat");
const { expect } = require("chai");


describe("Entrance", function () {
  it("Should return the initial number of people in as 0", async function () {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    expect(await entranceInstance.getTotalPeopleIn()).to.equal(0);
  });

  it("Cannot check status if has not requested access", async function(){
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    await expect(entranceInstance.checkJoinStatus()).to.be.revertedWith("has not yet requested access");
  })

  it("Cannot blacklist an address if not the owner", async () => {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    const [owner, randomAccount] = await ethers.getSigners();

    await expect(entranceInstance.connect(randomAccount).setBlacklistStatus(owner.address, true)).to.be.revertedWith("Ownable: caller is not the owner");
  })

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

  it("Does not permit to request entrance for a blacklisted address", async () => {
    const Entrance = await ethers.getContractFactory("Entrance");
    const entranceInstance = await Entrance.deploy();

    const [owner, randomAccount] = await ethers.getSigners();

    await entranceInstance.setBlacklistStatus(randomAccount.address, true);

    await expect(entranceInstance.connect(randomAccount).letMeIn()).to.be.revertedWith("Sorry, the member is blacklisted");
  })
});
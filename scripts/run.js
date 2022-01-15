// const main = async () => {
//     const [owner, randomPerson] = await hre.ethers.getSigners();
//     const entranceContractFactory = await hre.ethers.getContractFactory("Entrance");
//     const entranceContract = await entranceContractFactory.deploy();
//     await entranceContract.deployed();

//     console.log("Contract deployed to:", entranceContract.address);
//     console.log("Owner address is:", owner.address);

//     let peopleCount;
//     peopleCount = await entranceContract.getTotalPeopleIn();

//     let entranceTxn = await entranceContract.letIn();
//     await entranceTxn.wait();

//     peopleCount = await entranceContract.getTotalPeopleIn();

//     entranceTxn = await entranceContract.connect(randomPerson).letIn();
//     await entranceTxn.wait();

//     peopleCount = await entranceContract.getTotalPeopleIn();

//     // randomResult = await entranceContract.getRandomNumber();
//     // await entranceTxn.wait();
//     // console.log("random number result is: ", randomResult);
//   };
  
//   const runMain = async () => {
//     try {
//       await main();
//       process.exit(0);
//     } catch (error) {
//       console.log(error);
//       process.exit(1);
//     }
//   };
  
//   runMain();
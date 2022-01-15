# Basic Sample Hardhat Project

## Project Description

Berghain Entry: A Dapp that simulates the entrance to the popular Berlin club Berghain. 

The Dapp allows poeple to enter the club or denies entry based on LUCK, totally random, pretty much as it happens at the real Berghain club.

Structually, Berghain Entry consists of a contract  `Entrance` that inherits from the Chainlink VRFBase interface to generate a random number that represents whether the person is allowed to enter the club or not.

`Entrance` contract can:
- let randomly a person in
- generate a random number using oracles
- return the total number of people in the club
- blacklist the entrance of a person

## Directory Structure



## Deploy project locally:

### Environmnet

- Node.js v16.9.1
- npm 7.21.1
- Hardhat
- React

### Dependencies

- @nomiclabs/hardhat-ethers
- @nomiclabs/hardhat-waffle
- chai
- dotenv
- ethereum-waffle
- ethers
- hardhat
- react
- react-dom
- react-scripts
- web-vitals


### Instructions

1. Clone from `https://github.com/biancabuzea200/blockchain-developer-bootcamp-final-project`
2. `npm install` to install all dependencies
3. `npx hardhat test` to perform unit tests
   NOTE: please comment out Rinkeby network block in `hardhat.config.js` before test.
4. `npx hardhat node` to start the local test node
5. `npx hardhat run scripts/deploy.js --network localhost` to deploy the contract to the test network
6. `npm start` to start React server populated at http://localhost:3000/

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```

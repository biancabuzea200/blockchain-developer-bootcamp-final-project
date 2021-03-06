# Berghain Entrance Simulator

## Project Description

Berghain Entry: A Dapp that simulates the entrance to the popular Berlin club Berghain. 

The Dapp allows poeple to enter the club or denies entry based on LUCK, totally random, pretty much as it happens at the real Berghain club.

Structually, Berghain Entry consists of a contract  `Entrance` that inherits from the Chainlink VRFBase interface to generate a random number that represents whether the person is allowed to enter the club or not. 

`Entrance` contract can:
- let randomly a person in
- generate a random number using oracles
- return the total number of people in the club
- blacklist the entrance of a person

## Live deployment

The live webpage can be accessed here: https://biancabuzea200.github.io/blockchain-developer-bootcamp-final-project/

## Public Ethereum Address for NFT

 My public Ethereum account to receive my certification as an NFT: `0x95E17Ee1fF7AD3d66b260a21b335eA6CF2ce38af`

## Screencast walking through the project 
https://www.loom.com/share/555efd60fa8e4628a3d2f30261cded35


## Directory Structure

```
│   .env  
│   .env.example  
│   .gitignore  
│   avoiding_common_attacks.md  
│   deployed_address.txt  
│   design_pattern_decisions.md  
│   hardhat.config.js  
│   LICENSE  
│   package-lock.json  
│   package.json  
│   README.md  
│  
├───artifacts  
│  
├───contracts  
│       Entrance.sol  
│  
├───my-app  
│   │   .gitignore  
│   │   package-lock.json  
│   │   package.json  
│   │   README.md  
│   │  
│   ├───public  
│   │       ber2.jpg  
│   │       favicon.ico  
│   │       index.html  
│   │       logo192.png  
│   │       logo512.png  
│   │       manifest.json  
│   │       robots.txt  
│   │  
│   └───src  
│       │   App.css  
│       │   App.js  
│       │   App.test.js  
│       │   index.css  
│       │   index.js  
│       │   logo.svg  
│       │   reportWebVitals.js  
│       │   setupTests.js  
│       │  
│       └───utils  
│               EntrancePortal.json  
│  
├───scripts  
│       deploy.js  
│       run.js  
│       sample-script.js  
│  
└───test  
        sample-test.js  
```

## Deploy project locally:

### Environmnet

- Node.js v16.13.0
- npm 6.13.7
- Hardhat
- React

### Dependencies

- @appliedblockchain/chainlink-plugins-fund-link: 0.0.3
- @chainlink/contracts: ^0.3.1
- @nomiclabs/hardhat-ethers: ^2.0.4
- @nomiclabs/hardhat-waffle: ^2.0.1
- @openzeppelin/contracts: ^4.4.2
- @testing-library/jest-dom: ^5.16.1
- @testing-library/react: ^12.1.2
- @testing-library/user-event: ^13.5.0
- chai: ^4.3.4
- dotenv: ^12.0.3
- ethereum-waffle: ^3.4.0
- ethers: ^5.5.3
- gh-pages: ^3.2.3
- hardhat: ^2.8.2
- react: ^17.0.2
- react-dom: ^17.0.2
- react-scripts: 5.0.0
- web-vitals: ^2.1.3

### Instructions

1. Clone from `https://github.com/biancabuzea200/blockchain-developer-bootcamp-final-project`
2. `npm install` to install dependencies for smart contract
3. `cp .env.example .env` to create your own `.env` file; set the `RINKEKY_RPC_URL` (from [alchemy](https://www.alchemy.com/)) and `PRIVATE_KEY` in there
4. `npx hardhat test` to perform unit tests
5. `npx hardhat run scripts/deploy.js --network rinkeby` to deploy the contract to the Rinkeby test network
    NOTE: because the contact uses Chainlink oracle to get a random number, the contract cannot be deployed on your localhost
6. `npx hardhat fund-link --contract insert-contract-address-here --network rinkeby` to fund the deployed contract with LINK
7. `cd my-app` to navigate to the frontend folder
8. `npm install` to install dependencies for frontend
9. `npm start` to start React server populated at http://localhost:3000/

## Unit Tests Results
  Test command: `npx hardhat test`

```
  Entrance

    √ Should return the initial number of people in as 0 (888ms)
    √ Cannot check status if has not requested access (123ms)
    √ Cannot blacklist an address if not the owner (117ms)
    √ Can blacklist an address if the caller is the owner (122ms)
    √ Does not permit to request entrance for a blacklisted address (104ms)
```
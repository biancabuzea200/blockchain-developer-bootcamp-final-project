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

## Directory Structure

├───artifacts
│   ├───@chainlink
│   │   └───contracts
│   │       └───src
│   │           └───v0.8
│   │               ├───interfaces
│   │               │   └───LinkTokenInterface.sol
│   │               ├───VRFConsumerBase.sol
│   │               └───VRFRequestIDBase.sol
│   ├───@openzeppelin
│   │   └───contracts
│   │       ├───access
│   │       │   └───Ownable.sol
│   │       └───utils
│   │           └───Context.sol
│   ├───build-info
│   ├───contracts
│   │   ├───Entrance.sol
│   │   └───Greeter.sol
│   └───hardhat
│       └───console.sol
├───cache
├───contracts
├───my-app
│   ├───public
│   └───src
│       └───utils
├───scripts
└───test

C:\Users\Bianca\Desktop\backup tree>tree /?
Graphically displays the folder structure of a drive or path.

TREE [drive:][path] [/F] [/A]

   /F   Display the names of the files in each folder.
   /A   Use ASCII instead of extended characters.


C:\Users\Bianca\Desktop\backup tree>tree /F
Folder PATH listing for volume Windows-SSD
Volume serial number is F8AF-2228
C:.
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
││
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
- hardhat: ^2.8.2
- react: ^17.0.2
- react-dom: ^17.0.2
- react-scripts: 5.0.0
- web-vitals: ^2.1.3

### Instructions

1. Clone from `https://github.com/biancabuzea200/blockchain-developer-bootcamp-final-project`
2. `npm install` to install all dependencies
3. `npx hardhat test` to perform unit tests
4. `npx hardhat node` to start the local test node
5. `npx hardhat run scripts/deploy.js --network rinkeby` to deploy the contract to the Rinkeby test network
    NOTE: because the contact uses Chainlink oracle to get a random number, the contract cannot be deployed on your localhost
6. `npx hardhat fund-link --contract insert-contract-address-here --network rinkeby` to fund the deployed contract with LINK
6. `cd my-app` to navigate to the frontend folder
7. `npm start` to start React server populated at http://localhost:3000/

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

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import abi from "./utils/EntrancePortal.json";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentStatus, setCurrentStatus] = useState("");
  const [currentPeopleInside, setCurrentPeopleInside] = useState(0);

  const contractAddress = "0xD71Db2521F20381998B5CC92FeB10F00D903D3bB";
  const contractABI = abi.abi;


  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
        getTotalPeopleIn();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      getTotalPeopleIn();
    } catch (error) {
      console.log(error)
    }
  }

  const letIn = async ()=>{
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const entrancePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract:", entrancePortalContract)

        /*
        * Execute the actual wave from your smart contract
        */
        const entranceTxn = await entrancePortalContract.letMeIn();
        console.log("Mining...", entranceTxn.hash);

        await entranceTxn.wait();
        console.log("Mined -- ", entranceTxn.hash);

        setCurrentStatus("Please hold on! Waiting for a response...");
        
        await new Promise(resolve => setTimeout(resolve, 30000));

        const isJoined = await entrancePortalContract.checkJoinStatus();
        if (isJoined) {
          setCurrentStatus("You are in!");
        } else {
          setCurrentStatus("Accesss Denied!");
        }

        let count = await entrancePortalContract.getTotalPeopleIn();
        console.log("Retrieved total people number count...", count.toNumber());
        setCurrentPeopleInside(count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  const getRandomNumber = async ()=>{
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const entrancePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract:", entrancePortalContract)
        let count = await entrancePortalContract.getRandomNumber();
        await count.wait();
        await new Promise(resolve => setTimeout(resolve, 30000))
        count = await entrancePortalContract.randomResult();
        console.log("Retrieved random no...", count.toNumber());

        if (count.toNumber() === 1) {
          setCurrentStatus("Come in!");
        } else {
          setCurrentStatus("Sorry, you can't get in tonight!");
        }

        count = await entrancePortalContract.getTotalPeopleIn();
        console.log("Retrieved total people number count...", count);

        /*
        * Execute the actual wave from your smart contract
        */
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTotalPeopleIn = async ()=>{
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const entrancePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("Contract:", entrancePortalContract)

        let count = await entrancePortalContract.getTotalPeopleIn();
        console.log("Retrieved total people number count...", count.toNumber());
        setCurrentPeopleInside(count.toNumber());      
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        Welcome to Berghain!Let's see if you can get in. 
        </div>

        <div className="bio">
         Connect your Ethereum wallet on Rinkeby and enter!
        </div>

        <div>
          {currentStatus}
        </div>

        <button className="entranceButton" onClick={letIn}>
          Can I get in?
        </button>

        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="entranceButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        
        <h1>Total number of people in is currently {currentPeopleInside}</h1>
      </div>
    </div>
  );
}

export default App
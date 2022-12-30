import React, { useState, useEffect, createContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { create as ipfsHttpClient } from "ipfs-http-client";

import { MarketAddress, MarketAddressABI } from "./constants";

interface ContextProps {
  nftCurrency: string;
  currentAccount: string;
  connectWallet: () => void;
  uploadToIPFS: (file: any) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_API_KEY_SECRET;

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");
const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const NFTContext = createContext({} as ContextProps);

export const NFTProvider = ({ children }: ProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const nftCurrency = "ETH";

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No Accounts Found.");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentAccount(accounts[0]);

    window.location.reload();
  };

  const uploadToIPFS = async (file: any) => {
    const subdomain = 'https://an-jsm-nft-marketplace.infura-ipfs.io';
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file to IPFS.", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider
      value={{ nftCurrency, currentAccount, connectWallet, uploadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};

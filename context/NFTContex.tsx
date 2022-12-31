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
  createNFT: (formInput: any, fileUrl: any, router: any) => void;
  fetchNFTs: any;
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

const subdomain = "https://an-jsm-nft-marketplace.infura-ipfs.io";

const fetchContract = (signerOrProvider: any) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

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
    try {
      const added = await client.add({ content: file });
      const url = `${subdomain}/ipfs/${added.path}`;
      return url;
    } catch (error) {
      console.log("Error uploading file to IPFS.", error);
    }
  };

  const createNFT = async (formInput: any, fileUrl: any, router: any) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);
      const url = `${subdomain}/ipfs/${added.path}`;

      await createSale(url, price);

      router.push("/");
    } catch (error) {}
  };

  const createSale = async (
    url: any,
    formInputPrice: any
    // isReselling: any,
    // id: any
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });

    await transaction.wait();
  };

  const fetchNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      data.map(
        async ({ tokenId, seller, owner, price: unformattedPrice }: any) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const {
            data: { image, name, description },
          } = await axios.get(tokenURI);
          const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        currentAccount,
        connectWallet,
        uploadToIPFS,
        createNFT,
        fetchNFTs,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

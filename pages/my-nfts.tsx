import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Banner, Loader, NFTCard, SearchBar } from "../components";

import { NFTContext } from "../context/NFTContex";

import images from "../assets";
import { shortenAddress } from "../utils/shortenAddress";

const MyNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("Recently added");

  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);

  const onHandleSearch = (query: string) => {
    const filteredNfts = nfts.filter(({ name }: any) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  useEffect(() => {
    fetchMyNFTsOrListedNFTs().then((items: any) => {
      setNfts(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Recently added":
        setNfts(sortedNfts.sort((a: any, b: any) => b.tokenId - a.tokenId));
        break;
      case "Price (low to hight)":
        setNfts(sortedNfts.sort((a: any, b: any) => a.price - b.price));
        break;
      case "Price (hight to low)":
        setNfts(sortedNfts.sort((a: any, b: any) => b.price - a.price));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          text="Your Nifty NFTs"
          parentClassName="h-80 justify-center"
          childClassName="text-center mb-4 p-2"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <Image
            src={images.creator1}
            alt=""
            width={150}
            height={150}
            className="rounded-full border-2 border-nft-black-1"
          />
          <p className="font-semibold text-nft-black-1 text-2xl mt-2 dark:text-white">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>

      {!isLoading && !nfts.length && !nftsCopy.length ? (
        <div className="flexCenter p-16 sm:p-4">
          <h1 className="font-extrabold text-nft-black-1 text-3xl dark:text-white">
            No NFTs Owned
          </h1>
        </div>
      ) : (
        <div className="flexCenter flex-col w-full p-12 minmd:w-4/5 sm:px-4">
          <div className="flex flex-row flex-1 w-full px-4 minlg:px-8 xs:px-0 sm:flex-col">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="w-full mt-3 grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {nfts.map((nft: any) => (
              <NFTCard key={nft.tokenId} nft={nft} onProfilePage />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyNFTs;

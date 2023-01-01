import React, { useContext, useEffect, useState } from "react";
import { Loader, NFTCard } from "../components";

import { NFTContext } from "../context/NFTContex";

const ListedNFTs = () => {
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchMyNFTsOrListedNFTs } = useContext(NFTContext);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items: any) => {
      setNfts(items);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loader />;

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter min-h-screen">
        <h1 className="text-nft-black-1 text-3xl font-extrabold dark:text-white">
          No NFTs Listed for Sale
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-12 sm:px-4 min-h-screen">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <h2 className="text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2 dark:text-white">
            NFTs Listed for Sale
          </h2>
          <div className="mt-3 w-full grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {nfts?.map((nft: any) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListedNFTs;

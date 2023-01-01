import { useEffect, useState } from "react";
import { NFTCard, SearchBar } from "../index";

interface Props {
  nfts: any;
}

const HotBids = ({ nfts }: Props) => {
  const [activeSelect, setActiveSelect] = useState("Recently added");
  const [filteredNfts, setFilteredNfts] = useState([]);

  const onHandleSearch = (query: string) => {
    const filteringdNfts = nfts.filter(({ name }: any) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    if (filteringdNfts.length) {
      setFilteredNfts(filteringdNfts);
    } else {
      setFilteredNfts(nfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && filteredNfts.length) {
      setFilteredNfts(nfts);
    }
  };

  useEffect(() => {
    setFilteredNfts(nfts);
  }, [nfts]);

  useEffect(() => {
    const sortedNfts = [...filteredNfts];
    switch (activeSelect) {
      case "Recently added":
        setFilteredNfts(
          sortedNfts.sort((a: any, b: any) => b.tokenId - a.tokenId)
        );
        break;
      case "Price (low to hight)":
        setFilteredNfts(sortedNfts.sort((a: any, b: any) => a.price - b.price));
        break;
      case "Price (hight to low)":
        setFilteredNfts(sortedNfts.sort((a: any, b: any) => b.price - a.price));
        break;
      default:
        setFilteredNfts(nfts);
        break;
    }
  }, [activeSelect]);

  return (
    <div className="mt-10">
      <div className="flexBetween sm:flex-col sm:items-start">
        <h1 className="flex-1 font-semibold text-nft-black-1 text-2xl minlg:text-4xl dark:text-white sm:mb-4">
          Hot Bids
        </h1>
        <SearchBar
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          handleSearch={onHandleSearch}
          clearSearch={onClearSearch}
        />
      </div>
      <div className="grid grid-cols-5 w-full mt-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredNfts.map((nft: any) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default HotBids;

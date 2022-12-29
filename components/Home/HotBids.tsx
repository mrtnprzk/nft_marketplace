import { makeId } from "../../utils/makeId";
import { NFTCard } from "../index";

const HotBids = () => {
  return (
    <div className="mt-10">
      <div className="flexBetween sm:flex-col sm:items-start">
        <h1 className="flex-1 font-semibold text-nft-black-1 text-2xl minlg:text-4xl dark:text-white sm:mb-4">
          Hot Bids
        </h1>
        <div>SearchBar</div>
      </div>
      <div className="grid grid-cols-5 w-full mt-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number, index) => (
          <NFTCard
            key={index}
            nft={{
              index,
              name: `Nifty NFT ${index}`,
              seller: `0x${makeId(3)}...${makeId(4)}`,
              owner: `0x${makeId(3)}...${makeId(4)}`,
              description: "Cool NFT on sale",
              price: (10 - index * 0.534).toFixed(2),
              image: ''
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HotBids;

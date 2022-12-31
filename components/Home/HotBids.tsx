import { makeId } from "../../utils/makeId";
import { NFTCard } from "../index";

interface Props {
  nfts: any;
}

const HotBids = ({ nfts }: Props) => {
  return (
    <div className="mt-10">
      <div className="flexBetween sm:flex-col sm:items-start">
        <h1 className="flex-1 font-semibold text-nft-black-1 text-2xl minlg:text-4xl dark:text-white sm:mb-4">
          Hot Bids
        </h1>
        <div>SearchBar</div>
      </div>
      <div className="grid grid-cols-5 w-full mt-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {nfts?.map((nft: any) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
};

export default HotBids;

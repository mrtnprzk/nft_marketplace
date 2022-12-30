import Image from "next/image";
import { useContext } from "react";

import images from "../../assets";
import { NFTContext } from "../../context/NFTContex";

interface Props {
  rank: number;
  creatorImage: string;
  creatorName: string;
  creatorEths: number;
}

const CreatorCard = ({
  rank,
  creatorImage,
  creatorName,
  creatorEths,
}: Props) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <div className="flex flex-col bg-white p-4 my-4 border border-nft-gray-1 rounded-3xl min-w-190 minlg:min-w-240 dark:bg-nft-black-3 dark:border-nft-black-1">
      <div className="bg-nft-red-violet flexCenter h-8 w-8 rounded-full minlg:w-10 minlg:h-10">
        <p className="text-white font-semibold text-base minlg:text-lg">
          {rank}
        </p>
      </div>
      <div className="flex justify-center my-2">
        <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
          <Image
            src={creatorImage}
            alt=""
            className="rounded-full h-full w-full"
          />
          <div className="absolute bottom-0 right-0 h-4 w-4 minlg:w-7 minlg:h-7">
            <Image src={images.tick} alt="" />
          </div>
        </div>
      </div>

      <div className="flexCenter flex-col text-center mt-3 minlg:mt-7">
        <p className="font-semibold text-base text-nft-black-1 dark:text-white">
          {creatorName}
        </p>
        <p className="font-semibold text-base text-nft-black-1 mt-1 dark:text-white">
          {creatorEths.toFixed(2)}{" "}
          <span className="font-normal">{nftCurrency}</span>
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;

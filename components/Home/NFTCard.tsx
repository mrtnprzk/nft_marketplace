import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import images from "../../assets";
import { NFTContext } from "../../context/NFTContex";
import { shortenAddress } from "../../utils/shortenAddress";

interface Props {
  nft: {
    index: number;
    name: string;
    seller: string;
    owner: string;
    description: string;
    image: string;
    price: string;
  };
}

const NFTCard = ({ nft }: Props) => {
  const { nftCurrency } = useContext(NFTContext);

  const nftAddress = shortenAddress(nft.seller);

  return (
    <Link
      href={{ pathname: "/nft-details", query: nft }}
      className="bg-white rounded-2xl shadow-md p-4 m-4 sm:m-2 minlg:m-8 dark:bg-nft-black-3"
    >
      <Image
        src={nft?.image || images[`nft${nft.index + 1}`]}
        alt=""
        className="relative w-full rounded-2xl overflow-hidden"
        width={700}
        height={700}
      />
      <div className="mt-3 flex flex-col">
        <p className="text-nft-black-1 font-semibold text-sm minlg:text-xl dark:text-white">
          {nft.name}
        </p>
        <div className="flexBetween mt-2">
          <p className="text-nft-black-1 font-semibold text-xs minlg:text-xl dark:text-white">
            {nft.price} <span className="font-normal">{nftCurrency}</span>{" "}
          </p>
          <p className="text-nft-black-1 font-semibold text-xs minlg:text-xl dark:text-white">
            {nftAddress}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;

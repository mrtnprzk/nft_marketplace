import { SetStateAction, Dispatch } from "react";
import Link from "next/link";

interface Props {
  isMobile?: boolean;
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}

const MenuItems = ({ isMobile, active, setActive }: Props) => {
  const generateLink = (i: number) => {
    switch (i) {
      case 0:
        return "/";
      case 1:
        return "/created-nfts";
      case 2:
        return "/my-nfts";
      default:
        return "/";
    }
  };

  return (
    <ul
      className={`list-none flexCenter flex-row ${
        isMobile && "flex-col h-full"
      }`}
    >
      {["Explore NFTs", "Listed NFTs", "My NFTs"].map((item, i) => (
        <li
          key={i}
          onClick={() => {setActive(item)}}
          className={`flex flex-row items-center font-semibold text-base mx-3 hover:text-nft-dark dark:hover:text-white duration-500 ${
            active === item
              ? "dark:text-white text-nft-black-1"
              : "dark:text-nft-gray-3 text-nft-gray-2"
          }`}
        >
          <Link href={generateLink(i)}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;

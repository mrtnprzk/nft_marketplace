import Image from "next/image";
import Link from "next/link";
import Button from "../Others/Button";

import images from "../../assets";

const FooterSubscribe = () => {
  return (
    <div className="flexStart flex-1 flex-col">
      <Link href={"/"} className="flexCenter">
        <Image src={images.logo02} alt="logo" width={32} height={32} />
        <h2 className="text-nft-black-1 font-semibold text-lg ml-1 dark:text-white">
          CryptoKet
        </h2>
      </Link>
      <p className="font-semibold text-base mt-6 text-nft-black-1 dark:text-white">
        Get the latest Updates
      </p>
      <div className="flexBetween bg-white border-nft-gray-2 rounded-md minlg:w-557 w-337 mt-6 md:w-full dark:bg-nft-black-2 dark:border-nft-black-2">
        <input
          type={"email"}
          placeholder="Your Email"
          className="flex-1 bg-white text-nft-black-1 font-normal text-sm h-full w-full px-4 rounded-md outline-none minlg:text-lg dark:bg-nft-black-2 dark:text-white"
        />
        <div className="flex-initial">
          <Button onClick={() => {}} className="rounded-md">
            Email me
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FooterSubscribe;

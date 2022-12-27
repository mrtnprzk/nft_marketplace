import Image from "next/image";
import Link from "next/link";

import images from "../../assets";

const Logo = () => {
  return (
    <div className="flex flex-1 flex-row justify-start">
      <Link href={"/"} className="flexCenter" onClick={() => {}}>
        <Image src={images.logo02} alt="logo" width={32} height={32} />
        <h2 className="text-nft-black-1 font-semibold text-lg ml-1 dark:text-white md:hidden">
          CryptoKet
        </h2>
      </Link>
    </div>
  );
};

export default Logo;

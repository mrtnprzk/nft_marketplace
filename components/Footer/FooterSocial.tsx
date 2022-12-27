import { useTheme } from "next-themes";
import Image from "next/image";
import images from "../../assets";

const footerImages = [
  images.instagram,
  images.twitter,
  images.telegram,
  images.discord,
];

const FooterSocial = () => {
    const { theme } = useTheme();

  return (
    <div className="flexCenter w-full mt-5 border-t border-nft-gray-1 px-16 sm:px-4 dark:border-nft-black-1">
        <div className="flexBetween flex-row w-full mt-7 minmd:w-4/5 sm:flex-col">
          <p className="font-semibold text-base text-nft-black-1 dark:text-white">
            CryptoKet, Inc. All Rights Reserved
          </p>
          <div className="flex flex-row sm:mt-4">
            {footerImages.map((image, index) => (
              <div key={index} className="mx-2 cursor-pointer">
                <Image
                  src={image}
                  alt=""
                  width={24}
                  height={24}
                  className={`${theme === "light" ? "filter invert" : null}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default FooterSocial
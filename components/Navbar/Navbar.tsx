import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Logo, MenuItems, DarkModeInput, ButtonGroup } from "../index";
import Image from "next/image";

import images from "../../assets";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [active, setActive] = useState("Explore NFTs");
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const buttonGroupHandler = () => {
    setActive("");
    router.push("/create-nft");
  };

  // useRouter
  return (
    <nav className="bg-white flexBetween w-full sticky top-0 z-10 p-4 flex-row border-b border-nft-gray-1 dark:border-nft-black-1 dark:bg-nft-dark">
      <Logo onClick={() => setActive("Explore NFTs")} />
      <div className="flex flex-initial flex-row justify-end">
        <DarkModeInput />
        <div className="flex md:hidden">
          <MenuItems active={active} setActive={setActive} />
          <div className="ml-3">
            <ButtonGroup onClick={buttonGroupHandler} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex ml-2">
        {isOpen ? (
          <Image
            src={images.cross}
            alt=""
            width={20}
            height={20}
            onClick={() => setIsOpen(false)}
            className={theme === "light" ? "filter invert" : ""}
          />
        ) : (
          <Image
            src={images.menu}
            alt=""
            width={25}
            height={25}
            onClick={() => setIsOpen(true)}
            className={theme === "light" ? "filter invert" : ""}
          />
        )}

        {isOpen && (
          <div className="fixed flex justify-between flex-col nav-h inset-0 top-16 bg-white dark:bg-nft-dark z-10">
            <div className="flex-1 p-4">
              <MenuItems active={active} setActive={setActive} isMobile />
            </div>
            <div className="p-4 border-t border-nft-gray-1 dark:border-nft-black-1">
              <ButtonGroup onClick={buttonGroupHandler} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

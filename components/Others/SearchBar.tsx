import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

import images from "../../assets";

interface Props {
  activeSelect: string;
  setActiveSelect: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (query: string) => void;
  clearSearch: () => void;
}

const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}: Props) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [toggle, setToggle] = useState(false);

  const { theme } = useTheme();

  const toggleHandler = () => {
    setToggle((prevValue) => !prevValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(debouncedSearch);
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="flex-1 flexCenter bg-white rounded-md px-3 py-2 border border-nft-gray-2 dark:border-nft-black-2 dark:bg-nft-black-2">
        <Image
          src={images.search}
          alt=""
          width={20}
          height={20}
          className={`${theme === "light" ? "filter invert" : ""}`}
        />
        <input
          type="text"
          placeholder="Search NFT here..."
          className="bg-white text-nft-black-1 mx-4 w-full outline-none text-sm dark:bg-nft-black-2 dark:text-white"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>
      <div
        onClick={toggleHandler}
        className="relative flexBetween ml-4 px-3 py-2 min-w-190 cursor-pointer rounded-md sm:ml-0 sm:mt-2 border border-nft-gray-2 dark:border-nft-black-2 dark:bg-nft-black-2"
      >
        <p className="text-sm text-nft-black-1 dark:text-white">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          alt=""
          height={15}
          width={15}
          className={`${theme === "light" ? "filter invert" : ""} ${
            toggle && "rotate-180"
          } duration-500`}
        />
        {toggle && (
          <div className="absolute top-10 z-10 left-0 text-sm overflow-hidden rounded-md min-w-190 border border-nft-gray-2 dark:border-nft-black-2 dark:bg-nft-black-2">
            {[
              "Recently added",
              "Price (low to hight)",
              "Price (hight to low)",
            ].map((item) => (
              <p
                key={item}
                onClick={() => setActiveSelect(item)}
                className="hover:bg-nft-gray-1 px-3 py-1.5 duration-500 dark:hover:bg-nft-gray-3"
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;

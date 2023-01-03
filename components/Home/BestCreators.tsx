import { useRef } from "react";
import { CreatorCard } from "../index";
import { makeId } from "../../utils/makeId";

import images from "../../assets";
import Image from "next/image";
import { useTheme } from "next-themes";
import { shortenAddress } from "../../utils/shortenAddress";

interface Props {
  topCreators: any;
}

const BestCreators = ({ topCreators }: Props) => {
  const { theme } = useTheme();
  const parentRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;

    if (direction === "left") {
      current.scrollLeft -= 230;
    } else {
      current.scrollLeft += 230;
    }
  };

  const arrowClassName = `sm:hidden cursor-pointer w-10 h-10 z-10 ${
    theme === "light" ? "filter invert" : ""
  }`;

  return (
    <>
      <h1 className="font-semibold text-nft-black-1 text-2xl minlg:text-4xl dark:text-white">
        Best Creators
      </h1>
      <div ref={parentRef} className="relative flex-1 max-w-full flex mt-3">
        <div
          onClick={() => handleScroll("left")}
          className="flex items-center h-full absolute -left-5"
        >
          <Image src={images.left} alt="" className={arrowClassName} />
        </div>
        <div
          ref={scrollRef}
          className="flex flex-row w-max space-x-6 overflow-x-scroll no-scrollbar select-none"
        >
          {topCreators.map((creator: any, i: number) => (
            <CreatorCard
              key={creator.seller}
              rank={i + 1}
              creatorImage={images[`creator${i + 1}`]}
              creatorName={shortenAddress(creator.seller)}
              creatorEths={creator.sumall}
            />
          ))}
        </div>
        <div
          onClick={() => handleScroll("right")}
          className="flex items-center h-full absolute -right-5"
        >
          <Image src={images.right} alt="" className={arrowClassName} />
        </div>
      </div>
    </>
  );
};

export default BestCreators;

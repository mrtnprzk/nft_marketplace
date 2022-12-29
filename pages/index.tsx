import Head from "next/head";
import { Banner, BestCreators, HotBids } from "../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>NFT Marketplace</title>
      </Head>
      <div className="flex justify-center p-12 sm:px-4">
        <div className="w-full minmd:w-4/5">
          <Banner
            text="Discover, collect, and sell extraordinary NFTs."
            parentClassName="justify-start mb-6 h-72 p-12 rounded-3xl xs:p-4 xs:h-44 sm:h-60"
            childClassName="text-left xs:text-xl sm:text-2xl md:text-4xl"
          />

          <BestCreators/>
          <HotBids/>
        </div>
      </div>
    </>
  );
}

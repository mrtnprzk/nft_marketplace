import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Banner, BestCreators, HotBids, Loader } from "../components";
import { NFTContext } from "../context/NFTContex";
import { getCreators } from "../utils/getTopCreators";

export default function Home() {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const topCreators = getCreators(nfts);

  useEffect(() => {
    setIsLoading(true);
    fetchNFTs().then((items: any) => {
      setNfts(items);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <Loader />;

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

          {!isLoading && !nfts.length ? (
            <div className="w-full text-center py-40">
              <h1 className="text-3xl font-semibold">
                That is weird... No NFTs for salw!
              </h1>
            </div>
          ) : (
            <>
              <BestCreators topCreators={topCreators} />
              <HotBids nfts={nfts} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

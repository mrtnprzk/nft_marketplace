import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Loader, Input } from "../components";
import axios from "axios";
import { NFTContext } from "../context/NFTContex";

import { useRouter } from "next/router";

const ResellNFT = () => {
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { createSale } = useContext(NFTContext);

  const router = useRouter();
  const { tokenId, tokenURI } = router.query;

  const fetchNFT = async () => {
    const { data } = await axios.get(tokenURI as any);

    setPrice(data.price);
    setImage(data.image);
    setIsLoading(false);
  };

  const handleResell = async () => {
    await createSale(tokenURI, price, true, tokenId);
    router.push('/');
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="text-nft-black-1 font-semibold text-2xl dark:text-white">
          Resell NFT
        </h1>
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && (
          <Image
            src={image}
            alt=""
            width={400}
            height={400}
            className="rounded my-5 mx-auto"
          />
        )}

        <div className="flex justify-center w-full">
          <Button onClick={handleResell} className="rounded-xl">
            List NFT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;

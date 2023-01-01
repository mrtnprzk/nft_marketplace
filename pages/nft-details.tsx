import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { NFTContext } from "../context/NFTContex";

import images from "../assets";
import Image from "next/image";
import { useRouter } from "next/router";
import { Button, Loader, Modal, PaymentBodyCmp } from "../components";
import { shortenAddress } from "../utils/shortenAddress";

const NFTDetails = () => {
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [nft, setNft] = useState<any>({
    image: "",
    tokenId: "",
    name: "",
    owner: "",
    price: "",
    seller: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const { currentAccount, nftCurrency, buyNFT } = useContext(NFTContext);
  const router = useRouter();

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
    setIsLoading(false);
  }, [router.isReady]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col">
      <div className="relative flex-1 flex-center p-12 border-r border-nft-gray-1 sm:px-4 md:border-r-0 md:border-b dark:border-nft-black-1">
        <Image
          src={nft.image}
          alt=""
          width={550}
          height={550}
          className="shadow-lg rounded-xl mx-auto"
        />
      </div>

      <div className="flex-1 justify-start p-12 sm:px-4 sm:pb-4">
        <h2 className="text-nft-black-1 font-semibold text-2xl minlg:text-3xl dark:text-white">
          {nft.name}
        </h2>
        <div className="mt-10">
          <p className="text-nft-black-1 font-normal dark:text-white">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <Image
              src={images.creator1}
              alt=""
              width={60}
              height={60}
              className="rounded-full mr-3"
            />
            <p className="text-nft-black-1 text-sm font-semibold dark:text-white">
              {shortenAddress(nft.seller)}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="flex flex-row w-full border-b border-nft-gray-1 dark:border-nft-black-1">
            <p className="text-nft-black-1 mb-2 font-medium dark:text-white">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="text-nft-black-1 dark:text-white">
              {nft.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
          {currentAccount === nft.seller.toLowerCase() ? (
            <p className="text-nft-black-1 p-2 border border-nft-gray-1 dark:text-white">
              You cannot buy your own NFT
            </p>
          ) : currentAccount === nft.owner.toLowerCase() ? (
            <Button
              onClick={() =>
                router.push(
                  `/resell-nft?tokenId=${nft.tokenId}&tokenURI=${nft.tokenURI}`
                )
              }
              className="mr-5 rounded-xl sm:mb-5"
            >
              List on Marketplace
            </Button>
          ) : (
            <Button
              onClick={() => setPaymentModal(true)}
              className="mr-5 rounded-xl sm:mb-5"
            >
              Buy for {nft.price} {nftCurrency}
            </Button>
          )}
        </div>
      </div>
      {paymentModal ? (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={
            <div className="flex flex-row sm:flex-col">
              <Button
                onClick={checkout}
                className="mr-5 rounded-xl sm:mr-0 sm:mb-3"
              >
                Checkout
              </Button>
              <Button
                onClick={() => setPaymentModal(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
            </div>
          }
          onClick={() => setPaymentModal(false)}
        />
      ) : null}
      {successModal ? (
        <Modal
          header="Payment Successful"
          body={
            <div className="flexCenter flex-col text-center">
              <Image src={nft.image} alt="" width={200} height={200} />
              <p className="text-nft-black-1 text-sm mt-5 minlg:text-xl dark:text-white">
                You successfully purchased{" "}
                <span className="font-semibold">{nft.name}</span> from{" "}
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
          }
          footer={
            <Button
              onClick={() => {
                router.push("/my-nfts");
                setSuccessModal(false);
              }}
              className="rounded-xl"
            >
              Check it out
            </Button>
          }
          onClick={() => setSuccessModal(false)}
        />
      ) : null}
    </div>
  );
};

export default NFTDetails;

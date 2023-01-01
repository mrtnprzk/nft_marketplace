import Image from "next/image";
import { shortenAddress } from "../../utils/shortenAddress";

interface Props {
  nft: any;
  nftCurrency: string;
}

const PaymentBodyCmp = ({ nft, nftCurrency }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flexBetween">
        <p className="font-semibold minlg:text-xl text-nft-black-1 dark:text-white">
          Item
        </p>
        <p className="font-semibold minlg:text-xl text-nft-black-1 dark:text-white">
          Subtotal
        </p>
      </div>
      <div className="flexBetweenStart my-5">
        <div className="flex-1 flexStartCenter">
          <Image src={nft.image} alt="" width={150} height={150} />
          <div className="flexCenterStart flex-col ml-5">
            <p className="font-semibold text-sm minlg:text-xl text-nft-black-1 dark:text-white">
              {shortenAddress(nft.seller)}
            </p>
            <p className="font-semibold text-sm minlg:text-xl text-nft-black-1 dark:text-white">
              {nft.name}
            </p>
          </div>
        </div>

        <p className="text-sm minlg:text-xl text-nft-black-1 dark:text-white">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
      <div className="flexBetween mt-10">
        <p className="minlg:text-xl text-nft-black-1 dark:text-white">Total</p>
        <p className="text-sm minlg:text-xl text-nft-black-1 dark:text-white">
          {nft.price} <span className="font-semibold">{nftCurrency}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentBodyCmp;

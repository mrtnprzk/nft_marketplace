import {
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Accept, useDropzone } from "react-dropzone";
import { Button, Input } from "../components";

import images from "../assets";
import { NFTContext } from "../context/NFTContex";
import { useRouter } from "next/router";

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState<SetStateAction<any>>(null);
  const [formInput, setFormInput] = useState({
    name: "",
    price: "",
    description: "",
  });
  const router = useRouter();
  const { theme } = useTheme();
  const { uploadToIPFS, createNFT } = useContext(NFTContext);

  const onDrop = useCallback(async (acceptedFile: any) => {
    //upload imahe to the ipfs
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*" as any,
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () =>
      `flex flex-col items-center p-5 rounded-sm bg-white border border-dashed border-nft-gray-2 dark:bg-nft-black-1 dark:border-white ${
        isDragActive && "border-file-active"
      } ${isDragAccept && "border-file-accept"} ${
        isDragReject && "border-file-reject"
      }`,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center p-12 sm:px-4">
      <div className="w-3/5 md:w-full">
        <h1 className="font-semibold text-nft-black-1 text-2xl minlg:text-4xl dark:text-white">
          Create new NFT
        </h1>
        <div className="mt-16">
          <p className="font-semibold text-xl text-nft-black-1 dark:text-white">
            Upload File
          </p>
          <div className="mt-4 cursor-pointer">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-semibold text-xl text-nft-black-1 dark:text-white">
                  JPG, PNG, GIF, SVG, WEBM. Max 100mb.
                </p>
                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    alt=""
                    width={100}
                    height={100}
                    className={`${theme === "light" ? "filter invert" : ""}`}
                  />
                </div>
                <p className="font-semibold text-sm text-nft-black-1 dark:text-white">
                  Drag and Drop File
                </p>
                <p className="font-semibold text-xs text-nft-black-1 dark:text-white">
                  or Browse media on your device.
                </p>
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <Image
                    src={fileUrl}
                    alt=""
                    width={300}
                    height={300}
                    className="mx-auto mt-5"
                  />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Name"
          placeholder="NFT Name"
          handleClick={(e) =>
            setFormInput((prevState) => {
              return { ...prevState, name: e.target.value };
            })
          }
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) =>
            setFormInput((prevState) => {
              return { ...prevState, description: e.target.value };
            })
          }
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) =>
            setFormInput((prevState) => {
              return { ...prevState, price: e.target.value };
            })
          }
        />
        <div className="mt-7 w-full flex justify-end">
          <Button
            className="rounded-xl"
            onClick={() => {
              createNFT(formInput, fileUrl, router);
            }}
          >
            Create NFT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useRef } from "react";

import images from "../../assets";

interface Props {
  header: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  onClick: () => void;
}

const Modal = ({ header, body, footer, onClick }: Props) => {
  const modalRef = useRef(null);
  const { theme } = useTheme();

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClick();
    }
  };

  return (
    <div
      className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="flex flex-col bg-white rounded-lg w-2/5 md:w-11/12 minlg:w-2/4 z-20 dark:bg-nft-dark"
      >
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <Image
            src={images.cross}
            alt=""
            width={20}
            height={20}
            className={`${
              theme === "light" ? "filter invert" : ""
            } cursor-pointer`}
            onClick={onClick}
          />
        </div>

        <div className="flexCenter w-full text-center p-4">
          <h2 className="text-nft-black-1 text-2xl dark:text-white">
            {header}
          </h2>
        </div>

        <div className="p-10 border-t border-b border-nft-gray-1 sm:px-4 dark:border-nft-black-3">
          {body}
        </div>

        <div className="flexCenter p-4">{footer}</div>
      </div>
    </div>
  );
};

export default Modal;

import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-semibold text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;

import React, { useContext } from "react";
import { NFTContext } from "../../context/NFTContex";
import { Button } from "../index";

interface Props {
  onClick: () => void;
}

const ButtonGroup = ({ onClick }: Props) => {
  const { currentAccount, connectWallet } = useContext(NFTContext)

  return currentAccount ? (
    <Button className="mx-2 rounded-xl" onClick={onClick}>
      Create
    </Button>
  ) : (
    <Button className="mx-2 rounded-xl" onClick={connectWallet}>
      Connect
    </Button>
  );
};

export default ButtonGroup;

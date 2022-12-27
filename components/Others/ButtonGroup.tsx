import React from "react";
import { Button } from "../index";

interface Props {
  onClick: () => void;
}

const ButtonGroup = ({ onClick }: Props) => {
  const hasConnected = false;

  return hasConnected ? (
    <Button className="mx-2 rounded-xl" onClick={onClick}>
      Create
    </Button>
  ) : (
    <Button className="mx-2 rounded-xl" onClick={onClick}>
      Connect
    </Button>
  );
};

export default ButtonGroup;

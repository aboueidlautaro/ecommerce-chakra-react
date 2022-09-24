import { Button } from "@chakra-ui/react";
import React from "react";
import configColorChakra from "../services/configColorChakra";

function ButtonPrimary(props) {
  const { buttonPrimary, primaryHover } = configColorChakra;
  return (
    <Button
      _hover={{
        bg: primaryHover,
      }}
      bg={buttonPrimary}
      onClick={props.onClick}
      type={props.type}
    >
      {props.content}
    </Button>
  );
}

export default ButtonPrimary;

import { Button } from "@chakra-ui/react";
import React from "react";
import configColorChakra from "../services/configColorChakra";

function ButtonSecondary(props) {
  const { buttonSecondary, borders } = configColorChakra;
  return (
    <Button
      _hover={{
        bg: borders,
      }}
      bg={buttonSecondary}
      onClick={props.onClick}
      type={props.type}
    >
      {props.content}
    </Button>
  );
}

export default ButtonSecondary;

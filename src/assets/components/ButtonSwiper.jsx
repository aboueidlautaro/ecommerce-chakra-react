import { Text } from "@chakra-ui/react";
import React from "react";
import configColorChakra from "../services/configColorChakra";

function ButtonSwiper(props) {
  const { buttonSlider } = configColorChakra;
  return (
    <Text
      cursor={"pointer"}
      color={buttonSlider}
      _hover={{
        bg: "transparent",
      }}
      _focus={{
        bg: "transparent",
      }}
      bg="transparent"
      onClick={props.onClick}
      fontSize={30}
    >
      {props.content}
    </Text>
  );
}

export default ButtonSwiper;

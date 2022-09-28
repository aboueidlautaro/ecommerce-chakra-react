import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import image from "../static/images/404.svg";

function NotFound() {
  return (
    <>
      <Flex
        h={{
          base: "82vh",
          md: "91vh",
        }}
        maxW={600}
        minW={300}
        margin="auto"
      >
        <Image w="100%" opacity={0.8} src={image} />
      </Flex>
    </>
  );
}

export default NotFound;

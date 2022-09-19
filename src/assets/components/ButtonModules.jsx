import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function ButtonModules(props) {
  return (
    <Link to={props.to}>
      <Button
        h={60}
        w={60}
        color={"blackAlpha.600"}
        fontWeight={"700"}
        p={5}
        bg={"#F4BB03"}
        _hover={{ bg: "#F4CB03", color: "blackAlpha.700" }}
      >
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Box fontSize={50} color={"gray.900"}>
            {props.icon}
          </Box>
          <Box>{props.name}</Box>
        </Flex>
      </Button>
    </Link>
  );
}

export default ButtonModules;

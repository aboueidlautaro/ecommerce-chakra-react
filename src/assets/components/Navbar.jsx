import { Button } from "@chakra-ui/button";
import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box h={20} bg="#000" w="full">
      <Flex
        h="full"
        color="white"
        w="full"
        justify="space-between"
        align="center"
        px={10}
      >
        <Box>Logo</Box>
        <Flex gap={5}>
          <Link to="/">INICIO</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/createarticle">CREAR ARTÍCULO</Link>
        </Flex>
        <Button color="black">Boton</Button>
      </Flex>
    </Box>
  );
}

export default Navbar;

import { Center, Flex } from "@chakra-ui/layout";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import configColorChakra from "../services/configColorChakra";
import { Link } from "react-router-dom";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { primary, secondary, primaryLight, primaryDark, secondaryHover } =
    configColorChakra;
  return (
    <Center h={20} bg={primary} w="full">
      <Flex
        h="full"
        color={secondary}
        w="90%"
        justify="space-between"
        align="center"
        px={10}
      >
        <Center w={"15%"}>
          <span>LOGO</span>
        </Center>
        <Center w={"45%"}>
          <InputGroup>
            <Input
              color={secondaryHover}
              border={"none"}
              _focus={{
                ring: "none",
                outline: "none",
                borderColor: primaryDark,
              }}
              textAlign="left"
              _placeholder={{
                fontWeight: "semibold",
                color: primaryDark,
                paddingLeft: "10px",
              }}
              bg={primaryLight}
              placeholder="Buscar artículo"
            />
            <InputRightElement children={<IoSearchSharp />} />
          </InputGroup>
        </Center>
        <Center
          display={{
            base: "none",
            md: "flex",
          }}
          w={"40%"}
          fontWeight={"semibold"}
          gap={3}
        >
          <Link to="/login">Ingresar</Link>
          <Link to="/register">Crear cuenta</Link>
          <Button
            ref={btnRef}
            p={0}
            _hover={{ bg: "transparent" }}
            bg={"transparent"}
            onClick={onOpen}
            fontSize="2xl"
          >
            <MdOutlineShoppingCart />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Carrito de compras</DrawerHeader>
              <DrawerBody>
                <Input placeholder="Type here..." />
              </DrawerBody>
              <DrawerFooter justifyContent={"center"} gap={3}>
                <ButtonSecondary
                  content="Seguir comprando"
                  mr={3}
                  onClick={onClose}
                />
                <ButtonPrimary content="Ir a pagar" />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Center>
      </Flex>
    </Center>
  );
}

export default Navbar;

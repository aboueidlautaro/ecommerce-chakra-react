import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";

function BuyCartDrawer(props) {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={props.finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Carrito de compras</DrawerHeader>
        <DrawerBody>
          <Input placeholder="Type here..." />
          <Input placeholder="Type here..." />
          <Input placeholder="Type here..." />
          <Input placeholder="Type here..." />
          <Input placeholder="Type here..." />
          <Input placeholder="Type here..." />
          <Input placeholder="Type here..." />
        </DrawerBody>
        <DrawerFooter justifyContent={"center"} gap={3}>
          <ButtonSecondary
            content="Seguir comprando"
            mr={3}
            onClick={props.onClick}
          />
          <ButtonPrimary content={props.content} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default BuyCartDrawer;

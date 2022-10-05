import { Button, Flex } from "@chakra-ui/react";
import React from "react";

function ButtonsEditProfile(props) {
  return (
    <Flex marginTop={4} justifyContent={"right"} gap={2}>
      <Button
        variant={"solid"}
        colorScheme={"yellow"}
        size={"sm"}
        type="submit"
      >
        Guardar
      </Button>
      <Button
        variant={"solid"}
        colorScheme={"red"}
        size={"sm"}
        onClick={props.onClick}
      >
        Cancelar
      </Button>
    </Flex>
  );
}

export default ButtonsEditProfile;

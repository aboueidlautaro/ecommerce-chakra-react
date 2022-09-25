import { Center } from "@chakra-ui/react";
import React from "react";

function TitleHomeSliders(props) {
  return (
    <Center marginTop={10} fontSize={24} fontWeight={400}>
      {props.content}
    </Center>
  );
}

export default TitleHomeSliders;

import { Flex, Skeleton, Text } from "@chakra-ui/react";
import React from "react";

function InfoCardProfile(props, stateInfo = []) {
  return (
    <Skeleton isLoaded={props.isLoaded}>
      <Flex marginTop={3}>
        <Text fontWeight={500}>{props.title}</Text>
        <Text fontWeight={400} marginLeft="20px">
          {props.stateInfo ? props.info : "No hay datos cargados"}
        </Text>
      </Flex>
    </Skeleton>
  );
}

export default InfoCardProfile;

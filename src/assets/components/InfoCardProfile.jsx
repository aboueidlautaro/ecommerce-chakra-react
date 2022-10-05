import { Flex, Skeleton, Text } from "@chakra-ui/react";
import { Field } from "formik";
import React from "react";

function InfoCardProfile(props) {
  return (
    <Skeleton isLoaded={props.isLoaded}>
      <Flex alignItems="center" gap={6} marginTop={3}>
        <Text fontWeight={500}>{props.title}</Text>
        {props.clickEditAccountInfo ? (
          <Field name={props.name} placeholder={props.info} />
        ) : (
          <Text fontWeight={400} marginLeft="20px">
            {props.info ? props.info : "Sin datos cargados"}
          </Text>
        )}
      </Flex>
    </Skeleton>
  );
}

export default InfoCardProfile;

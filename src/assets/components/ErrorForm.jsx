import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Box, Text } from "@chakra-ui/layout";
import { ErrorMessage } from "formik";
import React from "react";

function ErrorForm(props) {
  return (
    <Box
      color={"red.800"}
      fontSize={"14px"}
      p="0px 10px"
      bg="red.100"
      rounded="md"
    >
      <ErrorMessage name={props.name} />
    </Box>
  );
}

export default ErrorForm;

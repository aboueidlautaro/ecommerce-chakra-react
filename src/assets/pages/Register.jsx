import { Box } from "@chakra-ui/react";
import React from "react";
import CreateUser from "../modules/CreateUser";

function Register() {
  return (
    <>
      <Box bg={"#f7fafc"}>
        <CreateUser />
      </Box>
    </>
  );
}

export default Register;

import { Box, Button, CircularProgress, Flex, Text } from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";
import axios from "axios";

function Login() {
  const { loginUser } = config;
  //initialize navigate
  const navigate = useNavigate();

  // initial values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // functions
  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/");
  };

  // states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // form submit
  const login = (data) => {
    setLoading(true);
    data = {
      username: username,
      password: password,
    };
    console.log("Form data", data);
    axios
      .post(loginUser, data)
      .then((response) => {
        setMessage("");
        setError(false);
        sessionStorage.setItem("accessToken", response.data);
        navigate("/");
      })
      .catch((error) => {
        setMessage(error.response.data.message);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Box bg={"#f7fafc"} w={"100vw"} margin={"auto"}>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection={"column"}
        >
          <Box
            borderRadius={8}
            boxShadow="lg"
            h="auto"
            minHeight={"400px"}
            display={"flex"}
            gap={4}
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
            maxWidth={"500px"}
            w={"100%"}
            marginTop={"60px"}
            bg={"white"}
          >
            <Flex alignItems={"center"} flexDirection={"column"}>
              <Text color={"gray.700"} fontSize="2xl" fontWeight="bold">
                Iniciar sesión
              </Text>
              <Text textAlign={"center"} fontSize={"sm"}>
                Para iniciar sesión ingrese sus datos
              </Text>
              <Link className="link-user" to="/login">
                No tengo cuenta
              </Link>
            </Flex>

            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name="username"
              placeholder="Usuario"
            />

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              placeholder="Contraseña"
              type="password"
            />

            {error ? (
              <Text as="b" rounded={2} bg="red.300">
                {message}
              </Text>
            ) : (
              <Text p="0px 10px" as="b" rounded={2} bg="green.300">
                {message}
              </Text>
            )}

            <Flex gap={4}>
              <Button
                _hover={{ bg: "gray.500" }}
                onClick={cancelForm}
                bg="gray.400"
              >
                Volver
              </Button>
              <Button
                _hover={{ bg: "yellow.500" }}
                onClick={login}
                bg="yellow.400"
              >
                {loading ? (
                  <CircularProgress
                    thickness="5px"
                    isIndeterminate
                    color="#2D3748"
                    trackColor="transparent"
                    size={5}
                  />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export default Login;

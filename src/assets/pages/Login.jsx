import { Box, CircularProgress, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  // authState context
  const { setAuthState } = useContext(AuthContext);

  // config global
  const { loginUser } = config;
  //initialize navigate
  const navigate = useNavigate();

  // initial values
  const initialValues = {
    username: "",
    password: "",
  };

  // functions
  const cancelForm = () => {
    navigate("/");
  };

  // states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // form submit
  const login = (data) => {
    setLoading(true);

    try {
      axios.post(loginUser, data).then((response) => {
        setError(false);
        setMessage("");
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          name: response.data.name,
          id: response.data.id,
          user_role: response.data.user_role,
          status: true,
        });
        navigate("/");
      });
    } catch (error) {
      setError(true);
      setMessage("Usuario o contraseña incorrectos");
      setLoading(false);
    }
  };

  // validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Introduzca un nombre de usuario"),
    password: Yup.string().required("Introduzca una contraseña"),
  });

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
              <Link className="link-user" to="/register">
                No tengo cuenta
              </Link>
            </Flex>

            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={login}
            >
              <Form id="form">
                <Flex
                  marginTop={"12px"}
                  gap={4}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Field name="username" placeholder="Usuario" />
                  <ErrorForm name="username" />

                  <Field
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                  />
                  <ErrorForm name="password" />
                </Flex>

                {error ? (
                  <Text as="b" rounded={2} bg="red.300">
                    {message}
                  </Text>
                ) : (
                  <Text p="0px 10px" as="b" rounded={2} bg="green.300">
                    {message}
                  </Text>
                )}

                <Flex
                  justifyContent={"space-evenly"}
                  marginTop={"22px"}
                  gap={4}
                >
                  <ButtonSecondary onClick={cancelForm} content="Volver" />

                  <ButtonPrimary
                    type="submit"
                    content={
                      loading ? (
                        <CircularProgress
                          thickness="5px"
                          isIndeterminate
                          color="#2D3748"
                          trackColor="transparent"
                          size={5}
                        />
                      ) : (
                        "Iniciar sesión"
                      )
                    }
                  />
                </Flex>
              </Form>
            </Formik>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
export default Login;

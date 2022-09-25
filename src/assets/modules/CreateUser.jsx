import { Box, Button, CircularProgress, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";

function CreateUser() {
  const { createUser } = config;

  // regex for password validation at least 1 uppercase
  const regexUpper = /^(?=.*[A-Z])/;
  // regex for password validation at least 1 lowercase
  const regexLower = /^(?=.*[a-z])/;
  // regex for password validation at least 1 number
  const regexNumber = /^(?=.*[0-9])/;
  // regex for password validation at least 1 special character
  const regexSpecial = /^(?=.*[!@#$%^&*])/;

  //initialize navigate
  const navigate = useNavigate();

  // initial values
  const initialValues = {
    name: "",
    username: "",
    password: "",
  };

  // functions
  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/login");
  };

  // states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // form validation
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Ingrese un nombre")
      .matches(/^[aA-zZ\s]+$/, "Solo puede contener letras"),
    username: Yup.string()
      .required("El usuario es obligatorio")
      .min(4, "El usuario debe tener al menos 4 caracteres")
      .max(30, "El usuario debe tener máximo 15 caracteres"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .matches(
        regexUpper,
        "La contraseña debe tener al menos una letra mayúscula"
      )
      .matches(
        regexLower,
        "La contraseña debe tener al menos una letra minúscula"
      )
      .matches(regexNumber, "La contraseña debe tener al menos un número")
      .matches(
        regexSpecial,
        "La contraseña debe tener al menos un caracter especial"
      ),
  });

  // form submit
  const onSubmit = (data) => {
    setLoading(true);

    axios
      .post(createUser, data)
      .then((response) => {
        setMessage("Cuenta creada con éxito");
        setError(false);
        setLoading(false);
      })
      .catch((error) => {
        setMessage("Pruebe con otro usuario o intente nuevamente más tarde");
        setError(true);
        setLoading(false);
      });
  };

  return (
    <Box bg={"#f7fafc"} w={"90vw"} margin={"auto"}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form id="form">
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
          >
            <Box
              borderRadius={8}
              boxShadow="lg"
              h="auto"
              minHeight={"500px"}
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
                  Registrarse
                </Text>
                <Text textAlign={"center"} fontSize={"sm"}>
                  Para empezar a registrarse ingrese sus datos
                </Text>
                <Link className="link-user" to="/login">
                  Ya tengo cuenta
                </Link>
              </Flex>
              <Field
                className="inputform"
                name="name"
                placeholder="Nombre completo"
              />
              <ErrorForm name="name" />

              <Field name="username" placeholder="Usuario" />
              <ErrorForm name="username" />

              <Field name="password" placeholder="Contraseña" type="password" />
              <ErrorForm name="password" />

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
                  type="submit"
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
                    "Registrarse"
                  )}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
}

export default CreateUser;

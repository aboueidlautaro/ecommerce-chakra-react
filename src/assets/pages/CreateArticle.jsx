import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import * as Yup from "yup";
import ErrorForm from "../components/ErrorForm";

import config from "../services/config";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  //initial values
  const { createArticle } = config;
  const initialValues = {
    title: "",
    shortDescription: "",
    description: "",
    username: "",
    image: "",
  };
  //initialize navigate
  let navigate = useNavigate();

  //states
  const [message, setMessage] = useState("");
  const [error, setError] = useState(true);

  //functions

  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/");
  };

  const onSubmit = (data, setSend) => {
    const form = document.getElementById("form");
    try {
      axios
        .post(createArticle, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          setError(false);
          setMessage("Artículo creado correctamente");
          form.reset();
        });
    } catch (error) {
      setError(true);
      setMessage("Error al crear el artículo");
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Introduzca un título"),
    shortDescription: Yup.string().required("Introduzca una descripción corta"),
    description: Yup.string().required(
      "Introduzca una descripción más extensa"
    ),
    username: Yup.string().required("El usuario es obligatorio"),
  });

  return (
    <>
      <Box m={20}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form id="form">
            <Flex
              gap={4}
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              <Text as="b" fontSize="xl">
                Título:{" "}
              </Text>
              <Field name="title" placeholder="Título del artículo" />
              <ErrorForm name="title" />
              <Text as="b" fontSize="xl">
                Descripción corta:{" "}
              </Text>
              <Field name="shortDescription" placeholder="Descripción corta" />
              <ErrorForm name="shortDescription" />
              <Text as="b" fontSize="xl">
                Descripción completa:{" "}
              </Text>
              <Field
                name="description"
                placeholder="Descripción completa del artículo"
                as="textarea"
                rows={5}
                cols={50}
              />

              <ErrorForm name="description" />

              <Text as="b" fontSize="xl">
                Imagen:{" "}
              </Text>
              <input
                onChange={(event) => {
                  initialValues.image = event.target.files[0];
                  console.log(event.target.files[0]);
                }}
                id="image"
                type="file"
                name="image"
              />

              <Text as="b" fontSize="xl">
                Usuario:{" "}
              </Text>
              <Field name="username" placeholder="Ingresa tu usuario" />
              <ErrorForm name="username" />
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
                  Cancelar
                </Button>
                <Button
                  _hover={{ bg: "yellow.500" }}
                  type="submit"
                  bg="yellow.400"
                >
                  Confirmar
                </Button>
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </>
  );
}

export default CreateArticle;

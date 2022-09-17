import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";

function CreateCategory() {
  //initial values
  const { createCategory } = config;

  const initialValues = {
    name: "",
  };
  //initialize navigate
  let navigate = useNavigate();

  //states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");

  //functions

  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/create");
  };

  const onSubmit = (data) => {
    const form = document.getElementById("form");

    try {
      axios.post(createCategory, data).then((response) => {
        setError(false);
        setMessage("Categoría creada correctamente");
        form.reset();
      });
    } catch (error) {
      setError(true);
      setMessage("Error al crear la categoría");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Introduzca un nombre para la categoría"),
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
                Nombre de la categoría:{" "}
              </Text>
              <Field name="name" placeholder="Ingresar categoría" />
              <ErrorForm name="name" />

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

export default CreateCategory;

import { Box, Button, CircularProgress, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";

function CreateTag() {
  //initial values
  const { createTag } = config;

  const initialValues = {
    name: "",
  };
  //initialize navigate
  let navigate = useNavigate();

  //states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  //functions

  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/create");
  };

  const onSubmit = (data) => {
    setLoading(true);
    const form = document.getElementById("form");

    try {
      axios.post(createTag, data).then((response) => {
        setError(false);
        setMessage("Tag creado correctamente");
        setLoading(false);
        form.reset();
      });
    } catch (error) {
      setLoading(false);
      setError(true);
      setMessage("Error al crear el tag");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Introduzca un nombre para el tag"),
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
                Nombre del tag:{" "}
              </Text>
              <Field name="name" placeholder="Ingresar tag" />
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
                  {loading ? (
                    <CircularProgress
                      thickness="5px"
                      isIndeterminate
                      color="#2D3748"
                      trackColor="transparent"
                      size={5}
                    />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </>
  );
}

export default CreateTag;

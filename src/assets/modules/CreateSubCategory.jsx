import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";
import { useEffect } from "react";

function CreateSubCategory() {
  //initial values
  const { createSubCategory, allCategories } = config;

  const initialValues = {
    name: "",
    categoryId: 0,
  };
  //initialize navigate
  let navigate = useNavigate();

  //states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  //functions
  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/create");
  };

  const onSubmit = (data) => {
    const form = document.getElementById("form");

    try {
      axios.post(createSubCategory, data).then((response) => {
        setError(false);
        setMessage("Subcategoría creada correctamente");
        form.reset();
      });
    } catch (error) {
      setError(true);
      setMessage("Error al crear la subcategoría");
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Introduzca un nombre para la subcategoría"),
    categoryId: Yup.string().required("Seleccione una categoría"),
  });

  useEffect(() => {
    axios.get(allCategories).then((response) => {
      setCategories(response.data);
    });
  }, []);

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
                Nombre de la sub categoría:{" "}
              </Text>
              <Field name="name" placeholder="Ingresar sub categoría" />
              <ErrorForm name="name" />

              <Text as="b" fontSize="xl">
                Categoría:{" "}
              </Text>
              <Field
                as="select"
                name="categoryId"
                placeholder="Ingresar categoría"
              >
                <option name="categoryId" value="initial">
                  Seleccione una categoría
                </option>
                {categories.map((category) => {
                  return (
                    <option
                      name="categoryId"
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </Field>
              <ErrorForm name="categoryId" />

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

export default CreateSubCategory;

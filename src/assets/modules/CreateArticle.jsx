import { Button } from "@chakra-ui/button";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Field, Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import ErrorForm from "../components/ErrorForm";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../services/config";
import { CircularProgress } from "@chakra-ui/react";

function CreateArticle() {
  //initial values
  const { createArticle, allSubCategories } = config;

  const initialValues = {
    title: "",
    shortDescription: "",
    description: "",
    tag: "",
    price: "",
    image: "",
  };
  //initialize navigate
  let navigate = useNavigate();

  //states
  const [message, setMessage] = useState("");
  const [error, setError] = useState(true);
  const [image, setImage] = useState({ preview: "", data: "" });
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  //functions

  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/create");
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };
  console.log(image.data);
  const onSubmit = (data) => {
    setLoading(true);
    const form = document.getElementById("form");
    const formData = new FormData(form);
    formData.append("image", image.data);
    formData.append("data", data);

    try {
      axios
        .post(createArticle, formData, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setError(false);
          setMessage("Artículo creado correctamente");
          form.reset();
          setLoading(false);
        });
    } catch (error) {
      setError(true);
      setMessage("Error al crear el artículo");
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Introduzca un título"),
    shortDescription: Yup.string().required("Introduzca una descripción corta"),
    description: Yup.string().required(
      "Introduzca una descripción más extensa"
    ),
    tag: Yup.string().required("Introduzca una etiqueta"),
    price: Yup.number()
      .typeError("Sólo números")
      .integer("Sólo números enteros")
      .required("Introduzca un precio")
      .min(1, "El precio debe ser mayor que 0"),
  });

  useEffect(() => {
    axios.get(allSubCategories).then((response) => {
      setSubCategories(response.data);
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
                Etiqueta de artículo:{" "}
              </Text>
              <Field name="tag" placeholder="Introduzca la etiqueta" />
              <ErrorForm name="tag" />

              <Text as="b" fontSize="xl">
                Precio:{" "}
              </Text>
              <Field
                type="number"
                name="price"
                placeholder="Introduzca el precio"
              />
              <ErrorForm name="price" />

              <Text as="b" fontSize="xl">
                Imagen:{" "}
              </Text>
              {image.preview && (
                <img src={image.preview} width="100" height="100" />
              )}
              <Field
                onChange={handleFileChange}
                id="image"
                type="file"
                name="image"
              />
              <ErrorForm name="image" />

              <Text as="b" fontSize="xl">
                Subcategoría del artículo:{" "}
              </Text>
              <Field
                as="select"
                name="SubCategoryId"
                placeholder="Subcategoría"
              >
                <option value="">Seleccione una subcategoría</option>
                {subCategories.map((subcategory) => {
                  return (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  );
                })}
              </Field>

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

export default CreateArticle;

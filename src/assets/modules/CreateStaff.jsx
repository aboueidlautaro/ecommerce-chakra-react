import { Box, Button, CircularProgress, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorForm from "../components/ErrorForm";
import config from "../services/config";
import { useEffect } from "react";

function CreateStaff() {
  //initial values
  const { usersList, createStaff, allRoles } = config;

  const initialValues = {
    user_role: "",
    username: "",
  };
  //initialize navigate
  let navigate = useNavigate();

  //states
  const [error, setError] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  //functions

  const cancelForm = () => {
    const form = document.getElementById("form");
    form.reset();
    navigate("/create");
  };

  const onSubmit = (data) => {
    setLoading(true);

    try {
      axios.put(createStaff, data).then((response) => {
        setError(false);
        setMessage("Rol asignado correctamente");
        setLoading(false);
      });
    } catch (error) {
      setError(true);
      setMessage("Error al asignar rol");
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(usersList)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(allRoles).then((response) => {
      setRoles(response.data);
    });
  }, []);

  return (
    <>
      <Box m={20}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form id="form">
            <Flex
              gap={4}
              justifyContent="center"
              alignItems="center"
              flexDirection={"column"}
            >
              <Text as="b" fontSize="xl">
                Usuario a editar:{" "}
              </Text>
              <Field as="select" name="user_role" placeholder="Rol de usuario">
                <option value="">Seleccione un rol</option>
                {roles.map((role) => {
                  return (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  );
                })}
              </Field>

              <Text as="b" fontSize="xl">
                Usuario a editar:{" "}
              </Text>
              <Field as="select" name="username" placeholder="Rol de usuario">
                <option value="">Seleccione un usuario</option>
                {users.map((user) => {
                  return (
                    <option key={user.username} value={user.username}>
                      @{user.username} - {user.name}
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

export default CreateStaff;

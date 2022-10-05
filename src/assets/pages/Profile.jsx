import {
  Badge,
  Box,
  Button,
  Collapse,
  Flex,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import ButtonsEditProfile from "../components/ButtonsEditProfile";
import InfoCardProfile from "../components/InfoCardProfile";
import { AuthContext } from "../contexts/AuthContext";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";

function Profile() {
  // config global
  const { background } = configColorChakra;
  //params
  const { username } = useParams();
  //context
  const { authState, setAuthState } = useContext(AuthContext);
  //states

  const [error, setError] = useState(false);

  const [messageUpdate, setMessageUpdate] = useState("");

  const [user, setUser] = useState({});
  const userr = user;
  const [loading, setLoading] = useState(false);

  const [accountInfo, setAccountInfo] = useState(false);
  const [addressInfo, setAddressInfo] = useState(false);
  const [ordersInfo, setOrdersInfo] = useState(false);

  const [clickEditAccountInfo, setClickEditAccountInfo] = useState(false);
  const [clickEditAddressInfo, setClickEditAddressInfo] = useState(false);

  const handleAccountInfo = () => setAccountInfo(!accountInfo);
  const handleAddressInfo = () => setAddressInfo(!addressInfo);
  const handleOrdersInfo = () => setOrdersInfo(!ordersInfo);

  // global config
  const { domain, getUserInfo, updateAccountInfo } = config;

  //functions
  const handleClickEditAccountInfo = () => {
    setClickEditAccountInfo(!clickEditAccountInfo);
  };

  const handleClickEditAddressInfo = () => {
    setClickEditAddressInfo(!clickEditAddressInfo);
  };

  const updateAccountInfoData = (data) => {
    axios
      .put(updateAccountInfo, data, {
        headers: {
          accessToken: window.localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setClickEditAccountInfo(false);
        setError(false);
        setAuthState(...authState, ...response.data);
      })
      .catch((error) => {
        setMessageUpdate("Error al actualizar los datos");
        setError(true);
      });
  };

  //useEffect
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${getUserInfo}/${username}`, {
        headers: {
          accessToken: window.localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        error;
        setLoading(false);
      });
  }, []);

  //validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(5, "Minimo 5 caracteres"),
    email: Yup.string().email("Introduzca un email valido"),
    phone: Yup.number()
      .typeError("Sólo números")
      .min(10, "Introduzca un formato de número válido"),
    dni: Yup.number()
      .typeError("Sólo números")
      .integer("Introduzca un formato de DNI válido")
      .min(7, "Introduzca un formato de DNI válido"),
  });

  return (
    <>
      <Box bg={background}>
        <Flex
          marginTop={20}
          margin="auto"
          justifyContent="space-between"
          h={{
            base: "auto",
            md: "auto",
          }}
          w={"80%"}
          flexDirection={{
            base: "column",
            md: "row",
          }}
        >
          <Flex
            h={"auto"}
            w={{
              base: "100%",
              md: "30%",
            }}
            alignItems="center"
            flexDirection={"column"}
          >
            <Box
              marginTop={"60px"}
              textAlign={"center"}
              width="200px"
              height="auto"
            >
              <Skeleton
                h="200px"
                w="200px"
                borderRadius={10}
                isLoaded={!loading}
              >
                {userr.image !== null ? (
                  <Image
                    objectFit="cover"
                    borderRadius={10}
                    w="100%"
                    h="100%"
                    src={`${domain}/uploads/${user.image}`}
                  />
                ) : (
                  <Image
                    objectFit="cover"
                    borderRadius={10}
                    w="100%"
                    h="100%"
                    src={`https://ui-avatars.com/api/?background=random&name=${userr.name}&size=128`}
                  />
                )}
              </Skeleton>
              <Skeleton
                marginTop={4}
                h={"auto"}
                borderRadius={15}
                isLoaded={!loading}
              >
                <Text
                  as="span"
                  color={"blackAlpha.700"}
                  fontSize={20}
                  fontWeight={800}
                >
                  {user.name}
                </Text>
              </Skeleton>
              <Skeleton borderRadius={15} isLoaded={!loading}>
                <Text
                  as="span"
                  color={"blackAlpha.700"}
                  fontSize={14}
                  fontWeight={500}
                >
                  @{user.username}
                </Text>
              </Skeleton>
            </Box>
          </Flex>
          <Flex
            h={{
              base: "auto",
              md: "full",
            }}
            w={{ base: "100%", md: "68%" }}
            flexDirection="column"
          >
            {/* SECCION DATOS PERSONALES */}
            <Box
              p="30px"
              marginTop="60px"
              minH="200px"
              h="auto"
              borderRadius="8px"
              w="100%"
              boxShadow=" 0px 3px 15px -3px rgba(0,0,0,0.15)"
            >
              <Flex justifyContent={"space-between"}>
                <Text as="h3" fontWeight={800} opacity="0.6" fontSize="22px">
                  Mis datos
                </Text>
                <Button onClick={handleAccountInfo} size={"sm"}>
                  Ver más
                </Button>
              </Flex>
              <Formik
                initialValues={{
                  name: userr.name,
                  email: userr.email,
                  dni: userr.dni,
                  phone: userr.phone,
                }}
                onSubmit={updateAccountInfoData}
                validationSchema={validationSchema}
              >
                <Form id="formAccountInfo">
                  <InfoCardProfile
                    info={user.name}
                    title="Nombre"
                    isLoaded={!loading}
                    isClickEdit={clickEditAccountInfo}
                    name="name"
                    clickEditAccountInfo={clickEditAccountInfo}
                  />
                  <Flex paddingX={36} marginY={3} justifyContent="left">
                    <Badge colorScheme="red">
                      <ErrorMessage name="name" />
                    </Badge>
                  </Flex>

                  <InfoCardProfile
                    info={user.email}
                    title="Email"
                    isLoaded={!loading}
                    isClickEdit={clickEditAccountInfo}
                    name="email"
                    clickEditAccountInfo={clickEditAccountInfo}
                  />
                  <Flex paddingX={36} marginY={3} justifyContent="left">
                    <Badge colorScheme="red">
                      <ErrorMessage name="email" />
                    </Badge>
                  </Flex>

                  <InfoCardProfile
                    info={user.phone}
                    title="Teléfono"
                    isLoaded={!loading}
                    isClickEdit={clickEditAccountInfo}
                    name="phone"
                    clickEditAccountInfo={clickEditAccountInfo}
                  />
                  <Flex paddingX={36} justifyContent="left" marginTop={3}>
                    <Badge colorScheme="red">
                      <ErrorMessage name="phone" />
                    </Badge>
                  </Flex>

                  <Collapse in={accountInfo} animateOpacity>
                    <InfoCardProfile
                      info={user.dni}
                      title="DNI"
                      isLoaded={!loading}
                      isClickEdit={clickEditAccountInfo}
                      name="dni"
                      clickEditAccountInfo={clickEditAccountInfo}
                    />
                    <Flex paddingX={36} marginY={3} justifyContent="left">
                      <Badge colorScheme="red">
                        <ErrorMessage name="dni" />
                      </Badge>
                    </Flex>
                    {clickEditAccountInfo ? (
                      <ButtonsEditProfile
                        onClick={handleClickEditAccountInfo}
                      />
                    ) : (
                      <Button
                        variant={"solid"}
                        colorScheme={"yellow"}
                        size={"sm"}
                        onClick={handleClickEditAccountInfo}
                        float={"right"}
                      >
                        Editar
                      </Button>
                    )}
                  </Collapse>
                </Form>
              </Formik>
            </Box>
            {/* SECCION COMPRAS */}
            <Box
              p="30px"
              marginTop="60px"
              minH="200px"
              h="auto"
              borderRadius="8px"
              w="100%"
              boxShadow=" 0px 3px 15px -3px rgba(0,0,0,0.15)"
            >
              <Flex justifyContent={"space-between"}>
                <Text as="h3" fontWeight={800} opacity="0.6" fontSize="22px">
                  Mis compras
                </Text>
                <Button onClick={handleAddressInfo} size={"sm"}>
                  Ver más
                </Button>
              </Flex>

              <InfoCardProfile
                info={user.name}
                title="Nombre"
                isLoaded={!loading}
              />

              <InfoCardProfile
                info={user.name}
                title="Email"
                isLoaded={!loading}
              />

              <InfoCardProfile
                info={user.name}
                title="Teléfono"
                isLoaded={!loading}
              />

              <Collapse in={addressInfo} animateOpacity>
                <InfoCardProfile
                  info={user.name}
                  title="Contraseña"
                  isLoaded={!loading}
                />
              </Collapse>
            </Box>
            {/* SECCION DIRECCIONES */}
            <Box
              p="30px"
              marginTop="60px"
              minH="200px"
              h="auto"
              borderRadius="8px"
              w="100%"
              boxShadow=" 0px 3px 15px -3px rgba(0,0,0,0.15)"
            >
              <Flex justifyContent={"space-between"}>
                <Text as="h3" fontWeight={800} opacity="0.6" fontSize="22px">
                  Mis direcciones
                </Text>
                <Button onClick={handleOrdersInfo} size={"sm"}>
                  Ver más
                </Button>
              </Flex>

              <InfoCardProfile
                info={user.name}
                title="Nombre"
                isLoaded={!loading}
              />

              <InfoCardProfile
                info={user.name}
                title="Email"
                isLoaded={!loading}
              />

              <InfoCardProfile
                info={user.name}
                title="Teléfono"
                isLoaded={!loading}
              />

              <Collapse in={ordersInfo} animateOpacity>
                <InfoCardProfile
                  info={user.name}
                  title="Contraseña"
                  isLoaded={!loading}
                />
              </Collapse>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Profile;

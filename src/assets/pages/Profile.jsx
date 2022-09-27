import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Collapse,
  Fade,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfoCardProfile from "../components/InfoCardProfile";
import { AuthContext } from "../contexts/AuthContext";
import config from "../services/config";

function Profile() {
  //params
  const { username } = useParams();
  //context
  const { authState } = useContext(AuthContext);

  //states
  const user2 = "";
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [accountInfo, setAccountInfo] = useState(false);
  const [addressInfo, setAddressInfo] = useState(false);
  const [ordersInfo, setOrdersInfo] = useState(false);

  const handleAccountInfo = () => setAccountInfo(!accountInfo);
  const handleAddressInfo = () => setAddressInfo(!addressInfo);
  const handleOrdersInfo = () => setOrdersInfo(!ordersInfo);

  // global config
  const { domain, getUserInfo } = config;

  //functions
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${getUserInfo}/${username}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);
  //
  return (
    <>
      <Box>
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
              height="200px"
            >
              <Image
                boxShadow={"0px 5px 15px -3px rgba(0,0,0,0.65)"}
                objectFit="cover"
                borderRadius={10}
                w="100%"
                h="100%"
                src={`${domain}/uploads/${user.Image}`}
              />
              <Text as="span" fontSize={20} fontWeight={600}>
                {user.name}
              </Text>
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
              boxShadow=" 0px 3px 15px -3px rgba(0,0,0,0.45)"
            >
              <Flex justifyContent={"space-between"}>
                <Text as="h3" fontWeight={800} opacity="0.6" fontSize="22px">
                  Mis datos
                </Text>
                <Button onClick={handleAccountInfo} size={"sm"}>
                  Ver más
                </Button>
              </Flex>

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Nombre"
              />

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Email"
              />

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Teléfono"
              />

              <Collapse in={accountInfo} animateOpacity>
                <InfoCardProfile
                  stateInfo={user}
                  info={user.name}
                  title="Contraseña"
                />
              </Collapse>
            </Box>
            {/* SECCION COMPRAS */}
            <Box
              p="30px"
              marginTop="60px"
              minH="200px"
              h="auto"
              borderRadius="8px"
              w="100%"
              boxShadow=" 0px 3px 15px -3px rgba(0,0,0,0.45)"
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
                stateInfo={user}
                info={user.name}
                title="Nombre"
              />

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Email"
              />

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Teléfono"
              />

              <Collapse in={addressInfo} animateOpacity>
                <InfoCardProfile
                  stateInfo={user}
                  info={user.name}
                  title="Contraseña"
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
              boxShadow=" 0px 3px 15px -3px rgba(0,0,0,0.45)"
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
                stateInfo={user}
                info={user.name}
                title="Nombre"
              />

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Email"
              />

              <InfoCardProfile
                stateInfo={user}
                info={user.name}
                title="Teléfono"
              />

              <Collapse in={ordersInfo} animateOpacity>
                <InfoCardProfile
                  stateInfo={user}
                  info={user.name}
                  title="Contraseña"
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

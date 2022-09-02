import "../App.css";
import { NavLink } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import "../services/config";

import { Image, Box, Text, Flex } from "@chakra-ui/react";
import { Spacer } from "@chakra-ui/react";

const Navbar = () => {
  const fetchConfig = global.config.navbar.url;
  const urlFetchNavbar = fetchConfig;

  const [authState, setAuthState] = useState({
    username: "",
    autor: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get(urlFetchNavbar, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            user_role: response.data.user_role,
            favs: response.data.favs,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <>
      <header>
        <Box
          color="#fff"
          w="100%"
          display="flex"
          flexDirection="column"
          bg="#000"
          alignItems="center"
          justifyContent="center"
          h={20}
        >
          <Box
            display="flex"
            alignItems="center"
            w="100%"
            h="50%"
            justifyContent="space-between"
          >
            <Image src="https://i.imgur.com/1Q1ZQ2u.png" w={100} h={100} />
            <Text>menusito</Text>
          </Box>
          <Box display="flex" alignItems="center" h="50%">
            asd
          </Box>
        </Box>
      </header>
    </>
  );
};
export default Navbar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { Text, Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "@chakra-ui/react";

function Home() {
  const { domain, allArticles } = config;
  let navigate = useNavigate();
  const [listOfArticles, setListOfArticles] = useState([]);

  useEffect(() => {
    axios.get(allArticles).then((response) => {
      setListOfArticles(response.data);
    });
  }, []);

  return (
    <>
      <Box>
        <Text fontSize="4xl">Listado de artículos</Text>
      </Box>
      <button
        onClick={() => {
          navigate("/article/2");
        }}
      >
        CLICK
      </button>
    </>
  );
}
export default Home;

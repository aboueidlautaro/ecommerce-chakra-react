import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../services/config";
import { Text, Box, Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const { allArticles } = config;
  let navigate = useNavigate();
  const [listOfArticles, setListOfArticles] = useState([]);

  useEffect(() => {
    axios.get(allArticles).then((response) => {
      setListOfArticles(response.data);
    });
  }, []);

  return (
    <>
      <div>
        {listOfArticles.map((value) => {
          return (
            <Flex flexDirection={"column"} gap={10} key={value.id}>
              <Button
                padding={12}
                margin={2}
                onClick={() => {
                  navigate(`/article/${value.id}`);
                }}
              >
                <Flex gap={3} flexDirection={"column"}>
                  <Text as="p">{value.title}</Text>
                  <Text as="p">{value.shortDescription}</Text>
                </Flex>
              </Button>
            </Flex>
          );
        })}
      </div>
    </>
  );
}
export default Home;

import React from "react";
import Fav from "../components/Fav";
import { Link, Box, Skeleton, Text } from "@chakra-ui/react";

import "../services/config";

function Articles({ results = [], loading }) {
  return (
    <>
      {results.map((article) => (
        <Box
          color="#000"
          key={article.id}
          w="280px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Box
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                <Skeleton isLoaded={!loading}>
                  <Text m={1}>{article.title}</Text>
                </Skeleton>
                <Skeleton isLoaded={!loading}>
                  <Text m={1}>{article.description}</Text>
                </Skeleton>
                <Skeleton isLoaded={!loading}>
                  <Fav m={1} id={article.id} />
                </Skeleton>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default Articles;

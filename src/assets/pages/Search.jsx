import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../services/config";
import { Box, Button, Flex, Image, Skeleton, Text } from "@chakra-ui/react";
import CardArticle from "../components/CardArticle";
import configColorChakra from "../services/configColorChakra";
import { Link } from "react-router-dom";

function Search() {
  //states
  const [article, setArticle] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // config global
  const { background } = configColorChakra;
  const { articleByTitle, domain } = config;

  //params
  const { title } = useParams();

  //functions

  //useEffect
  useEffect(() => {
    axios.get(articleByTitle + title).then((response) => {
      if (response.status === 200) {
        setArticle(response.data);
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      } else {
        null;
      }

      setArticle(response.data);
    });
  }, []);

  return (
    <Box bg={background}>
      <Skeleton fadeDuration={1} borderRadius={6} w={255} isLoaded={isLoaded}>
        <CardArticle
          title={article.title}
          tag={article.tag}
          price={article.price}
          src={`${domain}/uploads/${article.image}`}
        />
      </Skeleton>
    </Box>
  );
}

export default Search;

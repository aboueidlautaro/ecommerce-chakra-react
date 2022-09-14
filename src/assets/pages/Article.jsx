import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../services/config";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

function Article() {
  const { articleById } = config;
  const { id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    axios.get(articleById + id).then((response) => {
      setArticle(response.data);
    });
  }, []);
  return (
    <>
      <Box>
        {article.title}, {article.image}, {article.id}, {article.description}
      </Box>
    </>
  );
}

export default Article;

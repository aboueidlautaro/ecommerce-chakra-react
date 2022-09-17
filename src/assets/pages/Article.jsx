import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../services/config";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

function Article() {
  const { articleById, domain } = config;
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
        {article.title}, {article.id}, {article.description}
        <Image src={`${domain}/uploads/${article.image}`} />
      </Box>
    </>
  );
}

export default Article;

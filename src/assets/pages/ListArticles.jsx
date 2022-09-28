import { Box, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardArticle from "../components/CardArticle";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";

function ListArticles() {
  //states
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // config global
  const { background } = configColorChakra;
  const { allArticles, domain } = config;

  //params
  const { search } = useParams();
  console.log(articles);
  //functions

  //useEffect
  useEffect(() => {
    axios.get(allArticles).then((response) => {
      if (response.status === 200) {
        setArticles(response.data);
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      } else {
        null;
      }
    });
  }, [search]);

  return (
    <Box bg={background}>
      {articles.map((article) => {
        return (
          <Skeleton
            key={article.id}
            fadeDuration={1}
            borderRadius={6}
            w={255}
            isLoaded={isLoaded}
          >
            <CardArticle
              title={article.title}
              tag={article.tag}
              price={article.price}
              src={`${domain}/uploads/${article.image}`}
            />
          </Skeleton>
        );
      })}
    </Box>
  );
}

export default ListArticles;

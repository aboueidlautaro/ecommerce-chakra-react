import { Box, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CardArticle from "../components/CardArticle";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";

function Search() {
  //states
  const [articles, setArticles] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  // config global
  const { background } = configColorChakra;
  const { searchArticle, domain } = config;

  // params
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");

  // functions

  //useEffect
  useEffect(() => {
    axios.get(`${searchArticle}${q}`).then((response) => {
      if (response.data.articles?.length > 0) {
        setArticles(response.data.articles);
        setIsLoaded(true);
        setError(false);
        setMessage("");
      } else {
        setMessage("No se encontraron articulos relacionados a su búsqueda");
        setError(true);
        setArticles([]);
        setIsLoaded(true);
      }
    });
  }, [q]);

  return (
    <>
      <Text>{error ? message : null}</Text>
      <Box>
        {articles.error === true ? (
          <h1>No hay artículos para su búsqueda</h1>
        ) : (
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
        )}
      </Box>
    </>
  );
}

export default Search;

import { Box, Skeleton } from "@chakra-ui/react";
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
      if (response.status === 200) {
        setArticles(response.data);
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      } else {
        null;
      }
    });
  }, [q]);

  return (
    <>
      <Box>
        {articles == "" ? (
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

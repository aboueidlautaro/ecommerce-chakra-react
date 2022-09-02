import React, { useState } from "react";
import { useEffect } from "react";
import "../services/config";
import Articles from "./Articles";
import "../services/config";
import { Box } from "@chakra-ui/react";

function FetchArticles({ status }) {
  const fetchConfig = global.config.all_articles.url;
  const urlFetchAllArticles = fetchConfig;

  const search = "";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("null");

  const results = articles;

  useEffect(() => {
    fetch(urlFetchAllArticles)
      .then((response) => response.json())
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
        setArticles(response.allArticles);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  }, [urlFetchAllArticles]);
  //
  return (
    <>
      <Box margin="auto" w="90%" display="flex" justifyContent="center">
        <Box
          w="100%"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={5}
        >
          <Articles results={results} loading={loading} />
        </Box>
      </Box>
    </>
  );
}
export default FetchArticles;

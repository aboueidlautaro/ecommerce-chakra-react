import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardArticle from "../components/CardArticle";
import Pagination from "../components/Pagination";
import Categories from "../modules/Categories";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";

function SearchByCategory() {
  //states
  const [articles, setArticles] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [higherPrice, setHigherPrice] = useState(0);
  const [sliderPrice, setSliderPrice] = useState(1000000);

  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(8);

  const max = articles.length / offset;

  // config global
  const { background } = configColorChakra;
  const { articlesByCategory, domain } = config;

  // functions

  //params
  const { id } = useParams();

  //useEffect
  useEffect(() => {
    axios.get(`${articlesByCategory}/${id}`).then((response) => {
      if (response.data?.length > 0) {
        setArticles(response.data);
        setIsLoaded(true);
        setError(false);
        setMessage("");
      } else {
        setArticles([]);
        setMessage("No se encontraron articulos relacionados a su búsqueda");
        setError(true);
        setIsLoaded(true);
      }
    });
  }, [id]);

  return (
    <>
      <Flex
        bg={background}
        w={{
          base: "100%",
          md: "80%",
        }}
        m="auto"
        pt={12}
        alignItems={{ base: "center", md: "flex-start" }}
        justifyContent={{
          base: "center",
          md: "flex-start",
        }}
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Categories
          defaultValue={higherPrice}
          setSliderPrice={setSliderPrice}
          max={higherPrice}
          searched={id}
        />
        {error ? (
          <Box w="full">
            <Text textAlign="center" fontSize="2xl" fontWeight="bold">
              {message}
            </Text>
          </Box>
        ) : null}

        <Box w="100%">
          {articles.error === true ? null : (
            <Flex
              justifyContent="center"
              flexWrap="wrap"
              gap={4}
              bg={background}
            >
              {articles
                .slice((page - 1) * offset, (page - 1) * offset + offset)
                .map((article) => {
                  {
                    article.price > higherPrice
                      ? setHigherPrice(article.price)
                      : null;
                  }
                  if (article.price <= sliderPrice) {
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
                  } else {
                    return null && <h3>asd</h3>;
                  }
                })}
            </Flex>
          )}
        </Box>
      </Flex>
      <Pagination page={page} setPage={setPage} max={max} />
    </>
  );
}

export default SearchByCategory;

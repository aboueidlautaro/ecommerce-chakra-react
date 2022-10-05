import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SlideArticles from "../components/SlideArticles";

function Article() {
  //states
  const [article, setArticle] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // config global
  const { background, secondary, primary, buttonSecondary } = configColorChakra;
  const { articleByTitle, domain } = config;

  //params
  const { title } = useParams();

  //functions
  const formatter = (number) => new Intl.NumberFormat().format(number);

  //useEffect
  useEffect(() => {
    axios.get(`${articleByTitle}/${title}`).then((response) => {
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
    <Flex color={secondary} w="full" h="91vh" bg={background}>
      <Flex
        borderRadius="10px"
        boxShadow="xl"
        m="auto"
        w="85%"
        bg="#fff"
        h="90%"
        justifyContent="center"
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Flex
          p={{
            base: "0",
            md: "10px",
          }}
          justifyContent="center"
          w={{
            base: "100%",
            md: "45%",
          }}
          alignItems="center"
        >
          <Flex
            w={{
              base: "auto",
              md: "100%",
            }}
            h={{
              base: "90%",
              md: "auto",
            }}
            justifyContent="center"
            alignItems="center"
            flexDirection="row"
          >
            <Image
              w="65%"
              h="auto"
              src={`${domain}/uploads/${article.image}`}
            />
          </Flex>
        </Flex>
        <Divider
          px={2}
          color="#000"
          orientation="vertical"
          display={{
            base: "none",
            md: "flex",
          }}
        />
        <Divider
          px={2}
          color="#000"
          orientation="horizontal"
          display={{
            base: "flex",
            md: "none",
          }}
        />
        <Flex
          p={{
            base: "2px",
            md: 10,
          }}
          px={{
            base: 8,
            md: 0,
          }}
          flexDirection={{
            base: "column",
            md: "column",
          }}
          justifyContent="flex-start"
          w={{
            base: "100%",
            md: "55%",
          }}
        >
          <Text as="h2" fontSize="34px" fontWeight={500}>
            {article.title}
          </Text>
          <Badge
            color={secondary}
            p={"2px"}
            w={"126px"}
            borderRadius={5}
            textAlign="center"
            bg={primary}
            variant={"solid"}
            fontSize="14px"
          >
            {article.tag}
          </Badge>
          <Text
            my={5}
            fontWeight={700}
            letterSpacing={"0.24px"}
            lineHeight={0.8}
            fontSize="44px"
            as="span"
          >
            ${formatter(article.price)}
          </Text>
          <Breadcrumb my={3} fontWeight="medium" fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="/articles/search/all">
                Artículos
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="/articles/search/all">
                {article.tag}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href={`article/${article.title}`}>
                <Badge
                  borderColor="#000"
                  color="#000"
                  variant="outline"
                  fontWeight={500}
                  noOfLines={1}
                  textOverflow="ellipsis"
                >
                  {article.title}
                </Badge>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex
            flexDirection={{
              base: "column",
              md: "column",
            }}
            gap={4}
          >
            <Text
              as="span"
              fontSize="18px"
              fontWeight={500}
              letterSpacing={"0.24px"}
              lineHeight={0.8}
            >
              <b>SKU: </b>
              {article.SKU}
            </Text>
            <Text
              pl={3}
              as="p"
              fontSize="18px"
              fontWeight={400}
              letterSpacing={"0.24px"}
              lineHeight={0.8}
              h="150px"
              w="70%"
              noOfLines={6}
              textOverflow="ellipsis"
              display={{
                base: "none",
                md: "block",
              }}
            >
              {article.description}
            </Text>
            <Flex gap={3} flexDirection="column">
              <Stack pl={"32px"} direction="row">
                <Text fontWeight={500}>Disponibles </Text>
                <Badge
                  borderRadius={4}
                  px={3}
                  fontWeight={500}
                  fontSize="16px"
                  colorScheme={article.stock > 0 ? "facebook" : "red"}
                >
                  {article.stock}
                </Badge>
              </Stack>
              <Stack direction="row">
                <Badge
                  borderRadius={4}
                  px={3}
                  fontWeight={500}
                  fontSize="16px"
                  colorScheme="green"
                  variant="outline"
                >
                  Envíos a todo el país
                </Badge>
              </Stack>
            </Flex>
          </Flex>
          <Box my={3} h="full" w="100%">
            <Flex
              flexDirection={{
                base: "column",
                lg: "row",
              }}
              justifyContent="center"
              alignItems="center"
              h="full"
              gap={{
                base: 2,
                lg: 6,
              }}
              w="100%"
            >
              <Button
                leftIcon={<FontAwesomeIcon icon={faShoppingCart} />}
                colorScheme="gray"
                _hover={{ bg: buttonSecondary }}
                variant="outline"
              >
                Agregar al carrito
              </Button>
              <Button colorScheme="yellow">Comprar ahora</Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Article;

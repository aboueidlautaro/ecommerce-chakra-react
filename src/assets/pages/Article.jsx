import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";

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
    <Flex color={secondary} py={10} w="full" h="auto" bg={background}>
      <Flex
        pr={3}
        borderRadius="10px"
        boxShadow="xl"
        m="auto"
        w="90%"
        bg="#fff"
        h="100%"
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
            <Skeleton borderRadius={6} isLoaded={isLoaded}>
              <Image
                objectFit={"contain"}
                w="auto"
                h={{
                  base: "230px",
                  md: "500px",
                }}
                py={2}
                src={`${domain}/uploads/${article.image}`}
              />
            </Skeleton>
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
          <Text
            noOfLines={2}
            overflow="hidden"
            textOverflow="ellipsis"
            as="h2"
            fontSize={{
              base: "1.6rem",
              md: "34px",
            }}
            fontWeight={500}
            h="100%"
            py={{
              base: 0,
              md: 4,
              lg: 8,
            }}
          >
            <Skeleton as="span" borderRadius={6} isLoaded={isLoaded}>
              {article.title}
            </Skeleton>
          </Text>

          <Badge
            color={secondary}
            p={"2px"}
            w={"126px"}
            my={2}
            borderRadius={5}
            textAlign="center"
            bg={primary}
            variant={"solid"}
            fontSize="14px"
          >
            <Skeleton
              as="span"
              m="auto"
              w="80px"
              borderRadius={6}
              isLoaded={isLoaded}
            >
              {article.tag}
            </Skeleton>
          </Badge>
          <Skeleton as="span" my={5} borderRadius={6} isLoaded={isLoaded}>
            <Text
              fontWeight={700}
              letterSpacing={"0.24px"}
              lineHeight={0.8}
              fontSize="44px"
              as="span"
            >
              ${formatter(article.price)}
            </Text>
          </Skeleton>

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
              <Skeleton
                as="span"
                display="inline-block"
                borderRadius={6}
                isLoaded={isLoaded}
              >
                {article.SKU}
              </Skeleton>
            </Text>
            <Text
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
              <Skeleton
                as="span"
                display="inline-block"
                borderRadius={6}
                isLoaded={isLoaded}
              >
                {article.description}
              </Skeleton>
            </Text>
            <Flex gap={3} flexDirection="column">
              <Stack
                pl={{
                  base: "0",
                  md: "32px",
                }}
                direction="row"
                m={{
                  base: "auto",
                  md: "0",
                }}
              >
                <Text fontWeight={500}>Disponibles </Text>
                <Badge
                  borderRadius={4}
                  px={3}
                  fontWeight={500}
                  fontSize="16px"
                  colorScheme={article.stock > 0 ? "facebook" : "red"}
                >
                  <Skeleton
                    display="inline-block"
                    borderRadius={6}
                    isLoaded={isLoaded}
                  >
                    {article.stock}
                  </Skeleton>
                </Badge>
              </Stack>
              <Stack
                direction="row"
                m={{
                  base: "auto",
                  md: "0",
                }}
              >
                <Badge
                  borderRadius={4}
                  px={3}
                  fontWeight={500}
                  fontSize="16px"
                  colorScheme="green"
                  variant="outline"
                >
                  Env??os a todo el pa??s
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

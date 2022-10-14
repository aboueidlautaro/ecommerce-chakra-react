import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import configColorChakra from "../services/configColorChakra";

function CardArticle(props) {
  // config global
  const { primary, secondary, borders } = configColorChakra;

  // functions
  // react number format
  const formatter = (number) => new Intl.NumberFormat().format(number);

  return (
    <Link id="cardArticleId" to={`/article/${props.title}`}>
      <Box
        borderRadius={8}
        border={`0.3px solid ${borders}`}
        w={255}
        h={335}
        bg={"white"}
        transition={"all 0.2s ease-in-out"}
        _hover={{
          transition: "all 0.2s ease-in-out",
          boxShadow: "xl",
        }}
      >
        <Box display={"flex"} h={"200px"} justifyContent={"center"}>
          <Image
            maxH={200}
            h={"auto"}
            objectFit={"contain"}
            w={"auto"}
            maxW={235}
            src={props.src}
            pt={2}
          />
        </Box>
        <Flex
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          h={"40%"}
          marginTop={1}
        >
          <Badge
            color={secondary}
            p={"1px"}
            w={"118px"}
            borderRadius={5}
            textAlign="center"
            bg={primary}
            variant={"solid"}
            colorScheme="green"
          >
            {props.tag}
          </Badge>
          <Text
            paddingX={3}
            noOfLines={1}
            textAlign={"center"}
            letterSpacing={"0.12px"}
            fontWeight={600}
            marginTop={3}
            as="h2"
          >
            {props.title}
          </Text>
          <Text
            fontWeight={800}
            letterSpacing={"0.24px"}
            lineHeight={0.8}
            fontSize={25}
            as="p"
          >
            ${formatter(props.price)}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
}

export default CardArticle;

import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../services/config";
import configColorChakra from "../services/configColorChakra";

function Categories(props) {
  const navigate = useNavigate();

  const { secondary, background, borders, secondaryHover, primary } =
    configColorChakra;

  const [categories, setCategories] = useState([]);
  const [valueSlider, setValueSlider] = useState("");

  const { allCategories } = config;

  useEffect(() => {
    axios.get(allCategories).then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <Box
      bg="white"
      p={2}
      w="auto"
      h="auto"
      borderRadius={6}
      shadow="black"
      boxShadow="lg"
      marginBottom={5}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        p={3}
        borderRadius={6}
        border={`1px solid ${borders}`}
        w="250px"
        h="100px"
        bg={background}
      >
        <Text as="h3" fontSize="16px" fontWeight="600" color={secondary}>
          Resultados de la búsqueda:
        </Text>
        <Text
          w="100%"
          as="span"
          fontSize="md"
          noOfLines={1}
          textOverflow="ellipsis"
        >
          <Tag
            size="md"
            key="md"
            borderRadius="full"
            variant="solid"
            colorScheme="blackAlpha"
          >
            <TagLabel>{props.searched}</TagLabel>
            <TagCloseButton
              onClick={() => {
                if (props.searched !== "all") {
                  navigate("/articles/search/all");
                } else {
                  null;
                }
              }}
            />
          </Tag>
        </Text>
      </Box>
      <Flex w="100%" flexDirection="column" p={2}>
        <Text color={secondaryHover} fontWeight="700" as="span">
          Categorías
        </Text>
        {categories.map((category) => {
          return (
            <Box
              _hover={{
                fontWeight: "500",
              }}
              key={category.id}
              pl={2}
              py="2.5px"
            >
              <Link to={`/articles/search/${category.id}`}>
                {category.name}
              </Link>
            </Box>
          );
        })}
        <Text color={secondaryHover} fontWeight="700" as="span">
          Rango de precio
        </Text>

        <Slider
          colorScheme="yellow"
          max={props.max}
          my={5}
          defaultValue={30}
          onChange={(value) => {
            props.setSliderPrice(value);
            setValueSlider(value);
          }}
        >
          <SliderMark value={valueSlider}>
            <Text
              m={4}
              position="absolute"
              top="-6px"
              left="-32px"
              fontSize="xs"
              color={secondaryHover}
              fontWeight="600"
              as="span"
            >
              ${valueSlider}
            </Text>
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>

          <SliderThumb>
            <FontAwesomeIcon icon={faCircle} />
          </SliderThumb>
        </Slider>
      </Flex>
    </Box>
  );
}

export default Categories;

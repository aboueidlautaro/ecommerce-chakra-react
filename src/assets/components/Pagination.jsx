import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination({ page, setPage, max }) {
  const [input, setInput] = useState(page);

  const nextPage = () => {
    if (page < max && max < 1.5) {
      setPage(1);
      setInput(1);
    } else {
      setPage(page + 1);
      setInput(input + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setInput(input - 1);
    } else if (page === 1) {
      setPage(1);
      setInput(1);
    }
  };

  return (
    <Flex
      fontWeight={700}
      mx={10}
      justifyContent="center"
      alignItems="center"
      gap={2}
      mt={5}
    >
      <Button disabled={page === 1 || page < 1} onClick={prevPage}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Button>
      <Input w="50px" name="page" value={input} autoComplete="off" disabled />

      <Text as="p">DE {max > 1 ? Math.round(parseFloat(max)) : 1}</Text>
      <Button
        disabled={page === max || page > max || max < 1.5}
        onClick={nextPage}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </Flex>
  );
}

export default Pagination;

import { MenuItem } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import configColorChakra from "../services/configColorChakra";

function ItemMenuProfile(props, { children }) {
  // global config colors chakra
  const { primary } = configColorChakra;
  return (
    <Link className="itemNavMenuProfile" to={props.to}>
      <MenuItem
        w={"90%"}
        columnGap={2}
        margin={"auto"}
        borderRadius={"lg"}
        _hover={{
          bg: primary,
        }}
        justifyContent="center"
      >
        {props.icon}
        {props.content}
      </MenuItem>
    </Link>
  );
}

export default ItemMenuProfile;

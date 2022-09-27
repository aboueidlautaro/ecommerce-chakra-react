import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import ButtonModules from "../components/ButtonModules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faClipboardUser } from "@fortawesome/free-solid-svg-icons";

function Modules() {
  return (
    <>
      <Box textAlign="center" p={3}>
        <Box p={5}>
          <Text fontSize={"2xl"} as={"b"}>
            Seleccionar módulo
          </Text>
        </Box>
        <Box className="modules-container">
          <ButtonModules
            name="Crear artículo"
            icon={<FontAwesomeIcon icon={faBox} />}
            to="/create/article"
          />
          <ButtonModules
            name="Crear categoría"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            to="/create/category"
          />
          <ButtonModules
            name="Crear subcategoría"
            icon={<FontAwesomeIcon icon={faTable} />}
            to="/create/subcategory"
          />
          <ButtonModules
            name="Crear miembros"
            icon={<FontAwesomeIcon icon={faClipboardUser} />}
            to="/create/staff"
          />
        </Box>
      </Box>
    </>
  );
}

export default Modules;

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
            to="/createarticle"
          />
          <ButtonModules
            name="Crear categoría"
            icon={<FontAwesomeIcon icon={faTableColumns} />}
            to="/createcategory"
          />
          <ButtonModules
            name="Crear subcategoría"
            icon={<FontAwesomeIcon icon={faTable} />}
            to="/createsubcategory"
          />
          <ButtonModules
            name="Crear miembros"
            icon={<FontAwesomeIcon icon={faClipboardUser} />}
            to="/createstaff"
          />
        </Box>
      </Box>
    </>
  );
}

export default Modules;

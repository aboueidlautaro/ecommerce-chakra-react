import { Box, Text } from "@chakra-ui/react";
import {
  faBox,
  faUser,
  faTable,
  faTableColumns,
  faCopyright,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ButtonModules from "../components/ButtonModules";
import configColorChakra from "../services/configColorChakra";

function Modules() {
  const { background } = configColorChakra;
  return (
    <>
      <Box bg={background} textAlign="center" p={3}>
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
            icon={<FontAwesomeIcon icon={faUser} />}
            to="/create/staff"
          />
          <ButtonModules
            name="Crear marcas"
            icon={<FontAwesomeIcon icon={faCopyright} />}
            to="/create/brand"
          />
          <ButtonModules
            name="Crear rol"
            icon={<FontAwesomeIcon icon={faIdCard} />}
            to="/create/role"
          />
          <ButtonModules
            name="Crear tag"
            icon={<FontAwesomeIcon icon={faIdCard} />}
            to="/create/tag"
          />
        </Box>
      </Box>
    </>
  );
}

export default Modules;

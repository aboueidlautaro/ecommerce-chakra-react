import { Center, Flex, Text } from "@chakra-ui/layout";
import {
  Button,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import configColorChakra from "../services/configColorChakra";

import { AuthContext } from "../contexts/AuthContext";
import BuyCartDrawer from "./BuyCartDrawer";

import { BsFillHeartFill, BsFillShieldLockFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import config from "../services/config";
import ItemMenuProfile from "./ItemMenuProfile";
import { useEffect } from "react";
import axios from "axios";

function Navbar() {
  //navigate
  const navigate = useNavigate();

  // authState context
  const { authState, setAuthState } = useContext(AuthContext);

  // states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("accessToken");

  const [user, setUser] = useState({});

  // keys ref
  const handleKeyUp = (e) => {
    if (e.keyCode === "Enter") {
      ref.current.submit();
    }
  };

  // ref
  const btnRef = useRef();
  const ref = useRef();

  // global config colors chakra
  const { primary, secondary, primaryLight, primaryDark, secondaryHover } =
    configColorChakra;

  // global config
  const { getUserProfileInfo, domain } = config;

  // functions
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",

      status: false,
    });
    window.location.reload();
  };

  //params

  const [searchParams, setSearchParams] = useSearchParams();

  //functions

  // create function for search by query param and navigate to search page with query param
  const searchByQuery = (e) => {
    e.preventDefault();
    setSearchParams({ q: search });

    ref.current.reset();
    if (search === "") {
      navigate("/articles");
    } else {
      navigate("/articles/search?q=" + search);
    }
  };

  //function for limit cant of characters in string and add ... at the end maximum 12 characters
  const limitCharacters = (string) => {
    if (string?.length > 12) {
      return string?.substring(0, 12) + "...";
    } else {
      return string;
    }
  };

  // useffect
  useEffect(() => {
    if (!token && !authState.status) {
      return;
    } else {
      axios
        .get(getUserProfileInfo, {
          headers: {
            accessToken: token,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    }
  }, [token, authState.status]);

  return (
    <Center
      h={{
        base: "18vh",
        md: "9vh",
      }}
      bg={primary}
      w="full"
    >
      <Flex
        zIndex={1000}
        padding={{
          base: "10px",
          md: "0px",
        }}
        h="full"
        color={secondary}
        w={{
          base: "100%",
          md: "90%",
        }}
        justify="space-between"
        align="center"
        px={{
          base: "0px",
          md: "10px",
        }}
        flexDirection={{
          base: "column",
          md: "row",
        }}
      >
        <Center
          w={{
            base: "100%",
            md: "15%",
          }}
        >
          <Link to="/">LOGO</Link>
        </Center>
        <Center
          w={{
            base: "100%",
            md: "45%",
          }}
        >
          <form
            id="form"
            ref={ref}
            onSubmit={searchByQuery}
            onKeyUp={handleKeyUp}
            onChange={(e) => setSearch(e.target.value)}
            tabIndex={0}
          >
            <InputGroup>
              <Input
                w={{
                  base: "100%",
                  sm: "350px",
                  lg: "500px",
                  xl: "600px",
                  "2xl": "750px",
                }}
                color={secondaryHover}
                border={"none"}
                _focus={{
                  ring: "none",
                  outline: "none",
                  borderColor: primaryDark,
                }}
                textAlign="left"
                _placeholder={{
                  fontWeight: "semibold",
                  color: primaryDark,
                  paddingLeft: "10px",
                }}
                bg={primaryLight}
                placeholder="Buscar artículo"
              />

              <InputRightElement>
                <IoSearchSharp />
              </InputRightElement>
            </InputGroup>
          </form>
        </Center>
        <Center
          display={{
            base: "flex",
            md: "flex",
          }}
          w={{
            base: "100%",
            md: "40%",
          }}
          paddingTop={{
            base: "10px",
            md: "0px",
          }}
          fontWeight={"semibold"}
          gap={3}
          alignItems="center"
          flexDirection={{
            base: "row",
            md: "row",
          }}
          justifyContent="center"
        >
          <BuyCartDrawer
            isOpen={isOpen}
            onClose={onClose}
            finalFocusRef={btnRef}
            onClick={onOpen}
            content="Ir a pagar"
          />
          <Button
            ref={btnRef}
            p={0}
            _hover={{ bg: "transparent" }}
            bg={"transparent"}
            onClick={onOpen}
            fontSize="2xl"
          >
            <MdOutlineShoppingCart />
          </Button>
          {!authState.status ? (
            <>
              <Link to="/login">Ingresar</Link>
              <Link to="/register">Crear cuenta</Link>
            </>
          ) : (
            <>
              <Menu id="menuProfile">
                <MenuButton
                  fontWeight={600}
                  width={200}
                  textOverflow="ellipsis"
                  whiteSpace={"nowrap"}
                  overflow="hidden"
                  overflowWrap={"break-word"}
                >
                  <Flex justifyContent={"center"} alignItems={"center"} gap={1}>
                    <Flex
                      textAlign={"left"}
                      justifyContent={"center"}
                      flexDirection={"column"}
                      lineHeight={1}
                    >
                      <Text>{limitCharacters(user.name)}</Text>
                      <Text fontSize={14} fontWeight={400}>
                        {user.username}
                      </Text>
                    </Flex>
                    {user.image !== null ? (
                      <Image
                        marginLeft={2}
                        w={45}
                        h={45}
                        borderRadius={10}
                        objectPosition="center"
                        src={`${domain}/uploads/${user.image}`}
                        alt="avatar"
                      />
                    ) : (
                      <Image
                        marginLeft={2}
                        w={45}
                        h={45}
                        borderRadius={10}
                        objectPosition="center"
                        src={`https://ui-avatars.com/api/?background=random&name=${user.name}&size=128`}
                        alt="avatar"
                      />
                    )}

                    <IoIosArrowDown />
                  </Flex>
                </MenuButton>
                <MenuList border={`2px solid ${primary}`} textAlign={"center"}>
                  <MenuGroup
                    justifyContent="center"
                    title={`Hola! ${user.name}`}
                  >
                    <ItemMenuProfile
                      icon={<FaUser />}
                      content="Mi perfil"
                      to={`/user/profile/${user.username}`}
                    />
                    <ItemMenuProfile
                      icon={<BsFillHeartFill />}
                      content="Favoritos"
                      to="/favorites"
                    />
                    {user.user_role === "admin" ? (
                      <ItemMenuProfile
                        icon={<BsFillShieldLockFill />}
                        content="Módulos creación"
                        to="/create"
                      />
                    ) : null}
                    <MenuItem
                      w={"90%"}
                      columnGap={2}
                      margin={"auto"}
                      borderRadius={"lg"}
                      _hover={{
                        bg: primary,
                      }}
                      justifyContent="center"
                      onClick={logout}
                    >
                      <FaUser />
                      Cerrar sesión
                    </MenuItem>
                  </MenuGroup>
                  <MenuGroup title="Opciones"></MenuGroup>
                </MenuList>
              </Menu>
            </>
          )}
        </Center>
      </Flex>
    </Center>
  );
}

export default Navbar;

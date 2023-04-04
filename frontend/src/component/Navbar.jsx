import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useEffect } from "react";
let user = JSON.parse(localStorage.getItem("userInfo"));
export const Navbar = () => {
  const navigate = useNavigate();
  const handleOut = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    return;
  };
  return (
    <>
      <Box
        w="100%"
        h="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        background="#FFFFFF"
        fontSize={18}
        color="#CBCEC"
        border={"1px #CBCECA solid"}
      >
        <Link to="/">
          <Text fontSize={25} color="#0A0103" fontWeight="bold" ml={"40px"}>
            R2MI Project App
          </Text>
        </Link>

        <Link to="/project">Project Dashboard</Link>
        <Link to={"/developer"}>Developer Dashboard</Link>
        <Link to="/team">Team Dashboard</Link>
        <HStack spacing={{ base: "0", md: "6" }} mr={"40px"}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="m">
                      {user?.fullName ? user?.fullName : "Profile"}
                    </Text>
                    <Text fontSize="m">{user?.email ? user?.email : ""}</Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown size={"30px"} />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Link>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={handleOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Box>
    </>
  );
};

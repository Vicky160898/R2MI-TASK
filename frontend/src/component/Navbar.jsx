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
export const Navbar = () => {
  //   const navigate = useNavigate();
  //   let Username = localStorage.getItem("userName");
  //   let UserRole = localStorage.getItem("userRole");
  //   let UserToken = localStorage.getItem("userToken");
  const handleOut = () => {
    //     localStorage.removeItem("userToken");
    //     localStorage.removeItem("userName");
    //     localStorage.removeItem("userRole");
    //     navigate("/login");
    //     return;
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
          <Text fontSize={30} color="#0A0103" fontWeight="bold" ml={"40px"}>
            Project Manager App
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
                    <Text fontSize="m">Profile</Text>
                    <Text fontSize="m" color="gray.600">
                      Role
                    </Text>
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

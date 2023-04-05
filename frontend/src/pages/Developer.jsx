import { useEffect, useState } from "react";
import { Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";

export default function Developer() {
  const [data, setData] = useState([]);
  let user = JSON.parse(localStorage.getItem("userInfo"));

  //here we getting all the project..
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/get/own/details", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setData(res.data));
  }, []);


  return (
    <Flex direction="column" alignItems="center">
      <Heading as="h2" size="lg" mb={8} mt={10}>
        You are Part of this Team Project as a Developer
      </Heading>
      <Box width={{ base: "60%", md: "60%" }} textAlign={"center"}>
        {data?.map((el, i) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p={4}
            key={el._id}
          >
            <Text fontSize="xl" fontWeight="bold" mb={2}>
              Name:- {el.fullName}
            </Text>
            <Text fontWeight="semibold" mb={2}>
              Email: {el.email}
            </Text>
            {el?.project?.map((ele) => (
              <Box key={ele._id}>
                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  textAlign={"center"}
                  border={"0.5px solid grey"}
                  justifyContent={"space-around"}
                >
                  <Text fontWeight="semibold" mb={2}>
                    Project Name: {ele.title}
                  </Text>
                  <Box display={"flex"} flexDirection={"row"} gap={"30px"}>
                    <Text fontWeight="semibold"> Status:</Text>
                    <Badge colorScheme={ele.isCompleted ? "green" : "red"}>
                      {ele.isCompleted ? "Completed" : "Incomplete"}
                    </Badge>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

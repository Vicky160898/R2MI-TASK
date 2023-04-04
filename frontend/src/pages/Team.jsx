import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Text,
  IconButton,
  Spacer,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
export default function Team() {
  let user = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([]);
  const toast = useToast();
  const handleDelete = async (DeveloperId) => {
    console.log(DeveloperId);
    await axios.delete(`http://localhost:8080/api/delete/${DeveloperId}`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    window.location.reload();
    toast({
      title: "Administrator Removed developer!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
    return;
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/team", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setData(res.data));
  }, []);
  return (
    <Box p="4">
      <Heading as="h2" size="lg" mb={5} mt={4} textAlign={"center"}>
        You are Administrator of this Project with your team members
      </Heading>
      {data?.map((member) => (
        <Box
          key={member._id}
          borderWidth="1px"
          borderRadius="md"
          p="4"
          mb="4"
          display="flex"
          alignItems="center"
        >
          <Text fontWeight="bold" mr="4">
            {member?.administrator?.email ? "Administrator" : ""}:-
            {member?.administrator?.email}
          </Text>
          <Text color="gray.500" ml="5">
            Project Name:-{member.project.title}
          </Text>
          <Spacer />
          <Text mr={"30px"}> Group Members :- </Text>
          {member?.developers?.map((el, i) => (
            <Box key={i} display={"flex"} flexDirection={"row"}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                border={"1px solid gray"}
                p={1.5}
                borderRadius={"5px"}
                boxShadow="md"
              >
                <Text fontSize={13}>email:-{el.email}</Text>
                <Text fontSize={13}>Name:-{el.fullName}</Text>
              </Box>
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete"
                variant="ghost"
                colorScheme="red"
                mt={"5px"}
                onClick={() => handleDelete(el._id)}
                size="sm"
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

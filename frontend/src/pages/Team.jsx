import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Text,
  Button,
  IconButton,
  CloseButton,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
const teamMembers = [
  { id: 1, email: "john@example.com", role: "Developer" },
  { id: 2, email: "jane@example.com", role: "Designer" },
  { id: 3, email: "bob@example.com", role: "Manager" },
];
export default function Team() {
  let user = JSON.parse(localStorage.getItem("userInfo"));
  const [members, setMembers] = useState(teamMembers);
  const [data, setData] = useState([]);
  const toast = useToast();
  const handleDelete = async (DeveloperId) => {
    data.forEach((member) => {
      if (member.administrator._id !== DeveloperId) {
        toast({
          title: "You don't have the access to delete developer!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
    });
    console.log(DeveloperId);
    await axios.delete(`http://localhost:8080/api/delete/${DeveloperId}`, {
      headers: {
        authorization: `Bearer ${user.token}`,
      },
    });
    toast({
      title: "You Remove developer!",
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
  console.log(data);
  return (
    <Box p="4">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        Team Members
      </Text>
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
            {member.administrator.email}
          </Text>
          <Text color="gray.500">
            {member.administrator.email ? "Administrator" : ""}
          </Text>
          <Text color="gray.500" ml="5">
            {member.administrator.role}
          </Text>
          <Text color="gray.500" ml="5">
            Project:-{member.project.title}
          </Text>
          <Spacer />
          {member?.developers?.map((el, i) => (
            <Box key={i} display={"flex"} flexDirection={"row"}>
              <Box display={"flex"} flexDirection={"column"}>
                <Text> Group Members List</Text>
                <Text>{el.email}</Text>
                <Text>{el.fullName}</Text>
              </Box>
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete"
                variant="ghost"
                colorScheme="red"
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

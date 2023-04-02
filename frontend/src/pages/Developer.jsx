import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import Details from "./Details";
import axios from "axios";
const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is the description of task 1.",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is the description of task 2.",
    completed: true,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is the description of task 3.",
    completed: false,
  },
];
export default function Developer() {
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [data, setData] = useState([]);
  let user = JSON.parse(localStorage.getItem("userInfo"));
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (task) => {
    setDeletingTask(task);
  };

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

  console.log(data);

  return (
    <Flex direction="column" alignItems="center">
      <Heading as="h2" size="xl" mb={8}>
        My Tasks
      </Heading>
      <Box width={{ base: "100%", md: "90%" }}>
        <Table>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((task) => (
              <Details
                key={task._id}
                task={task}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
}

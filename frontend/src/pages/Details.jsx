import React from "react";
import { useState } from "react";
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
import { FaEdit, FaTrash } from "react-icons/fa";
export default function Details({ task, onDelete, onEdit }) {
  return (
    <Tr>
      <Td>{task.title}</Td>
      <Td>{task.description}</Td>
      <Td>
        <Badge colorScheme={task.completed ? "green" : "gray"}>
          {task.completed ? "Completed" : "Incomplete"}
        </Badge>
      </Td>
      <Td>
        <Stack direction="row" spacing={2}>
          <IconButton
            icon={<FaEdit />}
            aria-label="Edit task"
            onClick={() => onEdit(task)}
          />
          <IconButton
            icon={<FaTrash />}
            aria-label="Delete task"
            onClick={() => onDelete(task)}
          />
        </Stack>
      </Td>
    </Tr>
  );
}

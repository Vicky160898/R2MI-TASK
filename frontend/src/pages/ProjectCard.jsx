import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

export default function ProjectCard({ project }) {
  const [enrolled, setEnrolled] = useState(false);

  const handleClick = () => {
    setEnrolled(true);
  };
  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      p={4}
      width={{ base: "100%", md: "90%", lg: "80%" }}
      mb={4}
    >
      <Heading as="h3" size="md" mb={2}>
        {project.title}
      </Heading>
      <Text fontSize="sm" mb={4}>
        {project.description}
      </Text>
      {!enrolled && (
        <Button colorScheme="blue" size="sm" onClick={handleClick}>
          Enroll
        </Button>
      )}
      {enrolled && (
        <Text fontSize="sm" color="green.500" mt={2}>
          Enrolled!
        </Text>
      )}
    </Box>
  );
}

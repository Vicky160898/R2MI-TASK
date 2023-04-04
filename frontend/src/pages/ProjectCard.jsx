import { Box, Button, Heading, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function ProjectCard({ project }) {
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  let user = JSON.parse(localStorage.getItem("userInfo"));
  const handleClick = async (ProjectId) => {
    try {
      setLoading(true);
      const data = await axios.post(
        `http://localhost:8080/api/enroll`,
        { ProjectId },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.status === 200) {
        toast({
          title: `Group Created`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        console.log(data);
        setLoading(false);
        return;
      }
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: "Something wents wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
    setEnrolled(true);
  };
  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      p={4}
      width={{ base: "100%", md: "90%", lg: "100%" }}
      mb={4}
    >
      <Heading as="h3" size="md" mb={2}>
        {project.title}
      </Heading>
      <Text fontSize="sm" mb={4}>
        {project.description}
      </Text>
      {!enrolled && (
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => handleClick(project._id)}
        >
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

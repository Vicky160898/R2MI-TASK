import React, { useEffect, useState } from "react";

import { Flex, Heading, Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";
import axios from "axios";

export const ProjectFeed = () => {
  const [data, setData] = useState([]);
  //here we getting all the project..
  useEffect(() => {
    axios.get("http://localhost:8080/api/get").then((res) => setData(res.data));
  }, []);
  return (
    <Flex direction="column" alignItems="center">
      <Heading as="h2" size="xl" mb={8}>
        Projects
      </Heading>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
      >
        {data?.map((project) => (
          <GridItem key={project._id}>
            <ProjectCard project={project} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

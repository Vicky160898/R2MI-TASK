import React from "react";

import { Flex, Heading, Grid, GridItem } from "@chakra-ui/react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "This is the description of project 1.",
  },
  {
    id: 2,
    title: "Project 2",
    description: "This is the description of project 2.",
  },
  {
    id: 3,
    title: "Project 3",
    description: "This is the description of project 3.",
  },
];

export const ProjectFeed = () => {
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
        {projects.map((project) => (
          <GridItem key={project.id}>
            <ProjectCard project={project} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
};

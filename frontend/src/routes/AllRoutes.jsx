import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProjectFeed } from "../pages/ProjectFeed";
import Developer from "../pages/Developer";
import Team from "../pages/Team";
import Home from "../pages/Home";

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/project" element={<ProjectFeed />} />
      <Route path="/" element={<Home />} />
      <Route path="/developer" element={<Developer />} />
      <Route path="/team" element={<Team />} />
    </Routes>
  );
}

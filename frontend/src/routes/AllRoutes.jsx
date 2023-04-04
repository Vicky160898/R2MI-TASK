import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProjectFeed } from "../pages/ProjectFeed";
import Developer from "../pages/Developer";
import Team from "../pages/Team";
import Home from "../pages/Home";
import PrivateRoutes from "./PrivateRoutes";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/project"
        element={
          <PrivateRoutes>
            <ProjectFeed />
          </PrivateRoutes>
        }
      />
      <Route path="/" element={<Home />} />
      <Route
        path="/developer"
        element={
          <PrivateRoutes>
            <Developer />
          </PrivateRoutes>
        }
      />
      <Route
        path="/team"
        element={
          <PrivateRoutes>
            <Team />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}

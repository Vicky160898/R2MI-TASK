const express = require("express");
const {
  CreateProject,
  GetProjects,
  EnrollProject,
} = require("../controller/project");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.get("/get", GetProjects);
router.post("/enroll", isAuth, EnrollProject);
router.post("/create", CreateProject);
module.exports = router;

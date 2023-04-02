const express = require("express");
const {
  CreateProject,
  GetProjects,
  EnrollProject,
  OwnProjectDetail,
} = require("../controller/project");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.get("/get", GetProjects);
router.get("/get/own/details",isAuth, OwnProjectDetail);
router.post("/enroll", isAuth, EnrollProject);
router.post("/create", CreateProject);
module.exports = router;

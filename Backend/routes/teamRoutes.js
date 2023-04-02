const express = require("express");
const isAuth = require("../middleware/isAuth");
const { GetTeamProject, DeleteDeveloper } = require("../controller/team");
const router = express.Router();

router.get("/team", isAuth, GetTeamProject);
router.delete("/delete/:DeveloperId", isAuth, DeleteDeveloper);
module.exports = router;

const express = require("express");
const {
  UserRegister,
  UserLogin,
  OwnProjectDetail,
} = require("../controller/developer");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

//all routes of Authentication process...

router.post("/signup", UserRegister);
router.post("/login", UserLogin);
router.get("/get/own/details", isAuth, OwnProjectDetail);
module.exports = router;

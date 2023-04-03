const express = require("express");
const { UserRegister, UserLogin } = require("../controller/developer");
const router = express.Router();

//all routes of Authentication process...

router.post("/signup", UserRegister);
router.post("/login", UserLogin);

module.exports = router;

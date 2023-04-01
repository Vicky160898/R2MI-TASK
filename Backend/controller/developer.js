const generateToken = require("../config/generateToken");
const User = require("../model/developerModel");
const argon2 = require("argon2");

//here we creating the developer through the sign up and login..
const UserRegister = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const hash = await argon2.hash(password);
  const finduser = await User.findOne({ email });
  try {
    if (!finduser) {
      const user = await User.create({
        fullName,
        email,
        role,
        password: hash,
      });
      return res.status(201).send(user);
    }
    return res.status(401).send("User Already Present");
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//here we performing the authentication process taking password and email from user..
const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  const finduser = await User.findOne({ email });
  try {
    if (finduser && (await argon2.verify(finduser.password, password))) {
      return res.status(201).send({
        _id: finduser._id,
        email: finduser.email,
        fullName: finduser.fullName,
        role: finduser.role,
        token: generateToken(finduser),
      });
    } else {
      return res.status(401).send("Invalid Credential");
    }
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

module.exports = { UserRegister, UserLogin };

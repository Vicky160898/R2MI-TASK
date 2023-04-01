const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "28days",
    }
  );
  return token;
};

module.exports = generateToken;
const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  console.log(user)
  const token = jwt.sign(
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "28days",
    }
  );
  return token;
};

module.exports = generateToken;

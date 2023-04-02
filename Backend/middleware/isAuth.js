require("dotenv").config();
const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer sgfdh....
    let verification = jwt.verify(token, process.env.JWT_SECRET);
    try {
      if (verification) {
        req.id = verification.id;
        req.role = verification.role;
        next();
      } else {
        res.status(401).send("Operation not allowed.");
      }
    } catch (err) {
      return res.send(err.message);
    }
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

module.exports = isAuth;

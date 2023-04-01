require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connect = require("./config/db");
const UserRouter = require("./routes/developerRoute");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

//here route of all the request..
app.use("/api", UserRouter);

//here we creating server with the help of express..
connect();
app.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
});

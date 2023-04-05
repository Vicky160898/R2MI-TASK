require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connect = require("./config/db");
const UserRouter = require("./routes/developerRoute");
const ProjectRouter = require("./routes/projectRoutes");
const TeamRouter = require("./routes/teamRoutes");
const cors = require("cors");
const app = express();
const multer = require("multer");
const path = require("path");
//Taking Port if it is present in our env file otherwise by default 8080.

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);

//here route of all the request..

app.use("/api", UserRouter);
app.use("/api", ProjectRouter);
app.use("/api", TeamRouter);

//here we uploading the file to local directory..

app.use("/upload", express.static(path.join(__dirname, "/upload")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, req.body + ".png");
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).send("file has been upload");
});

//here we creating server with the help of express..

connect();
app.listen(PORT, () => {
  console.log(`server started on Port ${PORT}`);
});

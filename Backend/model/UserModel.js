const { Schema, model } = require("mongoose");

//this is the Developer model whoever login it's by default developer because all user will be developer

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Developer",
  },
  administratorProject: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  project: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

// Define the models for user.

const User = model("User", userSchema);

module.exports = User;

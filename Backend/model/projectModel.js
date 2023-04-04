const { Schema, model } = require("mongoose");

//this is the Schema structure for project

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
  },
  // team: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Team",
  // },
});

// Define the models for  project.

const Project = model("Project", projectSchema);

module.exports = Project;

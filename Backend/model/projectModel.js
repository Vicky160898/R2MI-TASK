const { Schema, model } = require("mongoose");

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
    required: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;

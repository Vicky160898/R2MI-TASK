const { Schema, model } = require("mongoose");

//this is the Schema structure for team

const teamSchema = new Schema({
  //preject means projectID.
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  administrator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  developers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Define the models for team.

const Team = model("Team", teamSchema);

module.exports = Team;

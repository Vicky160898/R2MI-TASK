const { Schema, model } = require("mongoose");

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
      required: true,
    },
  ],
});

const Team = model("Team", teamSchema);

module.exports = Team;

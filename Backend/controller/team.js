const Team = require("../model/teamModel");

//getting administrator role project..
const GetTeamProject = async (req, res) => {
  const Administrator = await Team.find({ administrator: req.id })
    .populate("administrator")
    .populate("project")
    .populate("developers");
  try {
    if (!Administrator) {
      return res.status(404).send("You don't have any administrator role");
    } else {
      return res.status(200).send(Administrator);
    }
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//here administrator delete the developer..
const DeleteDeveloper = async (req, res) => {
  const { DeveloperId } = req.params;
  console.log(DeveloperId);
  try {
    let developer = await Team.findOneAndUpdate(
      { administrator: req.id },
      { $pull: { developers: DeveloperId } }
    );
    return res
      .status(200)
      .send({ developer, message: "Developer Deleted Successfully" });
  } catch (error) {
    return res.send("You Don't have access to delete developer");
  }
};

module.exports = { GetTeamProject, DeleteDeveloper,};

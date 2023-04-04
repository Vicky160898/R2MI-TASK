const Project = require("../model/projectModel");
const Team = require("../model/teamModel");
const User = require("../model/UserModel");
//here we posting project...

const CreateProject = async (req, res) => {
  const { title, description, isCompleted } = req.body;
  try {
    const project = await Project.create({
      title,
      description,
      isCompleted,
    });

    return res.status(201).send(project);
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

//getting all the projects..

const GetProjects = async (req, res) => {
  const projects = await Project.find({});
  return res.status(201).send(projects);
};

//here we enrolling project if someone not enroll project it will make that guy Administrator and
//new create team otherwise it will added into the team..

const EnrollProject = async (req, res) => {
  const { ProjectId } = req.body;
  try {
    const FindProject = await Team.find({ project: ProjectId });
    if (FindProject.length === 0) {
      const CreateTeam = await Team.create({
        project: ProjectId,
        administrator: req.id,
        developers: [],
      });
      //here we push administrator team id in project Schema...
      await User.findByIdAndUpdate(
        { _id: req.id },
        { $push: { administratorProject: ProjectId } }
      );
      return res.status(201).send(CreateTeam);
    } else {
      // here we checking the developer already present or not in team..
      const obj = FindProject.find((obj) => obj.developers.includes(req.id));
      if (obj?.administrator != req.id) {
        if (!obj?.developers?.includes(req.id)) {
          let DeveloperArray = await Team.findOneAndUpdate(
            { project: ProjectId },
            { $push: { developers: req.id } },
            { new: true }
          );
          //here we push project id in project Schema...
          await User.findByIdAndUpdate(
            { _id: req.id },
            { $push: { project: ProjectId } }
          );
          return res.send(DeveloperArray);
        } else {
          return res.send("You already Involved in this Project..");
        }
      } else {
        return res.send("You are administror of this Project..");
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Something went wrong.");
  }
};

module.exports = {
  CreateProject,
  GetProjects,
  EnrollProject,
};

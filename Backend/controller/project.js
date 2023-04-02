const Project = require("../model/projectModel");
const Team = require("../model/teamModel");

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

//here we enrolling project..
const EnrollProject = async (req, res) => {
  const { ProjectId } = req.body;
  try {
    const FindProject = await Team.findOne({ project: ProjectId });
    if (!FindProject) {
      console.log(FindProject);
      const CreateTeam = await Team.create({
        project: ProjectId,
        administrator: req.id,
        developers: [],
      });

      //here we push team id in project Schema...
      await Project.findByIdAndUpdate(
        ProjectId,
        { team: CreateTeam._id },
        { new: true }
      );
      return res.send(CreateTeam);
    } else {
      if (!FindProject.developers.includes(req.id)) {
        let DeveloperArray = await Team.findOneAndUpdate(
          { project: ProjectId },
          { $push: { developers: req.id } },
          { new: true }
        );
        return res.send(DeveloperArray);
      } else {
        return res.send("You already Involved in this Project..");
      }
    }
  } catch (error) {
    return res.status(401).send("Something wents wrong");
  }
};

const OwnProjectDetail = async (req, res) => {
  const findProject = await Project.find({}).populate("team");
  res.send(findProject);
};



module.exports = {
  CreateProject,
  GetProjects,
  EnrollProject,
  OwnProjectDetail,
};

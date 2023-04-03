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

//here we enrolling project if someone not enroll project it will make that guy Administrator and
//new create team otherwise it will added into the team..

const EnrollProject = async (req, res) => {
  const { ProjectId } = req.body;
  console.log(ProjectId);
  const project = await Project.findById(ProjectId);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  let team = await Team.findOne({ ProjectId });

  if (!team) {
    // create a new team with the developer as the administrator
    team = new Team({
      project: ProjectId,
      developers: [{ developer: req.id, role: "Admin" }],
    });
    await team.save();
  } else {
    // check if the developer is already enrolled in the team
    const enrolledDeveloper = team.developers.find(
      (dev) => dev.developer.toString() === req.id
    );
    if (enrolledDeveloper) {
      return res.status(400).send("Developer already enrolled");
    }
    // add the developer to the team with the role of "Developer"
    team.developers.push({ developer: req.id, role: "Developer" });
    await team.save();
  }

  // return the updated team object
  const populatedTeam = await team
    .populate("developers.developer")
    .execPopulate();
  res.json(populatedTeam);
};

// const EnrollProject = async (req, res) => {
//   const { ProjectId } = req.body;
//   try {
//     const FindProject = await Team.findOne({ project: ProjectId });
//     if (!FindProject) {
//       const CreateTeam = await Team.create({
//         project: ProjectId,
//         administrator: req.id,
//         developers: [],
//       });

//       //here we push team id in project Schema...

//       await Project.findByIdAndUpdate(
//         ProjectId,
//         { team: CreateTeam._id },
//         { new: true }
//       );
//       return res.send(CreateTeam);
//     } else {
//       // here we checking the developer already present or not in team..

//       if (!FindProject.developers.includes(req.id)) {
//         let DeveloperArray = await Team.findOneAndUpdate(
//           { project: ProjectId },
//           { $push: { developers: req.id } },
//           { new: true }
//         );
//         return res.send(DeveloperArray);
//       } else {
//         return res.send("You already Involved in this Project..");
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Something went wrong.");
//   }
// };

//here we getting our own project and i have a part of that project..

const OwnProjectDetail = async (req, res) => {
  const findProject = await Project.find({}).populate("team"); //here we populating the team details..
  res.status(201).send(findProject);
};

module.exports = {
  CreateProject,
  GetProjects,
  EnrollProject,
  OwnProjectDetail,
};

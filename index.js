const express = require("express");
const app = express();
const path = require("path");
const { start } = require("repl");
const PORT = 5000;

// Sequelize init
const config = require('./src/config/config.json')
const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize(config.development)

// Local Module
const dataProject = require("./fake-data");
const distanceTime = require("./src/utils/count-duration.utils");

// Setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/public/views"));

// Set serving static file
app.use(express.static("src/assets"));

// Set parsing
app.use(express.urlencoded({ extended: false }));

// Get Routing
app.get("/", home);
app.get("/add-project", formProject);
app.get("/testimonial", testimonial);
app.get("/contact", contact);
app.get("/detail-project/:id", detailProject);
app.get("/delete-project/:id", deleteProject);
app.get("/update-project/:id", formUpdate);

// Post Routing
app.post("/add-project", addProject);
app.post("/updated-project/:id", updatedProject);

// Local Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Home
async function home(req, res) {
  try {
    const query = `SELECT name_project, start_date, end_date, description, technologies, image FROM tb_projects`
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT})

    const technologies = [
      {
        name: 'nodejs',
        isUsed: true,
      },
      {
        name: 'reactjs',
        isUsed: false,
      },
      {
        name: 'golang',
        isUsed: true,
      },
      {
        name: 'javascript',
        isUsed: true,
      }
    ]

    const data = obj.map(res => ({
      ...res
    }))

    res.render("index", { data });

  } catch (error) {
    console.log(error)
  }
}

// Add Project Method Get / Post
function formProject(req, res) {
  res.render("add-project");
}

function addProject(req, res) {
  const nameProject = req.body.inputProject;
  const startDate = req.body.inputStartDate;
  const endDate = req.body.inputEndDate;
  const duration = distanceTime(startDate, endDate);
  const description = req.body.inputDescription;

  // icon
  const node = '<i class="fa-brands fa-node-js"></i>';
  const golang = ' <i class="fa-brands fa-golang"></i>';
  const react = '<i class="fa-brands fa-react"></i>';
  const javascript = '<i class="fa-brands fa-square-js"></i>';

  const nodejsChecked = req.body.nodejs === "on" ? node : "";
  const golangChecked = req.body.golang === "on" ? golang : "";
  const reactjsChecked = req.body.reactjs === "on" ? react : "";
  const javascriptChecked = req.body.javascript === "on" ? javascript : "";

  const data = {
    nameProject,
    startDate,
    endDate,
    duration,
    description,
    nodejs: nodejsChecked,
    golang: golangChecked,
    reactjs: reactjsChecked,
    javascript: javascriptChecked,
  };

  console.log(data);

  dataProject.push(data);
  res.redirect("/");
}

// Testimonial
function testimonial(req, res) {
  res.render("testimonial");
}

// Contact
function contact(req, res) {
  res.render("contact");
}

// Detail Project
function detailProject(req, res) {
  const { id } = req.params;

  res.render("detail-project", { data: dataProject[id] });
}

// Delete Project
async function deleteProject(req, res) {
  const { id } = req.params;

  try {
    await sequelize.query(`DELETE FROM tb_projects WHERE id = :id`, {
      replacements: { id: id},
      type: QueryTypes.DELETE
    })

    res.redirect("/");
  } catch (error) {
    console.log(error)
  }
}

// Update Project
function formUpdate(req, res) {
  const { id } = req.params;

  res.render("update-project", { data: dataProject[id] });
}

// Processing Update
function updatedProject(req, res) {
  const { id } = req.params;
  const projectIndex = dataProject.findIndex((project) => project.id === id);
  const nameProject = req.body.inputProject;
  const startDate = req.body.inputStartDate;
  const endDate = req.body.inputEndDate;
  const duration = distanceTime(startDate, endDate);
  const description = req.body.inputDescription;

  const nodejsChecked = req.body.nodejs === "on" ? node : "";
  const golangChecked = req.body.golang === "on" ? golang : "";
  const reactjsChecked = req.body.reactjs === "on" ? react : "";
  const javascriptChecked = req.body.javascript === "on" ? javascript : "";

  const data = {
    nameProject,
    startDate,
    endDate,
    duration,
    projectIndex,
    description,
    nodejs: nodejsChecked,
    golang: golangChecked,
    reactjs: reactjsChecked,
    javascript: javascriptChecked,
  };

  dataProject.push(data);
  res.redirect("/");
}

const express = require("express");
const app = express();
const path = require("path");
const { start } = require("repl");
const PORT = 5000;

// Sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

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
    const query = `SELECT id, name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image FROM tb_projects`;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    const data = obj.map((res) => ({
      ...res,
    }));

    res.render("index", { data });
  } catch (error) {
    console.log(error);
  }
}

// Add Project Method Get / Post
function formProject(req, res) {
  res.render("add-project");
}

async function addProject(req, res) {
  try {
    const nameProject = req.body.inputProject;
    const startDate = req.body.inputStartDate;
    const endDate = req.body.inputEndDate;
    const duration = distanceTime(startDate, endDate);
    const description = req.body.inputDescription;
    const nodejs = req.body.nodejs;
    const golang = req.body.golang;
    const reactjs = req.body.reactjs;
    const javascript = req.body.javascript;

    const image = "image.png";

    // icon
    const nodejsCheck = nodejs ? true : false;
    const golangCheck = golang ? true : false;
    const reactjsCheck = reactjs ? true : false;
    const javascriptCheck = javascript ? true : false;

    const query = await sequelize.query(`
  INSERT INTO tb_projects (name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image)
  VALUES ('${nameProject}', '${startDate}', '${endDate}', '${description}', '${nodejsCheck}', '${golangCheck}', '${reactjsCheck}', '${javascriptCheck}', '${image}')
`);

    console.log(query); // Output the executed SQL query

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
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
async function detailProject(req, res) {
  try {
    const { id } = req.params;

    const query = `SELECT id, name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image FROM "tb_projects" WHERE id=${id}`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.render("detail-project", { project: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

// Delete Project
async function deleteProject(req, res) {
  const { id } = req.params;

  try {
    await sequelize.query(`DELETE FROM tb_projects WHERE id=${id}`);

    res.redirect("/");
  } catch (error) {
    console.log(error);
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

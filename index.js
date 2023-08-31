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
app.post("/update-project/:id", updatedProject);
// Local Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Home
async function home(req, res) {
  try {
    const query = `SELECT id, name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image, duration FROM tb_projects`;
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
    const {
      inputProject,
      inputStartDate,
      inputEndDate,
      inputDescription,
      nodejs,
      golang,
      reactjs,
      javascript,
    } =req.body

    const image = "image.png";
    const duration = distanceTime(inputStartDate, inputEndDate);

    // icon
    const nodejsCheck = nodejs ? true : false;
    const golangCheck = golang ? true : false;
    const reactjsCheck = reactjs ? true : false;
    const javascriptCheck = javascript ? true : false;

    const query = await sequelize.query(`
  INSERT INTO tb_projects (name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image, duration)
  VALUES ('${inputProject}', '${inputStartDate}', '${inputEndDate}', '${inputDescription}', '${nodejsCheck}', '${golangCheck}', '${reactjsCheck}', '${javascriptCheck}', '${image}', '${duration}')
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
async function formUpdate(req, res) {
  try {
    const { id } = req.params;
    const query = `SELECT *FROM tb_projects WHERE id=${id}`;

    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    res.render("update-project", { data: obj[0] });
  } catch (error) {
    console.log(error);
  }
}

// Processing Update
async function updatedProject(req, res) {
  try {
    const { id } = req.params;
    const { 
      inputProject, 
      inputStartDate, 
      inputEndDate, 
      inputDescription, 
      nodejs, 
      golang, 
      reactjs, 
      javascript
    } = req.body

    const duration = distanceTime(inputStartDate, inputEndDate)

    const image = 'imgae.png'

    const nodejsCheck = nodejs ? true : false;
    const golangCheck = golang ? true : false;
    const reactjsCheck = reactjs ? true : false;
    const javascriptCheck = javascript ? true : false;

    await sequelize.query(`
    UPDATE tb_projects SET name_project = '${inputProject}', start_date = '${inputStartDate}', end_date='${inputEndDate}', description='${inputDescription}', nodejs='${nodejsCheck}', golang='${golangCheck}', reactjs='${reactjsCheck}', javascript='${javascriptCheck}', image='${image}', duration='${duration}' WHERE id=${id}
  `);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

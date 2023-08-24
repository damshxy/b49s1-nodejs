const express = require("express");
const app = express();
const path = require("path");
const { start } = require("repl");
const PORT = 5000;

// Setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/public/views"));

// Set serving static file
app.use(express.static('src/assets'))

// Set parsing
app.use(express.urlencoded({ extended: false }))

// Get Routing
app.get('/', home)
app.get('/add-project', formProject)
app.get('/testimonial', testimonial)
app.get('/contact', contact)
app.get('/detail-project/:id', detailProject)

// Post Routing
app.post('/add-project', addProject)

// Local Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Home
function home(req, res) {
  res.render('index')
}

// Add Project Method Get / Post
function formProject(req, res) {
  res.render('add-project')
}

function addProject(req, res) {
  const nameProject = req.body.inputProject
  const startDate = req.body.inputStartDate
  const endDate = req.body.inputEndDate
  const description = req.body.inputDescription
  const nodejs = req.body.nodejs
  const golang = req.body.golang
  const reactjs = req.body.reactjs
  const javascript = req.body.javascript

  console.log(nameProject)
  console.log(startDate)
  console.log(endDate)
  console.log(description)
  console.log(nodejs)
  console.log(golang)
  console.log(reactjs)
  console.log(javascript)

  res.redirect('/')
}

// Testimonial
function testimonial(req, res) {
  res.render('testimonial')
}

// Contact
function contact(req,res) {
  res.render('contact')
}

// Detail Project
function detailProject(req,res) {
  const { id } = req.params

  const data = {
    id,
    title: "Dumbways Mobile App - 2022",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores a adipisci fugiat perspiciatis nisi magnam. Eum modi natus sunt quibusdam mollitia quod, maxime dolores. Porro rem officiis ad praesentium minima? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum pariatur nulla impedit, quasi, aliquam nesciunt consequuntur aliquid suscipit incidunt optio dolores, quis distinctio quae repellendus debitis aspernatur dolor error. Sit? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe, iste vero dolore delectus provident placeat explicabo, beatae tempora ratione alias eveniet sint laborum optio at omnis repellat mollitia odio aliquam."
  }

  res.render('detail-project', { data })
}
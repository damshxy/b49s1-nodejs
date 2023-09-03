const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require('bcrypt')
const session  = require('express-session')
const flash = require("express-flash");
const { start } = require("repl");
const PORT = 5000;

// Sequelize init
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes, DataTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

// Local Module
const distanceTime = require("./src/utils/count-duration.utils");
const upload = require('./src/middlewares/uploadFile')

// Setup call hbs with sub folder
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/public/views"));

// Set serving static file
app.use(express.static("src/assets"));
app.use(express.static("src/uploads"));

// Set parsing
app.use(express.urlencoded({ extended: false }));

// Setup Flash
app.use(flash())

// Setup Session
app.use(
  session({
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2,
    },
    store: new session.MemoryStore(),
    saveUninitialized: true,
    resave: false,
    secret: "secretValue",
  })
)

// Get Routing
app.get("/", home);
app.get("/add-project", formProject);
app.get("/testimonial", testimonial);
app.get("/contact", contact);
app.get("/detail-project/:id", detailProject);
app.get("/delete-project/:id", deleteProject);
app.get("/update-project/:id", formUpdate);
app.get('/login', formLogin)
app.get('/register', formRegister)
app.get('/logout', logout)

// Post Routing
app.post("/add-project", upload.single('inputImage'), addProject);
app.post("/update-project/:id", upload.single('inputImage'), updatedProject);
app.post('/login', login)
app.post('/register', register)

// Local Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Home
async function home(req, res) {
  try {
    const query = `
    SELECT tb_projects.id, name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image, duration, tb_users.name AS author FROM tb_projects LEFT JOIN tb_users ON tb_projects.author = tb_users.id ORDER BY tb_projects.id DESC 
    `;
    let obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    const data = obj.map((res) => ({
      ...res,
      isLogin: req.session.isLogin,
    }));

    res.render("index", { 
      data,
      isLogin: req.session.isLogin,
      user: req.session.user, 
    });
  } catch (error) {
    console.log(error);
  }
}

// Add Project Method Get / Post
function formProject(req, res) {
  res.render("add-project", {
    isLogin: req.session.isLogin,
    user: req.session.user
  });
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

    const image = req.file.filename;
    const duration = distanceTime(inputStartDate, inputEndDate);
    const author = req.session.idUser

    // icon
    const nodejsCheck = nodejs ? true : false;
    const golangCheck = golang ? true : false;
    const reactjsCheck = reactjs ? true : false;
    const javascriptCheck = javascript ? true : false;

    const query = await sequelize.query(`
  INSERT INTO tb_projects (name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image, duration, author)
  VALUES ('${inputProject}', '${inputStartDate}', '${inputEndDate}', '${inputDescription}', '${nodejsCheck}', '${golangCheck}', '${reactjsCheck}', '${javascriptCheck}', '${image}', '${duration}', '${author}')
`);

    console.log(query); // Output the executed SQL query

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
}

// Testimonial
function testimonial(req, res) {
  res.render("testimonial", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}

// Contact
function contact(req, res) {
  res.render("contact", {
    isLogin: req.session.isLogin,
    user: req.session.user,
  });
}

// Detail Project
async function detailProject(req, res) {
  try {
    const { id } = req.params;

    const query = `SELECT tb_projects.id, name_project, start_date, end_date, description, nodejs, golang, reactjs, javascript, image, tb_users.name AS author FROM "tb_projects" LEFT JOIN tb_users ON tb_projects.author = tb_users.id WHERE tb_projects.id=${id}`;
    const obj = await sequelize.query(query, { type: QueryTypes.SELECT });

    const project = obj.map((res) => ({
      ...res,
      isLogin: req.session.isLogin,
    }));

    res.render("detail-project", { 
      project,
      isLogin: req.session.isLogin,
      user: req.session.user, 
      idUser: req.session.idUser
    });
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
    const query = `SELECT * FROM tb_projects WHERE id=${id}`;

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

    const image = req.file.filename

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

// Form Login
function formLogin(req, res) {
  res.render('form-login')
}

async function login(req, res) {
 try {
  const {
    email,
    password
  } = req.body

  const query = `SELECT * FROM tb_users WHERE email = '${email}'`
  let obj = await sequelize.query(query, { type: QueryTypes.SELECT })

  // Kondisi jika email belum terdaftar
  if (!obj.length) {
    req.flash('danger', 'Email Belum Terdaftar')
    return res.redirect('/login')
  }

  await bcrypt.compare(password, obj[0].password, (err, result) => {
    if (!result) {
      req.flash('danger', 'Password Salah!!!')
      return res.redirect('/login')
    } else {
      req.session.isLogin = true
      req.session.idUser = obj[0].id
      req.session.user = obj[0].name
      req.flash('success', 'Login Berhasil!!!')
      res.redirect('/')
    }
  })

 } catch (error) {
  console.log(error)
 } 
}

// Form Register
function formRegister(req, res) {
  res.render('form-register')
}

async function register(req, res) {
  try {
    const {
      name,
      email,
      password
    } = req.body
    const salt = 10

    await bcrypt.hash(password, salt, (err, hashPassword) => {
      const query = `INSERT INTO tb_users (name, email, password) VALUES ('${name}','${email}', '${hashPassword}')`
      sequelize.query(query)
      res.redirect('/login')
    })
  } catch (error) {
    console.log(error)
  }
}

function logout(req, res) {
  if (req.session.isLogin) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/')
      }
    })
  } else {
    res.redirect('/')
  }
}
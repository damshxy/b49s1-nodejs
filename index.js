const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.get("/users", (req, res) => {
  res.send({
    id: 1,
    name: "SyencZ",
  });
});

app.listen(port, () => {
  console.log(`Port running in Port ${port}`);
});

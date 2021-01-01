const express = require("express");
const hbs = require("hbs");
const path = require("path");
require("./db/connector");
const User = require("./models/schema");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));

// public folder
app.use(express.static(`${path.join(__dirname, "public")}`));

// registerPartial
hbs.registerPartials(`${path.join(__dirname, "template/partials")}`);

app.set("view engine", "hbs");
app.set("views", `${path.join(__dirname, "template/views")}`);

// routing

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).redirect("/");
  } catch (error) {
    res.status(500).send(error);
  }
});


// listening Server

app.listen(port, () => {
  console.log(`server in running on ${port}`);
});

import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
import * as db from "./utils/database.js";

dotenv.config();

const app = express();
const port = 3000;

let projects = [];

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get('/', async (req, res, next) => {
  try {
    await db.connect();
    projects = await db.getAllProjects();
    if (projects.length > 0) {
      const randomNumber = Math.floor(Math.random() * projects.length);
      res.render("index.ejs", { projectArray: projects, featuredProj: projects[randomNumber] });
    } else {
      res.render("index.ejs", { projectArray: projects, featuredProj: null });
    }
  } catch (err) {
    next(err);
  }
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", { projects: projects });
});

app.get("/project/:id", (req, res, next) => {
  const id = req.params.id;
  if (id >= 0 && id < projects.length) {
    res.render("project.ejs", { projectArray: projects, thisProj: projects[id]});
  } else {
    const err = new Error("No project found with that ID");
    next(err);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get('/index', (req, res) => {
  if (projects.length > 0) {
    const randomNumber = Math.floor(Math.random() * projects.length);
    res.render("index.ejs", { projectArray: projects, featuredProj: projects[randomNumber] });
  } else {
    res.render("index.ejs", { projectArray: projects, featuredProj: null });
  }
});

app.post("/mail", async (req, res) => {
  try {
    await utils.sendMessage(req.body.sub, req.body.txt);
    res.send({ result: "Your message was sent successfully!" });
  } catch (err) {
    console.error(err);
    res.send({ result: "Failure to send message." });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.render("error.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

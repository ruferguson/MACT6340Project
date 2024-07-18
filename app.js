import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
import * as db from "./utils/database.js";

dotenv.config();
import cors from "cors";
const app = express();
app.use(cors());
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

// custom 404
app.use((req, res, next) => {
  res.status(404).render("error.ejs")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render("error.ejs")
})

app.use((err, req, res, next) => {
  console.error(err);
  res.render("error.ejs");
});

app.use(async (err, req, res, next) => {
  console.log(err);
  let msg;
  msg = err.message;
  if (msg != "No project with that ID") {
    msg = 
      "There was an internal error. Apologies. We are working to clean up the mess."
  }
  res.render("error.ejs", {msg: msg});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

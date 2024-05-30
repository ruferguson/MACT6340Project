import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("index.ejs");
})

app.get("/projects", (req, res) => {
  res.render("projects.ejs");
})

app.get("/project", (req, res) => {
  res.render("project.ejs");
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
})

app.get('/index', (req, res) => {
  res.render("index.ejs");
})

app.post("/mail", async (req, res) => {
  await utils
    .sendMessage(req.body.sub, req.body.txt)
    .then(() => {
      res.send({ result: "Your message was sent successfully!" });
    })
    .catch(() => {
      res.send({ result: "Failure to send message." });
    });
});

app.listen(port, () => {
  console.log(process.env.SENSITIVE_INFO);
  console.log(`Example app listening on port ${port}`);
})

const express = require("express");
const morgan = require("morgan");
const app = express();
const helmet = require("helmet");
const path = require("path");

require("dotenv").config();

express.static("public");

//helmet middleware to secure Express apps by setting various HTTP headers
app.use(helmet());

app.use(express.json());
app.use(morgan("dev"));

const checkLoggedIn = (req, res, next) => {
  const isLoggedIn = 1;
  if (!isLoggedIn) {
    res.status(401).send("Please log in");
  } else {
    next();
  }
};

app.get("/auth/google", (req, res) => {});

app.get("/auth/google/callback", (req, res) => {});

app.get("/auth/logout", (req, res) => {});

app.get("/secret", checkLoggedIn, (req, res) => {
  res.send("<h1>Secret page</h1>");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;

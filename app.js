const express = require("express");
const morgan = require("morgan");
const app = express();

require("dotenv").config();

express.static("public");

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World!" });
});

module.exports = app;

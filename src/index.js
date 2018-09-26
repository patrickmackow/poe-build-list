const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Require models
const Build = require("./models/Build");

// Mongoose setup
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    dbName: process.env.MONGO_DB_NAME
  }
);
mongoose.Promise = Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();
const port = 3000;

app.get("/builds", (req, res) => {
  Build.find({}).then(builds => res.json(builds));
});

app.get("/builds/:class", (req, res) => {
  Build.find({ gameClass: req.params.class }).then(builds => res.json(builds));
});

app.get("/tags/:tags", (req, res) => {
  const tags = req.params.tags.split(",");
  Build.find({ generatedTags: { $all: tags } }).then(builds => {
    res.json(builds);
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));

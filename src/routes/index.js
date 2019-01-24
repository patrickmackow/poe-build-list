const express = require("express");
const router = express.Router();

const tags = require("../lib/tags.json");
const latestVersion = require("../config.json").latestVersion;

// Require models
const Build = require("../models/Build");

router.get("/builds", (req, res) => {
  Build.find({ version: latestVersion })
    .sort({ views: "desc" })
    .limit(100)
    .then(builds => res.json(builds));
});

router.get("/builds/:class", (req, res) => {
  Build.find({ gameClass: req.params.class }).then(builds => res.json(builds));
});

router.get("/tags", (req, res) => {
  res.json(Object.keys(tags).sort());
});

router.get("/tags/:tags", (req, res) => {
  const tags = req.params.tags.split(",");
  Build.find({ "generatedTags.tag": { $all: tags } }).then(builds => {
    res.json(builds);
  });
});

module.exports = router;

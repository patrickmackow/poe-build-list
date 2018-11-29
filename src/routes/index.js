const express = require("express");
const router = express.Router();

// Require models
const Build = require("../models/Build");

router.get("/builds", (req, res) => {
  Build.find({ version: "3.4" }) // TODO: Extract latest version into a variable
    .sort({ views: "desc" })
    .limit(100)
    .then(builds => res.json(builds));
});

router.get("/builds/:class", (req, res) => {
  Build.find({ gameClass: req.params.class }).then(builds => res.json(builds));
});

router.get("/tags", (req, res) => {
  Build.distinct("generatedTags").then(tags => {
    res.json(tags.sort());
  });
});

router.get("/tags/:tags", (req, res) => {
  const tags = req.params.tags.split(",");
  Build.find({ generatedTags: { $all: tags } }).then(builds => {
    res.json(builds);
  });
});

module.exports = router;

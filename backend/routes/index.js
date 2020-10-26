const express = require("express");
const router = express.Router();

const tags = require("../lib/tags.json");

// Require models
const Build = require("../models/Build");
const Config = require("../models/Config");

router.get("/builds", async (req, res) => {
  const version = (await Config.findOne({ key: "version" }).exec()) || {
    value: "3.11",
  };

  Build.find({ version: version.value })
    .sort({ views: "desc" })
    .limit(100)
    .then((builds) => res.json(builds))
    .catch((err) => {
      res.status(500).json({ error: err ? err : "Server Error" });
    });
});

router.get("/builds/:class", (req, res) => {
  Build.find({ gameClass: req.params.class })
    .then((builds) => res.json(builds))
    .catch((err) => {
      res.status(500).json({ error: err ? err : "Server Error" });
    });
});

router.get("/tags", (req, res) => {
  res.json(Object.keys(tags).sort());
});

router.get("/tags/:tags", (req, res) => {
  const tags = req.params.tags.split(",");
  Build.find({ "generatedTags.tag": { $all: tags } })
    .then((builds) => {
      res.json(builds);
    })
    .catch((err) => {
      res.status(500).json({ error: err ? err : "Server Error" });
    });
});

router.get("/version", (req, res) => {
  Config.findOne({ key: "version" }).then(({ value }) => {
    res.json({ version: value });
  });
});

module.exports = router;

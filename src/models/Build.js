const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const buildSchema = new Schema({
  title: { type: String },
  author: { type: String },
  url: { type: String, unique: true },
  views: { type: Number },
  replies: { type: Number },
  createdOn: { type: Date },
  latestPost: { type: Date },
  gameClass: { type: String },
  version: { type: String },
  generatedTags: [{ tag: { type: String }, type: { type: String } }],
  updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Build", buildSchema);

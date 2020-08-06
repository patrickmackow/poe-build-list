const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configSchema = new Schema({
  key: { type: String },
  value: { type: String },
});

module.exports = mongoose.model("Config", configSchema);

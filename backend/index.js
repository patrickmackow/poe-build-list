const express = require("express");

const mongoose = require("mongoose");
const { mongooseConfig } = require("./config.json");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./env") });

// Require routes
const routes = require("./routes");

// Mongoose setup
mongoose
  .connect(process.env.MONGO_URL, {
    ...mongooseConfig,
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();
const port = 3001;

// Use routes
app.use("/api", routes);

app.listen(port, () => console.log(`Server running on port ${port}`));

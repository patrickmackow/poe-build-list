const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Require routes
const routes = require("./routes");

// Mongoose setup
mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      dbName: process.env.MONGO_DB_NAME
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// mongoose.Promise = Promise;

const app = express();
const port = 3001;

// Use routes
app.use("/api", routes);

app.listen(port, () => console.log(`Server running on port ${port}`));

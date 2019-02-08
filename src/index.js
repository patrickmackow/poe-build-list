const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

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
const port =
  process.env.NODE_ENV && process.env.NODE_ENV == "production" ? 3000 : 3001;

// Use routes
app.use("/api", routes);

// Serve React build if NODE_ENV is set to production
if (process.env.NODE_ENV && process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));

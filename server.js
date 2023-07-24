require("dotenv").config();
// const cors = require('cors');

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const path = require("path");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.static(path.join(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 4000;
// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to the database");
    // listen to port
    app.listen(port, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

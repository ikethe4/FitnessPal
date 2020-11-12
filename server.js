const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require("path");
const { Db } = require("mongodb");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true, useFindAndModify: false });

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

//find a way to populate db with seed.js

//Where are these things linked/exported?

//post route to add workout to workout plan (new workout button)
app.post("/api/workouts", ({ body }, res) => {
  // create new workout with type, name, duration, weight, reps, sets, distance
  });

//put route to add exercises to a previous workout plan (continue workout button)

//look at example 9

//Get route to add the combined weight of multiple exercises on the `stats` page. (no button for this currently)

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

  

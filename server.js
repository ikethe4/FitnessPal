const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models/");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})

//put route to add exercises to a previous workout plan (continue workout button)
app.put("/api/workouts/:id"), ({body, params}, res) =>{
  db.Workout.findByIdAndUpdate(
    params.id,
    {$push: {exercises: body}},
    {new: true}
  ).then(data =>{
        res.json(data);
      })
      .catch(err=> {
        res.json(err)
      })
}

//post route to add workout to workout plan (new workout button)

app.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body).then(data =>{
    res.json(data)
  })
});

//look at example 9

// Get route to add the combined weight of multiple exercises on the `stats` page. (no button for this currently)
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}).then(function(workout){
    console.log("hey");
    res.json(workout);
  })
})

app.get("/api/workouts/range", (req, res) => {
  db.Workout.find().then(function(workout){
    console.log("hey");
    res.json(workout);
  })
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

  

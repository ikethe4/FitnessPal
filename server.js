const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
})





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
   
    res.json(workout);
  })
})

//put route to add exercises to a previous workout plan (continue workout button)
app.put("/api/workouts/:id"), (req, res) => {
  const id = req.params.id
  db.Workout.findByIdAndUpdate(
    params.id,
    {$push: {exercises: body}},
    {new: true, runValidators: true}
  ).then(data =>{
        res.json(data);
      })
      .catch(err=> {
        res.json(err)
      })
}

//post route to add workout to workout plan (new workout button)

app.post("/api/workouts", function(req, res){
  db.Workout.create({}).then(data =>{
    res.json(data)
  })
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });

  

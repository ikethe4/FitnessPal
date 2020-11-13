const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "enter an exercise type"

    },
    name: {
      type: String,
      trim: true,
      required: "enter an exercise"

    },
    duration: {
      type: Number

    },
    weight: {
      type: Number

    },
    reps: {
      type: Number
    },
    sets: {
      type: Number
    },
    distance: {
      type: Number

    }
  }]

//i'm going to log out and back in and see if that fixes my audio
});

const Workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;

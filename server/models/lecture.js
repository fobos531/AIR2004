const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  type: {
    type: String,
    enum: ["Lecture", "Seminar", "Lab"],
    required: true,
  },
  timeStart: {
    type: Date,
    default: Date.now,
    required: false,
  },
  timeEnd: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);

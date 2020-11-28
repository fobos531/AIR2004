const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  passcode: {
    type: String,
    required: true,
    unique: true,
    validate: /^[0-9]{8}$/,
  },
  allowedAbsences: {
    type: Number,
    default: 3,
    required: true,
  },
});

courseSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Course", courseSchema);

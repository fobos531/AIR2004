const mongoose = require("mongoose");
const Email = require("mongoose-type-email");

const userSchema = mongoose.Schema({
  email: {
    type: Email,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  jmbag: {
    type: String,
    required: true,
    validate: /^[0-9]{10}$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: /^([0-9]{10,15})$/,
  },
  userType: {
    type: String,
    enum: ["Student", "Teacher", "Admin"],
    default: "Student",
  },
});

module.exports = mongoose.model("User", userSchema);

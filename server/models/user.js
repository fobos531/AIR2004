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

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", userSchema);

const bcrypt = require("bcrypt");
const Attendance = require("../models/attendance");

exports.add = async (req, res) => {
  try {
    await new Attendance({
      ...req.body,
    }).save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const allAttendances = await Attendance.find();
    const data = allAttendances.map((attendance) => attendance.toJSON());

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

exports.markAttendance = async (req, res) => {
  const { code, user } = req.body;

  try {
    // Update attendance document with the code
    await Attendance.findOneAndUpdate({ code }, { $set: { user } });

    // Send response to the tablet

    // TODO

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

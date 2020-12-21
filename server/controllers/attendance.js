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

  console.log(req.body);

  try {
    // Update attendance document with the code
    await Attendance.findOneAndUpdate({ code }, { $set: { user } });

    // Send response to the tablet
    let tabletSocket;
    for (let socket of global.io.of("/").sockets.values()) if (socket.codes?.includes(code)) tabletSocket = socket;
    if (tabletSocket) {
      tabletSocket.codes = tabletSocket.codes.filter((c) => c === code);
      tabletSocket.emit("scanSucess");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

const Attendance = require("../models/attendance");
const User = require("../models/user");

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
  const { code: qrCode, user, lecture, attendanceToken } = req.body;

  try {
    // Update attendance document with the code
    const attendance = await Attendance.findOneAndUpdate({ qrCode, user: null }, { $set: { user } }, { new: true });
    if (!attendance) return res.status(400).json({ success: false });

    // Generate new qr code and send it to the tablet
    const newAttendance = await new Attendance({ lecture }).save();
    global.io.of("/tablet").to(attendanceToken).emit("attendance code", { code: newAttendance.qrCode });

    // Send the marked attendance to the teacher
    // const user = await User

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

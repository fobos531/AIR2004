const Attendance = require("../models/attendance");

exports.add = async (req, res) => {
  try {
    await new Attendance({ ...req.body }).save();
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
    const attendance = await Attendance.findOneAndUpdate({ qrCode, user: null }, { $set: { user, modifiedAt: Date.now() } }, { new: true });

    // If the update didn't succeed (the qrCode is either invalid or it has been already used) return 400
    if (!attendance) return res.status(400).json({ success: false });

    // Generate new attendance (qrCode) entry
    const newAttendance = await new Attendance({ lecture }).save();

    // Send the new attendance qrCode to the tablet
    global.io.of("/tablet").to(attendanceToken).emit("attendance code", { code: newAttendance.qrCode });

    // Send the attendance to the mobile app along with the user data who marked the attendance
    const markedAttendance = await Attendance.findById(attendance.id).populate("user", "name surname");
    global.io.of("/teacher").to(attendanceToken).emit("new attendance", markedAttendance);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

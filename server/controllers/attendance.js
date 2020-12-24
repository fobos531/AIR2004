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
  const { code, user, lecture, attendanceToken } = req.body;

  // Salje se sljedece: userId, qrCode, attendanceToken, lectureId
  // TODO: provjere je li vec zabiljezen attendance za taj document, postoji li attendance document s tim codeom
  console.log(req.body);

  try {
    // Update attendance document with the code
    await Attendance.findOneAndUpdate({ code }, { $set: { user } });

    // Generate new qr code and send it to the tablet
    const attendance = await new Attendance({ lecture }).save();
    global.io.of("/tablet").to(attendanceToken).emit("attendance code", { code: attendance.qrCode });

    // Send the marked attendance to the teacher

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

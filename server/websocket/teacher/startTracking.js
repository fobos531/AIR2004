const Attendance = require("../../models/attendance");

const startTracking = async (socket, data) => {
  const attendanceToken = Array.from(socket.rooms)[1];

  const lecture = data.lecture;
  const attendance = await new Attendance({ lecture }).save();

  global.io.of("/tablet").to(attendanceToken).emit("attendance code", { code: attendance.qrCode });
};

module.exports = startTracking;

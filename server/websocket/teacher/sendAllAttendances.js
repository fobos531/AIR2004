const Attendance = require("../../models/attendance");

const sendAllAttendances = async (socket, fetchLectureAttendance) => {
  // Fetch all attendances
  const attendances = await Attendance.find({ lecture: fetchLectureAttendance, user: { $ne: null } })
    .populate("user", "name surname")
    .sort({ modifiedAt: -1 });

  // Send all attendances to the mobile app
  socket.emit("all attendances", attendances);
};

module.exports = sendAllAttendances;

const Attendance = require("../../models/attendance");

// Creates a new attendance document in the database with a random generated qrCode property
// which is sent to the tablet where the QR code is generated based on that qrCode property
const createAttendance = async (lecture, token) => {
  console.log(lecture, token);

  const attendance = await new Attendance({ lecture }).save();

  let tabletSocket;
  for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.token == token) tabletSocket = socket;
  if (tabletSocket) tabletSocket.emit("attendanceCode", { code: attendance.qrCode });
};

module.exports = createAttendance;

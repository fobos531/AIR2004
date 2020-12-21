const Attendance = require("../../models/attendance");

// Creates a new attendance document in the database with a random generated qrCode property
// which is sent to the tablet where the QR code is generated based on that qrCode property
const createAttendance = async (socket, lecture, token) => {
  // Generate the code and save it to the database
  const attendance = await new Attendance({ lecture }).save();

  // Save that code to that socket
  if (socket.codes) socket.codes = [...socket.codes, attendance.qrCode];
  else socket.codes = [attendance.qrCode];

  console.log(socket.codes);

  // Send the code to the tablet
  let tabletSocket;
  for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.token == token) tabletSocket = socket;
  if (tabletSocket) tabletSocket.emit("attendanceCode", { code: attendance.qrCode });
};

module.exports = createAttendance;

const crypto = require("crypto");

const generateAttendanceToken = (socket) => {
  // Generate attendance token
  const attendanceToken = crypto.randomBytes(64).toString("hex");
  console.log(attendanceToken);
  // Send the token back to tablet
  socket.emit("attendance token generated", attendanceToken);

  // Join tablet socket in the room for that attendance token
  socket.join(attendanceToken);
};

module.exports = generateAttendanceToken;

const startTracking = require("./startTracking");
const signOutTablet = require("./signOutTablet");

const teacherNamespace = (socket) => {
  // When mobile app connects
  const { attendanceToken } = socket.handshake.query;
  socket.join(attendanceToken);

  // When teacher clicks sign out of the tablet button or when he stops the tracking
  socket.on("sign out tablet", (data) => signOutTablet(data));

  // When teacher clicks start tracking button
  socket.on("start tracking", (data) => startTracking(socket, data));
};

module.exports = teacherNamespace;

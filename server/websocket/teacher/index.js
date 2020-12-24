const startTracking = require("./startTracking");

const teacherNamespace = (socket) => {
  // When mobile app connects
  const { attendanceToken } = socket.handshake.query;
  socket.join(attendanceToken);

  // When eacher clicks sign out of the tablet button
  //   socket.on("sign out tablet");

  // When teacher clicks start tracking button
  socket.on("start tracking", (data) => startTracking(socket, data));

  //   // When teacher clicks stop tracking button
  //   socket.on("stop tracking");
};

module.exports = teacherNamespace;

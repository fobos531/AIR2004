const startTracking = require("./startTracking");
const signOutTablet = require("./signOutTablet");
const sendAllAttendances = require("./sendAllAttendances");

const teacherNamespace = (socket) => {
  const { attendanceToken, fetchLectureAttendance } = socket.handshake.query;

  // When mobile app connects join the attendanceToken room
  socket.join(attendanceToken);

  //
  if (fetchLectureAttendance) sendAllAttendances(socket, fetchLectureAttendance);

  // When teacher clicks sign out of the tablet button or when he stops the tracking
  socket.on("sign out tablet", (data) => signOutTablet(data));

  // When teacher clicks start tracking button
  socket.on("start tracking", (data) => startTracking(socket, data));
};

module.exports = teacherNamespace;

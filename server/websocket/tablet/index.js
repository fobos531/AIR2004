const generateAttendanceToken = require("./generateAttendanceToken");
const lectureSelected = require("./lectureSelected");

const tabletNamespace = (socket) => {
  // When tablet connects, generate random token, send it back and join the socket.io room of that token
  // If the generated token is let's say equal to "abcd", then the tablet socket connection is now
  // joined in the /tablet namespace in the "abcd" room
  generateAttendanceToken(socket);

  // When teacher selects the lecture and lecture type on the tablet
  socket.on("lecture selected", (data) => lectureSelected(socket, data));
};

module.exports = tabletNamespace;

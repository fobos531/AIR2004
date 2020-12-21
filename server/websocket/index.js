const onConnect = require("./onConnect");
const onSelectedLectureType = require("./onSelectedLectureType");
const onSignOutTablet = require("./onSignOutTablet");
const onStartTracking = require("./onStartTracking");
const createAttendance = require("./utils/createAttendance");

const websocket = (server) => {
  global.io = require("socket.io")(server);
  console.log("WebSocket server started!");

  global.io.on("connect", (socket) => {
    // When tablet app connects, generate random token and send it back
    onConnect(socket);

    // When teacher selects the lecture type on the tablet, notify his mobile app
    socket.on("selectedLectureType", (data) => onSelectedLectureType(socket, data));

    // When teacher signs out of the tablet
    socket.on("signOutTablet", (data) => onSignOutTablet(data));

    // When teacher starts tracking attendance
    socket.on("startTrackingAttendance", (data) => onStartTracking(data));

    // Sent by the tablet to the server to generate a new QR code for attendance
    socket.on("generateQR", ({ lectureId, token }) => createAttendance(lectureId, token));
  });
};

module.exports = websocket;

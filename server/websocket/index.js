const onConnect = require("./onConnect");
const onSelectedLectureType = require("./onSelectedLectureType");
const onSignOutTablet = require("./onSignOutTablet");
const onStartTracking = require("./onStartTracking");
const createAttendance = require("./utils/createAttendance");

const tabletNamespace = require("./tablet");
const teacherNamespace = require("./teacher");

const websocket = (server) => {
  global.io = require("socket.io")(server);
  console.log("WebSocket server started!");

  const teacher = io.of("/teacher");
  const tablet = io.of("/tablet");

  // Namespace to which the teacher connects using mobile app
  // Contains logic of all socket messages that are sent to the mobile application by the teacher
  teacher.on("connection", teacherNamespace);

  // Namespace to which the tablet application conencts to
  // Contains logic for all socket messages that are sent to the tablet to the server.
  tablet.on("connection", tabletNamespace);

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
    socket.on("generateQR", ({ lectureId, token }) => createAttendance(socket, lectureId, token));
  });
};

module.exports = websocket;

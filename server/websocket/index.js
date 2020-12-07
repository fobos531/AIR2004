const onConnect = require("./onConnect");
const onSelectedLectureType = require("./onSelectedLectureType");
const onSignOutTablet = require("./onSignOutTablet");

const websocket = (server) => {
  global.io = require("socket.io")(server);
  console.log("WebSocket server started!");

  global.io.on("connect", (socket) => {
    // When tablet app connects, generate random token and send it back
    onConnect(socket);

    // When teacher selects the lecture type on the tablet, notify his mobile app
    socket.on("selectedLectureType", (data) => onSelectedLectureType(data));

    // When teacher signs out of the tablet
    socket.on("signOutTablet", (data) => onSignOutTablet(data));
  });
};

module.exports = websocket;

const crypto = require("crypto");

const websocket = (server) => {
  global.io = require("socket.io")(server);
  console.log("WebSocket server started!");

  // When tablet app connects, generate random token and send it back
  global.io.on("connect", (socket) => {
    if (socket.handshake.query.userToken) {
      socket.data = { userToken: socket.handshake.query.userToken };
    }
    socket.data = { ...socket.data, token: crypto.randomBytes(64).toString("hex") };
    socket.emit("tokenReceived", { token: socket.data.token });
    console.log(socket.data.token);

    socket.on("selectedLectureType", (data) => {
      console.log("INCOMING REQUEST");
      let lectureType = data.lectureType;
      let userToken = data.userToken;
      let courseName = data.courseName;

      let mobileSocket;

      //trebamo javiti Mobitelu koji lecture type smo odabrali
      for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.userToken == userToken) mobileSocket = socket;

      console.log("MOBILE SOCKET", mobileSocket);
      // Tablet dok se prijavi dobi informacije o tome koji profesor se prijavio (to se vidi iz tokena)
      mobileSocket.emit("selectedLectureType", { lectureType, courseName });
      // Dok se profesosr na mobitelu prvi put prijavi, on mora u socket connectionu poslati i svoj token
      // i dok na tabletu odabere tip predmeta, u payloadu se šalje i profesorov token
      // šalje se na socket (mobitel) koji ima taj token
    });

    socket.on("signOutTablet", (data) => {
      const token = data.token;
      console.log("DATA", data);
      let tabletSocket;
      for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.token == token) tabletSocket = socket;

      tabletSocket.emit("signOutTablet");
      console.log("I HAVE EMITTED");
    });
  });
};

module.exports = websocket;

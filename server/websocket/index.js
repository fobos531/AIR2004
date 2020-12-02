const crypto = require("crypto");

const websocket = (server) => {
  global.io = require("socket.io")(server);
  console.log("WebSocket server started!");

  // When tablet app connects, generate random token and send it back
  global.io.on("connect", (socket) => {
    socket.data = { token: crypto.randomBytes(64).toString("hex") };
    socket.emit("tokenReceived", { token: socket.data.token });
    console.log(socket.data.token);

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

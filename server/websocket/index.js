const crypto = require("crypto");

const websocket = (server) => {
  global.io = require("socket.io")(server);
  console.log("WebSocket server started!");

  // When tablet app connects, generate random token and send it back
  global.io.on("connect", (socket) => {
    socket.data = { token: crypto.randomBytes(64).toString("hex") };
    socket.emit("tokenReceived", { token: socket.data.token });
  });
};

module.exports = websocket;

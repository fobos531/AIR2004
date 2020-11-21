const crypto = require("crypto");

const websocket = (server) => {
  const io = require("socket.io")(server);

  console.log("WebSocket server started!");

  // Generate random token and send it back
  io.on("connect", (socket) => {
    console.log("Connected");

    const token = crypto.randomBytes(64).toString("hex");
    socket.emit("tokenReceived", { token });
  });
};

module.exports = websocket;

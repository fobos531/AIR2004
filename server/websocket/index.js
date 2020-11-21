const websocket = (server) => {
  const io = require("socket.io")(server);

  io.on("connect", (socket) => {
    console.log("Connected");
  });

  console.log("WebSocket server started!");
};

module.exports = websocket;

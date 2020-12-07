const crypto = require("crypto");

const onConnect = (socket) => {
  if (socket.handshake.query.userToken) {
    socket.data = { userToken: socket.handshake.query.userToken };
  }
  socket.data = { ...socket.data, token: crypto.randomBytes(64).toString("hex") };
  socket.emit("tokenReceived", { token: socket.data.token });
};

module.exports = onConnect;

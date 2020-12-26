const onStartTracking = ({ token }) => {
  let tabletSocket;
  for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.token == token) tabletSocket = socket;
  tabletSocket.emit("startTrackingAttendance");
};

module.exports = onStartTracking;
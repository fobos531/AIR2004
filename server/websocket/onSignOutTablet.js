const onSignOutTablet = ({ token }) => {
  let tabletSocket;
  for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.token == token) tabletSocket = socket;
  if (tabletSocket) abletSocket.emit("signOutTablet");
};

module.exports = onSignOutTablet;

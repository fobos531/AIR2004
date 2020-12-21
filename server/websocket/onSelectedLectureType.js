const onSelectedLectureType = ({ lectureType, userToken, courseName }) => {
  let mobileSocket;

  // Trebamo javiti Mobitelu koji lecture type smo odabrali
  for (let socket of global.io.of("/").sockets.values()) if (socket.data && socket.data.userToken == userToken) mobileSocket = socket;

  // Tablet dok se prijavi dobi informacije o tome koji profesor se prijavio (to se vidi iz tokena)
  if (mobileSocket) mobileSocket.emit("selectedLectureType", { lectureType, courseName });

  // Dok se profesosr na mobitelu prvi put prijavi, on mora u socket connectionu poslati i svoj token
  // i dok na tabletu odabere tip predmeta, u payloadu se šalje i profesorov token
  // šalje se na socket (mobitel) koji ima taj token
};

module.exports = onSelectedLectureType;

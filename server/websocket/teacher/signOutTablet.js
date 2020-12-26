const signOutTable = (data) => {
  global.io.of("/tablet").to(data.attendanceToken).emit("sign out tablet");
};

module.exports = signOutTable;

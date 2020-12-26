const Lecture = require("../../models/lecture");

const lectureSelected = async (socket, data) => {
  const lectureType = data.lectureType;
  const courseId = data.selectedCourse.id;

  console.log(data);

  // Create the lecture
  const lecture = await new Lecture({ course: courseId._id, type: lectureType }).save();

  // Send back the lecture id to the tablet
  socket.emit("lecture created", lecture);

  // Send the selected course back to the mobile app
  const attendanceToken = Array.from(socket.rooms)[1];
  global.io.of("/teacher").to(attendanceToken).emit("lecture selected", { lecture, course: data.selectedCourse });
};

module.exports = lectureSelected;

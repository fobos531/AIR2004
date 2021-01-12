export const signIn = (user) => {
  return {
    type: "SIGN_IN",
    user,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const setCourseInProgress = (courseInProgress) => {
  return {
    type: "SET_COURSE_IN_PROGRESS",
    courseInProgress,
  };
};

export const createLecture = (lecture) => {
  return {
    type: "CREATE_LECTURE",
    lecture,
  };
};

export const setAttendanceToken = (attendanceToken) => {
  return {
    type: "SET_ATTENDANCE_TOKEN",
    attendanceToken,
  };
};

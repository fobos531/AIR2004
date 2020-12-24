const initialState = {
  email: null,
  token: null,
  name: null,
  surname: null,
  courseInProgress: null,
  lecture: null,
  attendanceToken: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN": {
      return {
        ...state,
        email: action.user.email,
        token: action.user.token,
        name: action.user.name,
        surname: action.user.surname,
        attendanceToken: action.user.attendanceToken,
      };
    }
    case "SIGN_OUT": {
      return initialState;
    }
    case "SET_COURSE_IN_PROGRESS": {
      return {
        ...state,
        courseInProgress: action.courseInProgress,
      };
    }
    case "CREATE_LECTURE": {
      return {
        ...state,
        lecture: action.lecture,
      };
    }

    case "SET_ATTENDANCE_TOKEN":
      return {
        ...state,
        attendanceToken: action.attendanceToken,
      };

    default:
      return state;
  }
};

export default userReducer;

const initialState = {
  userId: null,
  name: null,
  surname: null,
  token: null,
  userType: null,
  attendanceToken: null,
  courseSelectedOnTablet: null,
  trackingStarted: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        userId: action.user.userId,
        name: action.user.name,
        surname: action.user.surname,
        token: action.user.token,
        userType: action.user.userType,
      };
    case "SIGN_IN_TABLET":
      return {
        ...state,
        attendanceToken: action.attendanceToken,
      };
    case "SIGN_OUT":
      return initialState;

    case "SIGN_OUT_TABLET":
      return {
        ...state,
        attendanceToken: null,
        courseSelectedOnTablet: null,
      };

    case "SET_COURSE_SELECTED_ON_TABLET":
      return {
        ...state,
        courseSelectedOnTablet: action.courseSelectedOnTablet,
      };

    case "START_TRACKING":
      return {
        ...state,
        trackingStarted: true,
      };

    default:
      return state;
  }
};

export default userReducer;

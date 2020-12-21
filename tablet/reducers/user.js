const initialState = {
  email: null,
  token: null,
  name: null,
  surname: null,
  courseInProgress: null,
  lecture: null,
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

    default:
      return state;
  }
};

export default userReducer;

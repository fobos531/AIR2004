const initialState = {
  email: null,
  token: null,
  name: null,
  surname: null,
  courseInProgress: null,
};

const userReducer = (state = initialState, action) => {
  console.log(action);
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
    default:
      return state;
  }
};

export default userReducer;

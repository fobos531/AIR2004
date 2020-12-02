const initialState = {
  name: null,
  surname: null,
  token: null,
  userType: null,
  tabletSocketToken: null,
  courseSelectedOnTablet: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        name: action.user.name,
        surname: action.user.surname,
        token: action.user.token,
        userType: action.user.userType,
      };
      case "SIGN_IN_TABLET":
        return {
          ...state, 
          tabletSocketToken: action.tabletSocketToken
        };
    case "SIGN_OUT":
      return initialState;
    case "SIGN_OUT_TABLET":
        return {
          ...state,
          tabletSocketToken: null,
          courseSelectedOnTablet: null,
        };
    case "SET_COURSE_SELECTED_ON_TABLET":
        return {
          ...state,
          courseSelectedOnTablet: action.courseSelectedOnTablet
        };    
    default:
      return state;
  }
};

export default userReducer;

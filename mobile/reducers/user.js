const initialState = {
  name: null,
  surname: null,
  token: null,
  userType: null,
  tabletSocketToken: null,
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
          tabletSocketToken: null
        };
    default:
      return state;
  }
};

export default userReducer;

const initialState = {
  name: null,
  surname: null,
  token: null,
  userType: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        name: action.user.name,
        surname: action.user.surname,
        token: action.user.token,
        userType: action.user.userType,
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;

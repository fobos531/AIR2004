const initialState = {
  name: null,
  token: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        name: action.name,
        token: action.token,
      };
    case "SIGN_OUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;

const initialState = {
  loggedUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, loggedUser: action.user };
    case "LOG_OUT":
      return initialState;
    default:
      return state;
  }
};

export default userReducer;

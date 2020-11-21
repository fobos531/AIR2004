const initialState = {
  email: null,
  token: null,
  name: null,
  surname: null,
};

const userReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "SIGN_IN": {
      return {
        email: action.user.email,
        token: action.user.token,
        name: action.user.name,
        surname: action.user.surname,
      };
    }
    case "SIGN_OUT": {
      return initialState;
    }
    default:
      return state;
  }
};

export default userReducer;

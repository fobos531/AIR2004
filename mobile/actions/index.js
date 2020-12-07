export const signIn = (user) => {
  return {
    type: "SIGN_IN",
    user: user,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

export const signInTablet = (tabletSocketToken) => {
  return {
    type: "SIGN_IN_TABLET",
    tabletSocketToken
  };
};

export const setCourseSelectedOnTablet = (courseSelectedOnTablet) => {
  return {
    type: "SET_COURSE_SELECTED_ON_TABLET",
    courseSelectedOnTablet
  };
};

export const signOutTablet = () => {
  return {
    type: "SIGN_OUT_TABLET",
  };
};


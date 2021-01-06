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

export const signInTablet = (attendanceToken) => {
  return {
    type: "SIGN_IN_TABLET",
    attendanceToken,
  };
};

export const setCourseSelectedOnTablet = (courseSelectedOnTablet) => {
  return {
    type: "SET_COURSE_SELECTED_ON_TABLET",
    courseSelectedOnTablet,
  };
};

export const signOutTablet = () => {
  return {
    type: "SIGN_OUT_TABLET",
  };
};

export const startTracking = () => {
  return {
    type: "START_TRACKING",
  };
};

export const setTheme = (themePref) => {
  console.log("THEME PREF ACTION", themePref);
  return {
    type: "SET_THEME",
    themePref,
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";

const signInOutMiddleware = (store) => (next) => async (action) => {
  if (action.type === "SIGN_IN") await AsyncStorage.setItem("user", JSON.stringify(action.user));
  if (action.type === "SIGN_OUT") await AsyncStorage.removeItem("user");
  next(action);
};

export default signInOutMiddleware;

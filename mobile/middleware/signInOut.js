import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";

const signInOutMiddleware = (store) => (next) => async (action) => {
  if (action.type === "SIGN_IN") {
    api.defaults.headers.common["Authorization"] = `Bearer ${action.user.token}`;
    await AsyncStorage.setItem("user", JSON.stringify(action.user));
  }
  if (action.type === "SIGN_OUT") await AsyncStorage.removeItem("user");
  next(action);
};

export default signInOutMiddleware;

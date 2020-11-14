import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import userReducer from "./reducers/user";
import Navigation from "./navigation";
import signInOutMiddleware from "./middleware/signInOut";

const store = createStore(userReducer, applyMiddleware(signInOutMiddleware));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

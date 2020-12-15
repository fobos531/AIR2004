import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';
import userReducer from "./reducers/user";
import Navigation from "./navigation";
import signInOutMiddleware from "./middleware/signInOut";

const store = createStore(userReducer, applyMiddleware(signInOutMiddleware));

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;

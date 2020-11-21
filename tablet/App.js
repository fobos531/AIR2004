import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Navigation from "./navigation";

import userReducer from "./reducers/user";

const store = createStore(userReducer);

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

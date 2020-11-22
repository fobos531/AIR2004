import React from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {createStore} from 'redux';
import Navigation from './navigation';
import {Provider as PaperProvider} from 'react-native-paper';
import userReducer from './reducers/user';

const store = createStore(userReducer);

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;

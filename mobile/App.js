/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar } from "react-native";

import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from "react-native/Libraries/NewAppScreen";

import { Provider } from "react-redux";
import { createStore } from "redux";
import userReducer from "./reducers/user";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./screens/Guest/Login";
import Registration from "./screens/Guest/Registration";
import Navigation from "./navigation";

const AuthenticationStack = createStackNavigator();
const store = createStore(userReducer);

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <AuthenticationStack.Navigator>
//           <AuthenticationStack.Screen name="Login" component={Login} options={{ headerTitleAlign: "center" }} />
//           <AuthenticationStack.Screen
//             name="Registration"
//             component={Registration}
//             options={{ title: "Create Account", headerTitleAlign: "center" }}
//           />
//         </AuthenticationStack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark,
  },
  highlight: {
    fontWeight: "700",
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right",
  },
});

export default App;

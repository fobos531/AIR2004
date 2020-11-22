import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/guest/Login";
import Registration from "../screens/guest/Registration";

const Stack = createStackNavigator();

const Guest = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerTitleAlign: "center" }} />
      <Stack.Screen name="Registration" component={Registration} options={{ title: "Create Account", headerTitleAlign: "center" }} />
    </Stack.Navigator>
  );
};

export default Guest;

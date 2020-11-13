import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Guest/Login";
import Registration from "../screens/Guest/Registration";

const Stack = createStackNavigator();

const Guest = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={Registration} />
    </Stack.Navigator>
  );
};

export default Guest;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../screens/teacher/Dashboard";

const Stack = createStackNavigator();

const Teacher = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Teacher;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../screens/Student/Dashboard";

const Stack = createStackNavigator();

const Student = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Student;

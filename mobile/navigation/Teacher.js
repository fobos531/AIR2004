import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../screens/Teacher/Dashboard";
import QR from "../screens/Teacher/QR";

const Stack = createStackNavigator();

const Teacher = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="QRScan" component={QR} />
    </Stack.Navigator>
  );
};

export default Teacher;

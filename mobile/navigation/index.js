import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Guest from "./Guest";
import Student from "./Student";

const Stack = createStackNavigator();

const Navigation = () => {
  const user = useSelector((state) => state);

  return (
    <Stack.Navigator headerMode="none">
      {user.token === null ? <Stack.Screen name="Login" component={Guest} /> : <Stack.Screen name="Dashboard" component={Student} />}
    </Stack.Navigator>
  );
};

export default Navigation;

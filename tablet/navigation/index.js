import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Login from "../screens/Login";
import Home from "../screens/Home";

const Stack = createStackNavigator();

const Navigation = () => {
  const user = useSelector((state) => state);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.token === null ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Unittend",
              headerStyle: {
                backgroundColor: "#5725E5",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
        ) : (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Unittend",
              headerStyle: {
                backgroundColor: "#5725E5",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

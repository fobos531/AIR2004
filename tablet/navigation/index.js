import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { io } from "socket.io-client";
import { signIn, signOut } from "../actions/";

import Login from "../screens/Login";
import Home from "../screens/Home";
import LectureInProgress from "../screens/LectureInProgress";

const Stack = createStackNavigator();

const Navigation = () => {
  const [token, setToken] = useState(null);
  const user = useSelector((state) => state);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io("http://192.168.1.5:8080");

    socket.current.on("tokenReceived", (data) => setToken(JSON.stringify(data)));

    socket.current.on("loginSuccess", (data) => {
      console.log(data);
      dispatch(signIn(data));
    });

    socket.current.on("signOutTablet", () => {
      dispatch(signOut());
    });

    return () => socket.current.disconnect();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.token === null ? (
          <Stack.Screen
            name="Login"
            options={{
              title: "Unittend",
              headerStyle: {
                backgroundColor: "#5725E5",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}>
            {(props) => <Login {...props} tabletToken={token} />}
          </Stack.Screen>
        ) : user.courseInProgress === null ? (
          <Stack.Screen
            name="Home"
            options={{
              title: "Unittend",
              headerStyle: {
                backgroundColor: "#5725E5",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}>
            {(props) => <Home {...props} socket={socket.current} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="LectureInProgress"
            options={{
              title: "Unittend",
              headerStyle: {
                backgroundColor: "#5725E5",
              },
              headerTitleStyle: {
                color: "#fff",
              },
            }}>
            {() => <LectureInProgress courseName={user.courseInProgress.courseName} lectureType={user.courseInProgress.lectureType} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

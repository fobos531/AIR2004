import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../actions/";
import { io } from "socket.io-client";

import { WSS_URL } from "../constants";
import LectureInProgress from "../screens/LectureInProgress";
import Login from "../screens/Login";
import Home from "../screens/Home";
import api from "../utils/api";

import { setAttendanceToken } from "../actions";

const Stack = createStackNavigator();

const Navigation = () => {
  const [token, setToken] = useState(null);
  const user = useSelector((state) => state);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // Connect to the websocket server
    socket.current = io(WSS_URL + "/tablet");

    // The attendanceToken will be received after connecting to the server
    socket.current.on("attendance token generated", (attendanceToken) => dispatch(setAttendanceToken(attendanceToken)));

    // When teacher scans the login QR code and successfully signs in
    socket.current.on("login success", (data) => {
      console.log(data);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      dispatch(signIn(data));
    });

    // When teacher clicks on "Start tracking attendance" on the mobile app
    socket.current.on("attendance code", (data) => {
      console.log("CODE", data);
      setToken(data.code);
    });

    // asocket.current.on("tokenReceived", (data) => {
    //   console.log(data);
    //   setToken(JSON.stringify(data));
    // });

    // socket.current.on("loginSuccess", (data) => {
    //   console.log(data);
    //   api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
    //   dispatch(signIn(data));
    // });

    // socket.current.on("signOutTablet", () => {
    //   dispatch(signOut());
    // });

    return () => socket.current.disconnect();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.token === null ? (
          <Stack.Screen name="Login" options={screenOptions} component={Login} />
        ) : user.courseInProgress === null ? (
          <Stack.Screen name="Home" options={screenOptions}>
            {(props) => <Home {...props} socket={socket.current} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="LectureInProgress" options={screenOptions}>
            {() => (
              <LectureInProgress
                courseName={user.courseInProgress.courseName}
                lectureType={user.courseInProgress.lectureType}
                socket={socket.current}
                tabletToken={token}
              />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const screenOptions = {
  title: "Unittend",
  headerStyle: {
    backgroundColor: "#5725E5",
  },
  headerTitleStyle: {
    color: "#fff",
  },
};

export default Navigation;

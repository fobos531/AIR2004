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

const Stack = createStackNavigator();

const Navigation = () => {
  const [token, setToken] = useState(null);
  const user = useSelector((state) => state);
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(WSS_URL);

    socket.current.on("tokenReceived", (data) => {
      console.log(data);
      setToken(JSON.stringify(data));
    });

    socket.current.on("loginSuccess", (data) => {
      console.log(data);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
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
          <Stack.Screen name="Login" options={screenOptions}>
            {(props) => <Login {...props} tabletToken={token} />}
          </Stack.Screen>
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
                tabletToken={JSON.parse(token)}
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

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useDispatch } from "react-redux";
import QRCode from "react-native-qrcode-svg";
import { io } from "socket.io-client";
import { API_URL } from "@env";

import { signIn } from "../actions/";

const Login = () => {
  const socket = useRef();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io(API_URL);

    socket.current.on("tokenReceived", (data) =>
      setToken(JSON.stringify(data)),
    );

    socket.current.on("loginSuccess", (data) => {
      console.log(data);
      dispatch(signIn(data));
    });

    return () => socket.current.disconnect();
  }, []);

  if (!token)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please scan the QR code to login</Text>
      <QRCode
        value={token}
        style={styles.qr}
        size={Dimensions.get("screen").height * 0.45}
      />
      <Image style={styles.logo} source={require("../assets/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-8%",
  },
  text: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: "bold",
  },
  logo: {
    position: "absolute",
    bottom: "3%",
    right: "5%",
    height: 140,
    width: 170,
  },
});

export default Login;

import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

import QRCode from "react-native-qrcode-svg";

const Login = ({ tabletToken }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(tabletToken);
  });

  if (!token)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please scan the QR code to login</Text>
      <QRCode value={token} style={styles.qr} size={Dimensions.get("screen").height * 0.45} />
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

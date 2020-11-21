import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { io } from 'socket.io-client';
import QRCode from 'react-native-qrcode-svg';

const Login = () => {
  const socket = useRef();
  const [token, setToken] = useState('');

  useEffect(() => {
    socket.current = io('http://192.168.1.5:8080/');

    socket.current.on('tokenReceived', (data) =>
      setToken(JSON.stringify(data)),
    );

    return () => socket.current.disconnect();
  }, []);

  if (!token) return <View></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please scan the QR code to login</Text>
      <QRCode
        value={token}
        style={styles.qr}
        size={Dimensions.get('screen').height * 0.45}
      />
      <Image style={styles.logo} source={require('../assets/logo.png')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '-8%',
  },
  text: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    bottom: '3%',
    right: '5%',
    height: 140,
    width: 170,
  },
});

export default Login;

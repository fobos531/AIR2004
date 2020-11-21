import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
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
    <View>
      <Text>Test</Text>
      <QRCode value={token} />
    </View>
  );
};

export default Login;

import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, View } from "react-native";
import { StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { signInTablet } from '../../actions/index';
import api from "../../utils/api";

const QR = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const onScanned = (e) => {
    const token = JSON.parse(e.data).token;
    api.post("/user/login/tablet", { token }).then(({ data }) => {
      console.log(data);
      dispatch(signInTablet)
      navigation.dispatch(StackActions.pop(1))
    });
  };

  return (
    <View>
      <QRCodeScanner onRead={onScanned} cameraStyle={{ height: Dimensions.get("window").height }} />
    </View>
  );
};

export default QR;

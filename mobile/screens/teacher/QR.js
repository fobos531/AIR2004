import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, View } from "react-native";

import api from "../../utils/api";

const QR = () => {
  const onScanned = (e) => {
    const token = JSON.parse(e.data).token;
    api.post("/user/login/tablet", { token }).then(({ data }) => {
      // TODO
      console.log(data);
    });
  };

  return (
    <View>
      <QRCodeScanner onRead={onScanned} cameraStyle={{ height: Dimensions.get("window").height }} />
    </View>
  );
};

export default QR;

import React from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, View } from "react-native";

import api from "../../utils/api";

const QR = () => {
  const onScanned = (e) => {
    console.log(e.data);

    //TODO -> spremanje u bazu
  };

  return (
    <View>
      <QRCodeScanner onRead={onScanned} showMarker={true} cameraStyle={{ height: Dimensions.get("window").height }} />
    </View>
  );
};

export default QR;

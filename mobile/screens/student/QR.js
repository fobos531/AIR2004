import React, { useEffect, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { showMessage, hideMessage } from "react-native-flash-message";

import api from "../../utils/api";
import { useSelector } from "react-redux";

const QR = ({ navigation }) => {
  const [attendanceSubmited, setAttendanceSubmited] = useState(null);

  const user = useSelector((state) => state.userId);

  useEffect(() => {
    // if (attendanceSubmited) {
    //   showMessage({
    //     message: "Thank you!",
    //     description: "Your attendance has been saved!",
    //     type: "success",
    //     duration: 5000,
    //     icon: "success",
    //   });
    //   setTimeout(() => {
    //     navigation.pop();
    //   }, 1500);
    // }
    // if(!attendanceSubmited){
    //   showMessage({
    //     message: "Error occured!",
    //     description: "Please contact professor to submit your attendance manually!",
    //     type: "danger",
    //     duration: 5000,
    //     icon: "danger"
    //   });
    //   setTimeout(() => {
    //     navigation.pop();
    //   }, 1500);
    // }
  });

  const onScanned = (e) => {
    const qrCodeData = JSON.parse(e.data);
    console.log(qrCodeData);

    console.log("USER ID", user);

    api
      .post("/attendance/mark", { ...qrCodeData, user })
      .then(({ data }) => {
        showMessage({
          message: "Thank you!",
          description: "Your attendance has been saved!",
          type: "success",
          duration: 5000,
          icon: "success",
        });
      })
      .catch((error) => {
        showMessage({
          message: "Error occured!",
          description: "Please contact professor to submit your attendance manually!",
          type: "danger",
          duration: 5000,
          icon: "danger",
        });
        console.log(error);
      })
      .finally(() => {
        navigation.pop();
      });
  };

  return (
    <View>
      <QRCodeScanner onRead={onScanned} showMarker={true} cameraStyle={{ height: Dimensions.get("window").height }} />
    </View>
  );
};

export default QR;

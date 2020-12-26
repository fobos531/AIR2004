import React, { useEffect, useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import { showMessage, hideMessage } from "react-native-flash-message";

import api from "../../utils/api";

const QR = ({ navigation }) => {
  const [attendanceSubmited, setAttendanceSubmited] = useState(null);

  useEffect(() => {
    if (attendanceSubmited) {
      showMessage({
        message: "Thank you!",
        description: "Your attendance has been saved!",
        type: "success",
        duration: 5000,
        icon: "success",
      });

      setTimeout(() => {
        navigation.pop();
      }, 1500);
    }

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
    const scannedData = e.data;
    console.log(scannedData);

    api
      .post("/attendance/mark")
      .then(({ data }) => {
        console.log(data);
        setAttendanceSubmited(true);
      })
      .catch((error) => {
        console.log(error);
      });

    /*Na temelju dobivenog responsea od API-a provjeriti da li je prisustvo uspješno evidentirano*/

    /*Ako je uspješno evidentirano -> postavi attendanceSubmited na true*/
  };

  return (
    <View>
      <QRCodeScanner onRead={onScanned} showMarker={true} cameraStyle={{ height: Dimensions.get("window").height }} />
    </View>
  );
};

export default QR;

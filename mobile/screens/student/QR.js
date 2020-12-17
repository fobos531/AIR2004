import React, { useState } from "react";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Dimensions, View } from "react-native";
import { Text } from 'react-native-paper';

import api from "../../utils/api";

const QR = () => {
  const[attendanceSubmited, setAttendanceSubmited] = useState(null);

  const onScanned = (e) => {
    const scannedData = (e.data);
    console.log(scannedData);

    //TODO -> spremanje u bazu

    /*Na temelju dobivenog responsea od API-a provjeriti da li je prisustvo uspješno evidentirano*/  
    
    /*Ako je uspješno evidentirano -> postavi attendanceSubmited na true*/
    
  };

  return (
    <View>
      {attendanceSubmited === null ? (
        <QRCodeScanner onRead={onScanned} showMarker={true} cameraStyle={{ height: Dimensions.get("window").height }} />
      ) : attendanceSubmited === true ? (
        <Text>Evidencija prisustva uspješna!</Text>
      ) : (
        <Text>Evidencija prisustva neuspješna!</Text>
      )}
      
    </View>
  );
};

export default QR;
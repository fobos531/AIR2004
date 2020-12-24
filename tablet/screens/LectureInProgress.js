import React, { useState, useEffect } from "react";
import AnimatedLoader from "react-native-animated-loader";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { useSelector } from "react-redux";
import { Headline } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import AnimatedCheckmark from "../components/AnimatedCheckmark";

const LectureInProgress = ({ courseName, lectureType, socket, tabletToken }) => {
  const user = useSelector((state) => state);

  const [tracking, setTracking] = useState(false);
  const [code, setCode] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [successfulScan, setSuccessfulScan] = useState(false);

  useEffect(() => {
    // socket.on("startTrackingAttendance", () => {
    //   console.log(user.token);
    //   // console.log("lectureID", lecture.id);
    //   socket.emit("generateQR", { lectureId: "5fc271812380d73fb1423d1d", token: tabletToken.token });
    //   // setTracking(true);
    // });
    // socket.on("selectedLecture", (lecture) => {
    //   console.log("lecture", lecture);
    //   setLecture(lecture);
    // });
    // // The new QR code generated and sent by the server
    // socket.on("attendanceCode", ({ code }) => {
    //   console.log("CODE", code);
    //   setSuccessfulScan(false);
    //   setCode(code);
    //   setTracking(true);
    // });
    // // When the QR code has been successfuly scanned, send message to the server to generate a new one
    // socket.on("scanSucess", () => {
    //   setSuccessfulScan(true);
    //   setTimeout(() => socket.emit("generateQR", { lectureId: "5fc271812380d73fb1423d1d", token: tabletToken.token }), 2000);
    // });
  }, []);

  useEffect(() => {
    setSuccessfulScan(true);
    setTimeout(() => setSuccessfulScan(false), 2000);
  }, [tabletToken]);

  if (tabletToken.code)
    return (
      <View style={styles.qrContainer}>
        <Text style={styles.text}>Please scan the QR code using Unittend application to mark your attendance</Text>
        {successfulScan && <AnimatedCheckmark />}
        <QRCode
          value={JSON.stringify({ code: tabletToken.code, attendanceToken: user.attendanceToken, lecture: tabletToken.lecture })}
          style={styles.qr}
          size={Dimensions.get("screen").height * 0.45}
        />
      </View>
    );

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>
        {courseName} | {lectureType}
      </Headline>
      <Headline style={styles.headline}>Lecture currently in progress</Headline>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.25)"
        source={require("../assets/9513-preloader.json")}
        animationStyle={styles.lottie}
        speed={1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  qrContainer: {
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
  container: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  headline: {
    marginTop: "10%",
    fontWeight: "700",
    marginBottom: "2%",
  },
  lottie: {
    marginTop: "10%",
    width: 200,
    height: 200,
  },
});

export default LectureInProgress;

import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Headline, Text } from "react-native-paper";
import AnimatedLoader from "react-native-animated-loader";

const LectureInProgress = ({ courseName, lectureType }) => {
  const user = useSelector((state) => state);

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

import React from "react";
import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const AnimatedDotsLoader = () => {
  return (
    <>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.1)"
        source={require("../../../assets/animations/22640-loading-dots.json")}
        animationStyle={styles.lottie}
        speed={0.7}
      />
    </>
  );
};

export default AnimatedDotsLoader;

const styles = StyleSheet.create({
  lottie: {
    marginTop: "30%",
    alignSelf: "center",
    width: "60%",
    height: "60%",
  },
});

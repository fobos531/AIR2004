import React from "react";
import { StyleSheet } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const AnimatedCheckmark = () => {
  return (
    <>
      <AnimatedLoader
        visible={true}
        overlayColor="rgba(255,255,255,0.9)"
        source={require("../assets/animations/4964-check-mark-success-animation.json")}
        animationStyle={styles.lottie}
        speed={1}
        loop={false}
      />
    </>
  );
};

export default AnimatedCheckmark;

const styles = StyleSheet.create({
  lottie: {
    marginTop: "10%",
    width: 200,
    height: 200,
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Text } from 'react-native-paper';
import AnimatedLoader from "react-native-animated-loader";

const AttendanceSubmitSuccessful = ({ onPop }) => {
    const[textVisible, setTextVisible] = useState(false);
    const[animationVisible, setAnimationVisible] = useState(true);

    setTimeout(() => {
        setTextVisible(true);
    }, 2000);

    setTimeout(() => {
        setAnimationVisible(false);
    }, 5000);

    if(!animationVisible){
        onPop();
    }

  return (
    <View>
        <AnimatedLoader
            visible={animationVisible}
            overlayColor="rgba(255,255,255,0)"
            source={require("../../../assets/animations/5187-liquid-checkmark-loading.json")}
            animationStyle={styles.lottie}
            speed={1.5}
            loop={false}
        />
      
        {textVisible &&
            <View style={styles.textContainer}>
                <Text style={styles.textFont}>Thank you!</Text>
                <Text style={{...styles.textFont, lineHeight: 40}}>Your attendance has been saved!</Text>
            </View>
        }
    </View>
  );
};

const styles = StyleSheet.create({
    lottie: {
        marginTop: "-10%",
        width: 150,
        height: 150,
    },

    textContainer: {
        marginTop: 28,
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },

    textFont: {
        fontSize: 19,
        fontWeight: "bold"
    }
  });

export default AttendanceSubmitSuccessful;

import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

const Attendance = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Attendance screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
    
});

export default Attendance;
import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch } from "react-redux";

const Courses = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>Courses screen.</Text>
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

export default Courses;
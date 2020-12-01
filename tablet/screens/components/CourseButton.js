import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CourseButton = ({ name, showDialog }) => {
  return (
    <Button mode="contained" style={styles.button} onPress={showDialog}>
      {name}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: "3%",
    margin: "3%",
  },
});

export default CourseButton;

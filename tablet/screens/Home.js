import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Headline, Dialog, Portal } from "react-native-paper";
import axios from "axios";
import { useSelector } from "react-redux";
import CourseButton from "./components/CourseButton";
import { io } from "socket.io-client";

const api = axios.create({
  baseURL: "http://192.168.1.5:8080/api",
});

const Home = () => {
  const [assignedCourses, setAssignedCourses] = useState();
  const user = useSelector((state) => state);
  console.log("USER", user);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  console.log("ASSIGNED COURSES", assignedCourses);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    api.get("/user/details", config).then((data) => {
      setAssignedCourses(data.data.data.assignedCourses);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Headline style={styles.headline}>Your courses</Headline>
        <View style={styles.courses}>
          {assignedCourses != undefined &&
            assignedCourses.map((course) => <CourseButton key={course.id} name={course.name} showDialog={showDialog} />)}
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
            <Dialog.Title style={{ alignSelf: "center" }}>Select lecture type</Dialog.Title>
            <Dialog.Content>
              <Button mode="contained" style={styles.dialogButton}>
                Lecture
              </Button>
              <Button mode="contained" style={styles.dialogButton}>
                Seminar
              </Button>
              <Button mode="contained" style={styles.dialogButton}>
                Lab
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
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
  courses: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  button: {
    padding: "3%",
    margin: "3%",
  },
  dialog: {
    flexDirection: "column",
  },
  dialogButton: {
    width: "40%",
    padding: "2%",
    margin: "1%",
    alignSelf: "center",
  },
});

export default Home;

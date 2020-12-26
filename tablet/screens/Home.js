import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { Button, Headline, Dialog, Portal } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import CourseButton from "./components/CourseButton";
import { createLecture, setCourseInProgress } from "../actions/index";
import api from "../utils/api";

const Home = ({ socket, navigation }) => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const user = useSelector((state) => state);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    api
      .get("/user/details")
      .then(({ data }) => {
        console.log(data);
        setAssignedCourses(data.data.assignedCourses);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.on("selectedLecture", (lecture) => dispatch(createLecture(lecture)));
  }, [user.token]);

  const handleSelectLectureType = (lectureType) => {
    socket.emit("lecture selected", { lectureType, selectedCourse });
    dispatch(setCourseInProgress({ lectureType, courseName: selectedCourse.name }));
    hideDialog();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Headline style={styles.headline}>Your courses</Headline>
        <View style={styles.courses}>
          {assignedCourses.map((course) => (
            <CourseButton key={course.id} name={course.name} showDialog={showDialog} setCourse={() => setSelectedCourse(course)} />
          ))}
        </View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
            <Dialog.Title style={{ alignSelf: "center" }}>Select lecture type</Dialog.Title>
            <Dialog.Content>
              <Button mode="contained" style={styles.dialogButton} onPress={() => handleSelectLectureType("Lecture")}>
                Lecture
              </Button>
              <Button mode="contained" style={styles.dialogButton} onPress={() => handleSelectLectureType("Seminar")}>
                Seminar
              </Button>
              <Button mode="contained" style={styles.dialogButton} onPress={() => handleSelectLectureType("Lab")}>
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

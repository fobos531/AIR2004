import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  Text,
  Surface,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AnimatedLoader from "react-native-animated-loader";

import AttendanceItem from "../student/components/AttendanceItem";

import api from "../../utils/api";

const moment = require("moment");

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: "rgb(255, 255, 255)",
  },
};

const CourseStatistics = ({ route }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [lectureData, setLectureData] = useState([]);
  const [animationVisible, setAnimationVisible] = useState(true);
  const { courseId } = route.params;
  const { selectedCourse } = route.params;

  const user = useSelector((state) => state);

  useEffect(() => {
    api
      .get("/user/details", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setEnrolledCourses(data.data.enrolledCourses);
      })
      .catch((error) => console.log(error));

    api
      .get("/attendance", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setAttendanceData(
          data.data
            .filter((item) => item.courseName === selectedCourse)
            .sort((a, b) =>
              moment(a.fullDate).isBefore(b.fullDate)
                ? -1
                : moment(a.fullDate).isAfter(b.fullDate)
                ? 1
                : 0
            )
        );
      })
      .catch((error) => console.log(error));

    api
      .get("/lecture")
      .then(({ data }) =>
        console.log(
          setLectureData(
            data.data.filter((item) => item.course.name === selectedCourse)
          )
        )
      )
      .catch((error) => console.log(error));

    setTimeout(() => {
      setAnimationVisible(false);
    }, 2700);
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {animationVisible === true ? (
          <AnimatedLoader
            visible={animationVisible}
            overlayColor="rgba(255,255,255,0)"
            source={require("../../assets/animations/935-loading.json")}
            animationStyle={styles.lottie}
            speed={1}
            loop={false}
          />
        ) : (
          <View>
            <View>
              <Surface
                style={{
                  ...styles.attendanceContainer,
                  marginTop: 5,
                  width: "100%",
                  height: 100,
                }}
                theme={theme}
              >
                <Text
                  style={
                    (styles.font,
                    {
                      margin: 12,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#626262",
                    })
                  }
                >
                  Total attended
                </Text>

                <Text
                  style={
                    (styles.font,
                    { marginLeft: 12, color: "#000", fontSize: 34 })
                  }
                >
                  {attendanceData.length}/{lectureData.length}
                </Text>
              </Surface>
            </View>

            <View style={{ marginTop: 10 }}>
              <Surface
                style={{
                  ...styles.attendanceContainer,
                  marginTop: 5,
                  width: "100%",
                  height: 100,
                }}
                theme={theme}
              >
                <Text
                  style={
                    (styles.font,
                    {
                      margin: 12,
                      marginBottom: 5,
                      fontWeight: "bold",
                      color: "#626262",
                    })
                  }
                >
                  Your attendance on {selectedCourse}
                </Text>

                {attendanceData.length !== 0 ? (
                  <FlatList
                    keyExtractor={(item) => item.id}
                    data={attendanceData}
                    renderItem={({ item }) => <AttendanceItem item={item} />}
                  />
                ) : (
                  <View style={{ marginLeft: 20 }}>
                    <MaterialCommunityIcons
                      name="cloud-sync-outline"
                      size={26}
                    />
                    <Text style={styles.font}>No data found!</Text>
                  </View>
                )}
              </Surface>
            </View>
          </View>
        )}
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "4%",
    width: "100%",
    height: "100%",
  },

  attendanceContainer: {
    height: "auto",
    elevation: 4,
  },

  font: {
    fontSize: 14,
  },

  lottie: {
    width: 200,
    height: 200,
  },
});

export default CourseStatistics;

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  Button,
  Text,
  Surface,
  DefaultTheme,
  Portal,
  Dialog,
  TextInput,
  Provider as PaperProvider,
  FAB,
  Card,
} from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import CourseItem from "../student/components/CourseItem";
import AttendanceItem from "../student/components/AttendanceItem";

import api from "../../utils/api";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: "rgb(238, 238, 238)",
  },
};

const chartConfig = {
  backgroundColor: "#a1a09f",
  backgroundGradientFrom: "#949494",
  backgroundGradientTo: "#949494",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#757575",
  },
};

const Dashboard = ({ navigation }) => {
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [coursePasscode, setCoursePasscode] = useState("");
  const [visible, toggleVisible] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
  }, []);

  const mockData = [
    {
      id: "1",
      attendanceTime: "10:01",
      courseName: "Software Analysis and Design",
    },
    {
      id: "2",
      attendanceTime: "13:48",
      courseName: "Foreign Trade",
    },
  ];

  const graphData = {
    labels: ["M", "T", "W", "T", "F"],
    datasets: [
      {
        data: [4, 2, 5, 5, 1],
      },
    ],
  };

  const handleSubmitAddCourse = () => {
    setShowLoadingIndicator(true);

    const body = { passcode: coursePasscode };

    setTimeout(() => {
      setShowLoadingIndicator(false);
      toggleVisible(false);

      api
        .post("/user/enroll", body, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          console.log("ADDED COURSE", data.data.course);
          setEnrolledCourses(enrolledCourses.concat(data.data.course));
        })
        .catch((error) => console.log(error));

      setCoursePasscode("");
    }, 4000);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>
          Hi,{" "}
          <Text style={{ fontWeight: "bold" }}>
            {user.name} {user.surname}!
          </Text>
        </Text>

        <View style={{ marginTop: 25 }}>
          <Text style={styles.font}>Here's your summary for today:</Text>
          <Surface
            style={{ ...styles.graphContainer, marginTop: 20 }}
            theme={theme}
          >
            <ScrollView>
              <Text
                style={
                  (styles.font,
                  {
                    marginLeft: 12,
                    marginTop: 12,
                    fontWeight: "bold",
                    color: "#626262",
                  })
                }
              >
                Recent attendance
              </Text>

              <Text
                style={
                  (styles.font, { marginLeft: 12, color: "#000", fontSize: 34 })
                }
              >
                12
              </Text>

              <Text style={(styles.font, { marginLeft: 12, color: "#000" })}>
                in the last week
              </Text>

              {mockData.length !== 0 ? (
                <View style={{ margin: 10, padding: 10, alignItems: "center" }}>
                  <LineChart
                    data={graphData}
                    width={280}
                    height={165}
                    chartConfig={chartConfig}
                    bezier
                  />
                </View>
              ) : (
                <View style={{ marginLeft: 20 }}>
                  <MaterialCommunityIcons name="cloud-sync-outline" size={26} />
                  <Text style={styles.font}>No data found!</Text>
                </View>
              )}
            </ScrollView>
          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface style={styles.graphContainer} theme={theme}>
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
              Your attendance today
            </Text>

            {mockData.length !== 0 ? (
              <FlatList
                keyExtractor={(item) => item.id}
                data={mockData}
                renderItem={({ item }) => <AttendanceItem item={item} />}
              />
            ) : (
              <View style={{ marginLeft: 20 }}>
                <MaterialCommunityIcons name="cloud-sync-outline" size={26} />
                <Text style={styles.font}>No data found!</Text>
              </View>
            )}
          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface style={styles.graphContainer} theme={theme}>
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
              Courses
            </Text>

            {enrolledCourses.length !== 0 ? (
              <FlatList
                keyExtractor={(item) => item.id}
                data={enrolledCourses}
                extraData={enrolledCourses.length}
                renderItem={({ item }) => (
                  <CourseItem id={item.id} courseName={item.name} />
                )}
              />
            ) : (
              <View style={{ marginLeft: 20 }}>
                <MaterialCommunityIcons name="cloud-sync-outline" size={26} />
                <Text style={styles.font}>No data found!</Text>
              </View>
            )}

            <MaterialCommunityIcons
              style={styles.plusIcon}
              name="plus"
              size={35}
              onPress={() => toggleVisible(true)}
            />
          </Surface>
        </View>

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              toggleVisible(false);
              setCoursePasscode("");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 20,
              }}
            >
              <Dialog.Title>Enter course join password:</Dialog.Title>
              {showLoadingIndicator && (
                <ActivityIndicator size="large" color="#0000ff" />
              )}
            </View>
            <Dialog.Content>
              <TextInput
                label="Enter course passcode"
                value={coursePasscode}
                mode="outlined"
                onChangeText={(coursePasscode) =>
                  setCoursePasscode(coursePasscode)
                }
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  toggleVisible(false);
                  setCoursePasscode("");
                }}
              >
                Cancel
              </Button>
              <Button onPress={() => handleSubmitAddCourse()}>Confirm</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

      <FAB
        style={styles.fab}
        small
        label="SCAN"
        icon="qrcode"
        color="black"
        onPress={() => navigation.push("QRScan")}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "4%",
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 24,
    paddingTop: "2%",
  },

  graphContainer: {
    marginTop: 5,
    height: 150,
    elevation: 4,
  },

  attendanceContainer: {
    marginTop: 15,
    height: 150,
    elevation: 4,
  },

  font: {
    fontSize: 14,
  },

  plusIcon: {
    margin: 7,
    position: "absolute",
    right: 0,
    bottom: 0,
  },

  fab: {
    position: "absolute",
    margin: 17,
    right: 0,
    bottom: 0,
  },

  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
  },
});

export default Dashboard;

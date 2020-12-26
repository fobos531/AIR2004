import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Colors, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator, FAB, Paragraph } from "react-native-paper";
import StudentAttendanceCard from "./components/StudentAttendanceCard";
import { ScrollView } from "react-native-gesture-handler";
import { io } from "socket.io-client";
import { WSS_URL } from "../../constants";

const Attendance = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const [attendances, setAttendances] = useState([]);

  const [fabOpen, setFabOpen] = useState(false);
  const socket = useRef();

  useEffect(() => {
    // if (!user.courseSelectedOnTablet?.lecture) return;

    socket.current = io(WSS_URL + "/teacher", {
      query: {
        attendanceToken: user.attendanceToken,
        fetchLectureAttendance: user.courseSelectedOnTablet.lecture.id,
      },
    });
    socket.current.on("lecture selected", (data) => {
      dispatch(setCourseSelectedOnTablet(data));
    });

    socket.current.on("all attendances", (data) => {
      setAttendances(data);
    });

    socket.current.on("new attendance", (data) => {
      setAttendances((old) => [data, ...old]);
    });

    return () => socket.current.disconnect();
  }, []);

  return (
    <View>
      <View style={{ width: "100%", height: "100%" }}>
        <FAB.Group
          open={fabOpen}
          style={styles.fab}
          small
          icon="plus"
          actions={[
            {
              icon: "account-plus",
              label: "Manual entry",
              style: { backgroundColor: "#62D7C5" },
              onPress: () => console.log("Pressed email"),
            },
            {
              icon: "check-all",
              label: "Finish tracking",
              style: { backgroundColor: "#62D7C5" },
              onPress: () => console.log("Pressed notifications"),
            },
          ]}
          onStateChange={({ open }) => setFabOpen(open)}
        />
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>Now tracking:</Text>
          <Text style={styles.courseName}>Software Analysis</Text>
          <ActivityIndicator animating={true} size={40} style={{ paddingVertical: 10 }} />
        </View>
        <ScrollView>
          {attendances.map((attendance) => (
            <StudentAttendanceCard key={attendance.id} data={attendance} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  courseName: {
    fontSize: 30,
    marginVertical: 7,
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
});

export default Attendance;

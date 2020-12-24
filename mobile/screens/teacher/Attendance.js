import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Colors, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import { ActivityIndicator, FAB, Paragraph } from "react-native-paper";
import StudentAttendanceCard from "./components/StudentAttendanceCard";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";

const Attendance = () => {
  const dispatch = useDispatch();

  const [fabOpen, setFabOpen] = useState(false);

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
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
          <StudentAttendanceCard />
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

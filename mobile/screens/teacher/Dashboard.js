import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text, FAB, Provider as PaperProvider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setCourseSelectedOnTablet, signOutTablet, startTracking } from "../../actions";
import DashboardAfterLogin from "./components/DashboardAfterLogin";
import DashboardAfterTabletLogin from "./components/DashboardAfterTabletLogin";
import DashboardAfterCourseSelection from "./components/DashboardAfterCourseSelection";
import { WSS_URL } from "../../constants";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const socket = useRef();

  useEffect(() => {
    socket.current = io(WSS_URL + "/teacher", {
      query: {
        attendanceToken: user.attendanceToken,
      },
    });
    socket.current.on("lecture selected", (data) => {
      dispatch(setCourseSelectedOnTablet(data));
    });

    return () => socket.current.disconnect();
  }, [user.attendanceToken]);

  const handleSignOut = () => {
    socket.current.emit("sign out tablet", { attendanceToken: user.attendanceToken });
    dispatch(signOutTablet());
  };

  const handleStartTracking = () => {
    dispatch(startTracking());
    socket.current.emit("start tracking", { lecture: user.courseSelectedOnTablet.lecture.id });
  };

  return (
    <View>
      <Text style={styles.title}>
        Hi,{" "}
        <Text style={{ fontWeight: "bold" }}>
          {user.name} {user.surname}!
        </Text>
      </Text>
      <View style={styles.container}>
        {user.attendanceToken == null ? (
          <DashboardAfterLogin />
        ) : user.courseSelectedOnTablet == null ? (
          <DashboardAfterTabletLogin handleSignOut={handleSignOut} />
        ) : (
          <DashboardAfterCourseSelection handleSignOut={handleSignOut} handleStartTracking={handleStartTracking} />
        )}
        {user.attendanceToken == null && (
          <FAB style={styles.fab} small label="SIGN IN ON TABLET" icon="qrcode" color="black" onPress={() => navigation.push("QRScan")} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "4%",
    width: "100%",
    height: "100%",
  },
  font: {
    fontSize: 15,
  },

  title: {
    fontSize: 24,
    paddingTop: "3.75%",
    paddingLeft: "4%",
    paddingRight: "4%",
  },

  stepContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#bbbfc4",
  },

  fab: {
    position: "absolute",
    marginBottom: 110,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },
});

export default Dashboard;

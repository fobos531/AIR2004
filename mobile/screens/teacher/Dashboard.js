import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text, FAB, Provider as PaperProvider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
import { setCourseSelectedOnTablet } from "../../actions";
import DashboardAfterLogin from "./components/DashboardAfterLogin"
import DashboardAfterTabletLogin from "./components/DashboardAfterTabletLogin"
import DashboardAfterCourseSelection from "./components/DashboardAfterCourseSelection"


const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://192.168.1.5:8080",  {
      query: {
        userToken: user.token
      }
    });
    socket.current.on("selectedLectureType", (data) => {
      console.log("MOBILE RECEIVED", data);
      dispatch(setCourseSelectedOnTablet(data));
    })

    return () => socket.current.disconnect();
  }, []);


 
  console.log("USER STATE", user.tabletSocketToken);
  return (
<View>    
  <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>
      <View style={styles.container}>
      {user.tabletSocketToken == null ? <DashboardAfterLogin/> :
      (user.courseSelectedOnTablet == null ? <DashboardAfterTabletLogin socket={socket.current} /> :
        <DashboardAfterCourseSelection socket={socket.current} />) 
     }
      {user.tabletSocketToken == null && 
      <FAB
        style={styles.fab}
        small
        label="SIGN IN ON TABLET"
        icon="qrcode"
        color="black"
        onPress={() => console.log('Pressed')}
        onPress={() => navigation.push("QRScan")}
      />}

      

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
    fontSize: 15
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
    borderColor: "#bbbfc4"
  },

  fab: {
    position: 'absolute',
    marginBottom: 110,
    marginRight: 20,
    right: 0,
    bottom: 0
  },

});

export default Dashboard;
import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, FAB, Provider as PaperProvider, Chip } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import DashboardAfterLogin from "./components/DashboardAfterLogin"
import DashboardAfterTabletLogin from "./components/DashboardAfterTabletLogin"

import { signIn } from "../../actions";

const Dashboard = ({ navigation }) => {
  const socket = useRef();

  const user = useSelector((state) => state);
  console.log("USER STATE", user.tabletSocketToken);
  return (
<View>    
  <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>
      <View style={styles.container}>
      {user.tabletSocketToken == null ? <DashboardAfterLogin/> : <DashboardAfterTabletLogin />}
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
  container:{

    borderColor: "red",
    borderWidth: 1,
    width: "100%",
    height: "100%",
  },
  font: {
    fontSize: 15
  },

  title: {
    fontSize: 24,
    padding: "2%"
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
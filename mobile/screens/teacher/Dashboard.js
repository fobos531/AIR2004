import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet } from "react-native";
import { Button, Text, FAB, Provider as PaperProvider } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";

import { signIn } from "../../actions";

const DashboardAfterLogin = () => {
  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  const checkIfSignedIn = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) dispatch(signIn(JSON.parse(userData)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>

      <View style={{marginTop: 25}}>

        <Text style={styles.font}>You are currently not signed in a lecture room.</Text>

        <View style={{marginTop: 25}}>

          <View style={styles.stepContainer}>
            <Text style={{fontWeight:"bold", fontSize: 20}}>Step 1</Text>
            <Text style={{...styles.font, marginTop: 10, marginBottom: 10}}>Go to a lecture room.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={{fontWeight:"bold", fontSize: 20}}>Step 2</Text>
            <Text style={{...styles.font, marginTop: 10, marginBottom: 10}}>Click "Sign in on tablet" button on this screen.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={{fontWeight:"bold", fontSize: 20}}>Step 3</Text>
            <Text style={{...styles.font, marginTop: 10, marginBottom: 10}}>Scan the QR code that's displayed on the tablet in the lecture room.</Text>
          </View>

        </View>
      </View>
    </View>
  )
}

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <PaperProvider>
      
      <DashboardAfterLogin/>

      <FAB
        style={styles.fab}
        small
        label="SIGN IN ON TABLET"
        icon="qrcode"
        color="black"
        onPress={() => console.log('Pressed')}
        onPress={() => navigation.push("QRScan")}
      />

      {/*<Button onPress={() => dispatch(signOut())}>Sign out</Button>
      <Button onPress={() => navigation.push("QRScan")}>Tablet login</Button>*/}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    margin: 25
  },

  font: {
    fontSize: 15
  },

  title: {
    fontSize: 24
  },

  stepContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#bbbfc4"
  },

  fab: {
    position: 'absolute',
    marginBottom: 40,
    marginRight: 20,
    right: 0,
    bottom: 0
  }
});

export default Dashboard;

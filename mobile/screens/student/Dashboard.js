import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Button, Text, Surface, DefaultTheme, Portal, Dialog, TextInput, Provider as PaperProvider, FAB } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { signIn } from "../../actions";
import { FlatList } from "react-native-gesture-handler";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: 'rgb(238, 238, 238)'
  },
};

const Dashboard = () => {
  const[showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const[courseCode, setCourseCode] = useState("");
  const[visible, toggleVisible] = useState(false);

  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  const checkIfSignedIn = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) dispatch(signIn(JSON.parse(userData)));
  };

  const handleSubmitAddCourse = () => {
    console.log("Course code: ", courseCode);

    setShowLoadingIndicator(true);

    setTimeout(() => {
      setShowLoadingIndicator(false);
      toggleVisible(false);
    }, 4000);
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>
        
        <View style={{ marginTop: 25 }}>
          <Text style={styles.font}>Here's your summary for today:</Text>
          <Surface style={styles.graphContainer} theme={theme}>
          <Text style={styles.font, { margin: 12, fontWeight: "bold", color: "#626262" }}>Recent attendance</Text>
          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface style={styles.graphContainer} theme={theme}>
            <Text style={styles.font, { margin: 12, fontWeight: "bold", color: "#626262" }}>Your attendance today</Text>
          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface style={styles.graphContainer} theme={theme}>
            <Text style={styles.font, { margin: 12, fontWeight: "bold", color: "#626262" }}>Courses</Text>
              
              <FlatList>

              </FlatList>
              
              <MaterialCommunityIcons style={styles.plusIcon} name="plus" size={35} onPress={() => toggleVisible(true)}/>
          </Surface>
        </View>

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={() => {
              toggleVisible(false);
              setCourseCode("");
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
              {showLoadingIndicator && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
            <Dialog.Content>
              <TextInput
                label="Enter course passcode"
                value={courseCode}
                mode="outlined"
                onChangeText={(courseCode) => setCourseCode(courseCode)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  toggleVisible(false);
                  setCourseCode("");
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
        onPress={() => console.log('Pressed')}
      />

    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    margin: 25
  },
  
  title: {
    fontSize: 24
  },

  graphContainer: {
    marginTop: 15,
    height: 150,
    elevation: 4
  },

  attendanceContainer: {
    marginTop: 15,
    height: 150,
    elevation: 4
  },

  font: {
    fontSize: 14
  },

  plusIcon: {
    margin: 7,
    position: "absolute",
    right: 0,
    bottom: 0
  },

  fab: {
    position: 'absolute',
    margin: 12,
    right: 0,
    bottom: 0
  },
});

export default Dashboard;

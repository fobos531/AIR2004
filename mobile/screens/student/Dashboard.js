import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ActivityIndicator, FlatList, Alert } from "react-native";
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
  Chip,
  Card, 
  Title, 
  Paragraph
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";


import { signIn } from "../../actions";

import api from "../../utils/api";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: 'rgb(238, 238, 238)'
  },
};

const CourseItem = ({courseName}) => {
  return(
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
      <Chip 
        style={styles.chip} 
        textStyle={{color: "#731ff0"}} 
        mode="outlined" 
        icon={() => (
          <FontAwesomeIcons 
            name="graduation-cap" 
            size={16}/>
        )} 
        onPress={() => console.log('Pressed')}>
        {courseName}
      </Chip>
    </View>
  );
}

const Dashboard = ({ navigation }) => {
  const[showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const[coursePasscode, setCoursePasscode] = useState("");
  const[visible, toggleVisible] = useState(false);

  const user = useSelector((state) => state);
  const dispatch = useDispatch();

  const mockData=[
    {
      id: '1',
      courseName: 'Software Analysis and Design'
    },
    {
      id: '2',
      courseName: 'Foreign Trade1'
    }
  ]; 

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  const checkIfSignedIn = async () => {
    const userData = await AsyncStorage.getItem("user");
    if (userData) dispatch(signIn(JSON.parse(userData)));
  };

  const handleSubmitAddCourse = () => {
    setShowLoadingIndicator(true);

    const body = { "passcode": coursePasscode };

    setTimeout(() => {
      setShowLoadingIndicator(false);
      toggleVisible(false);

      api
      .post("/user/enroll", body, {
        headers: { 
          Authorization: `Bearer ${user.token}`, 
          "Content-Type": "application/json" 
        }
      })
      .then(({ data }) => console.log(data))
      .catch((error) => console.log(error));

      setCoursePasscode("");

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
            
            <Card style={{marginLeft: 10, marginRight: 10}}>
              <Card.Content>
                <Paragraph>10:01 AM</Paragraph>
                <Paragraph style={{fontWeight: "bold"}}>Software Analysis and Design</Paragraph>
              </Card.Content>
            </Card>

          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface style={styles.graphContainer} theme={theme}>
            <Text style={styles.font, { margin: 12, fontWeight: "bold", color: "#626262" }}>Courses</Text>
              
              <CourseItem courseName="Software Analysis and Design"/>
              <CourseItem courseName="Foreign Trade"/>
              
              <MaterialCommunityIcons style={styles.plusIcon} name="plus" size={35} onPress={() => toggleVisible(true)}/>
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
              {showLoadingIndicator && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
            <Dialog.Content>
              <TextInput
                label="Enter course passcode"
                value={coursePasscode}
                mode="outlined"
                onChangeText={(coursePasscode) => setCoursePasscode(coursePasscode)}
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
    position: "absolute",
    margin: 12,
    right: 0,
    bottom: 0
  },

  chipContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "flex-start",
    marginLeft: 10
  },

  chip: {
    backgroundColor: "#dcc7fc",
     borderWidth: 1, 
     borderColor: "#731ff0", 
     marginTop: 10, 
     marginLeft: 20
  }
});

export default Dashboard;

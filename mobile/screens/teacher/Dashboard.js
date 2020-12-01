import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, FAB, Provider as PaperProvider, Chip } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

import { signIn } from "../../actions";

const DashboardAfterLogin = () => {
  const user = useSelector((state) => state);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>

      <View style={{marginTop: 25}}>

        <Text style={styles.font}>You are currently not signed in a lecture room.</Text>

        <View style={{marginTop: 25}}>

          <View style={styles.stepContainer}>
            <Text style={{fontWeight:"bold", fontSize: 20}}>Step 1</Text>
            <Text style={{...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20}}>Go to a lecture room.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={{fontWeight:"bold", fontSize: 20}}>Step 2</Text>
            <Text style={{...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20}}>Click "Sign in on tablet" button on this screen.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={{fontWeight:"bold", fontSize: 20}}>Step 3</Text>
            <Text style={{...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20}}>Scan the QR code that's displayed on the tablet in the lecture room.</Text>
          </View>

        </View>
      </View>
    </View>
  )
}

const DashboardAfterTabletLogin = () => {
  const user = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>

      <View style={{marginTop: 25}}>
        <Text style={styles.font}>You are currently not signed in a lecture room.</Text>
      </View>

      <View style={{...styles.stepContainer, marginTop: 25}}>
        <Text style={{fontWeight:"bold", fontSize: 20}}>Sign out</Text>
        <Text style={{...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20}}>To sign out of the tablet and let other teacher sign in, click this button.</Text>
        <Button
          style={{marginTop: 27,marginBottom: 27}}
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons name="plus" size={35} color="#fff" onPress={() => console.log("")}/>
          )}
        >
          SIGN OUT
        </Button>
      
      </View>
    </View>
  );
}

const DashboardAfterCourseSelection = () => {
  const user = useSelector((state) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi, <Text style={{ fontWeight: "bold" }}>{user.name} {user.surname}!</Text></Text>

      <View style={{marginTop: 25}}>
        <Text style={styles.font}>You are signed in a lecture room for course</Text>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10}}>
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
            Test
        </Chip>
      </View>

      <View style={{...styles.stepContainer, marginTop: 25}}>
        <Text style={{fontWeight:"bold", fontSize: 20}}>Start tracking attendance</Text>
        <Text style={{...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20}}>If the lecture is finished, click this button to start tracking yout student's attendance. QR codes will start to generate on the tablet.</Text>
        <Button
          style={{marginTop: 20, marginBottom: 27}}
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons name="plus" size={35} color="#fff" onPress={() => console.log("")}/>
          )}
        >
          START TRACKING ATTENDANCE
        </Button>
      
      </View>

      <View style={{...styles.stepContainer, marginTop: 25}}>
        <Text style={{fontWeight:"bold", fontSize: 20}}>Sign out</Text>
        <Text style={{...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20}}>To sign out of the tablet and let other teacher sign in, click this button.</Text>
        <Button
          style={{marginTop: 20,marginBottom: 27}}
          mode="contained"
          icon={() => (
            <MaterialCommunityIcons name="plus" size={35} color="#fff" onPress={() => console.log("")}/>
          )}
        >
          SIGN OUT
        </Button>
      
      </View>
    </View>
  );
}

const Dashboard = ({ navigation }) => {

  return (
    <PaperProvider>
      
      <DashboardAfterCourseSelection/>

      {/*<DashboardAfterTabletLogin/>*/}


      {/*<DashboardAfterLogin/>

      <FAB
        style={styles.fab}
        small
        label="SIGN IN ON TABLET"
        icon="qrcode"
        color="black"
        onPress={() => console.log('Pressed')}
        onPress={() => navigation.push("QRScan")}
      />*/}

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

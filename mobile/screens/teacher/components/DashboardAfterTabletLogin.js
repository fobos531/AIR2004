import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DashboardAfterTabletLogin = ({ handleSignOut }) => {
  return (
    <>
      <View style={{ marginTop: 25 }}>
        <Text style={{ ...styles.font, marginBottom: 20 }}>You are signed in on a tablet in a lecture room.</Text>
        <Text style={styles.font}>Please select the course on the tablet you would like to mark attendance for.</Text>
      </View>

      <View style={{ ...styles.stepContainer, marginTop: 25 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Sign out</Text>
        <Text style={{ ...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20 }}>
          To sign out of the tablet and let other teacher sign in, click this button.
        </Text>
        <Button
          style={{ marginTop: 27, marginBottom: 27 }}
          mode="contained"
          icon={() => <MaterialCommunityIcons name="plus" size={35} color="#fff" />}
          onPress={handleSignOut}
        >
          SIGN OUT
        </Button>
      </View>
    </>
  );
};

export default DashboardAfterTabletLogin;

const styles = StyleSheet.create({
  container: {
    padding: "3%",
    borderColor: "red",
    borderWidth: 1,
    width: "100%",
    height: "100%",
  },
  font: {
    fontSize: 15,
  },
  title: {
    fontSize: 24,
  },
  stepContainer: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#bbbfc4",
  },

  fab: {
    position: "absolute",
    marginBottom: 40,
    marginRight: 20,
    right: 0,
    bottom: 0,
  },

  chip: {
    backgroundColor: "#dcc7fc",
    borderWidth: 1,
    borderColor: "#731ff0",
    marginTop: 10,
    marginLeft: 20,
  },
});

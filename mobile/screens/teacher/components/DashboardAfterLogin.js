import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const DashboardBeforeTabletLogin = () => {
  return (
    <>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.font}>You are currently not signed in a lecture room.</Text>

        <View style={{ marginTop: 25 }}>
          <View style={styles.stepContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Step 1</Text>
            <Text style={{ ...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20 }}>Go to a lecture room.</Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Step 2</Text>
            <Text style={{ ...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20 }}>
              Click "Sign in on tablet" button on this screen.
            </Text>
          </View>

          <View style={styles.stepContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Step 3</Text>
            <Text style={{ ...styles.font, marginTop: 10, marginBottom: 10, lineHeight: 20 }}>
              Scan the QR code that's displayed on the tablet in the lecture room.
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DashboardBeforeTabletLogin;

const styles = StyleSheet.create({
  container: {
    margin: 25,
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
});

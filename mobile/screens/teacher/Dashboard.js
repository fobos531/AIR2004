import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { signOut } from "../../actions";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button onPress={() => dispatch(signOut())}>Sign out</Button>
      <Button onPress={() => navigation.push("QRScan")}>Tablet login</Button>
    </View>
  );
};

export default Dashboard;

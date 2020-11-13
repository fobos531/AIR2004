import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { signOut } from "../../actions";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Remove user data from Async storage and from Redux state
  const handleSignOut = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(signOut());
  };

  return (
    <View>
      <Button onPress={handleSignOut}>Sign out</Button>
    </View>
  );
};

export default Dashboard;

import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { signOut } from "../../actions";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button onPress={() => dispatch(signOut())}>Sign out</Button>
    </View>
  );
};

export default Dashboard;

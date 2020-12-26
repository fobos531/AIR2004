/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Switch } from "react-native-paper";
import * as Biometrics from "../../utils/biometrics";

const Settings = () => {
  const [isSwitchOn, setIsSwitchOn] = useState();
  const [biometricsAvailable, setBiometricsAvailable] = useState();
  useEffect(() => {
    const initialLoad = async () => {
      const biometricAuthenticationPreference = await Biometrics.checkBiometricAuthenticationPreference();
      const isEligibleForBiometricAuthentication = await Biometrics.isEligibleForBiometricAuthentication();
      console.log("BIOMETRIC AUTHENTICATION PREFERENCE", biometricAuthenticationPreference);
      setIsSwitchOn(biometricAuthenticationPreference);
      setBiometricsAvailable(isEligibleForBiometricAuthentication);
    };
    initialLoad();
  }, []);

  const onToggleSwitch = async () => {
    const authenticated = await Biometrics.handleAuthentication();
    if (authenticated) {
      AsyncStorage.setItem("biometricAuthenticationPreference", (!isSwitchOn).toString());
      setIsSwitchOn(!isSwitchOn);
    }
  };

  return (
    <View style={styles.container}>
      {biometricsAvailable == true && (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={{ flex: 1 }}>Use biometric authentication</Text>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch}></Switch>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
  },
});

export default Settings;

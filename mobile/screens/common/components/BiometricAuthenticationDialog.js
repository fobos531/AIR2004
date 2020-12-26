import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Biometrics from "../../../utils/biometrics";

const BiometricAuthenticationDialog = ({ biometricsDialogVisible, setBiometricsDialogVisible }) => {
  const hideDialog = () => {
    setBiometricsDialogVisible(false);
  };
  return (
    <Portal>
      <Dialog visible={biometricsDialogVisible} onDismiss={hideDialog}>
        <Dialog.Title>Biometric Authentication</Dialog.Title>
        <Dialog.Content>
          <Paragraph>Do you want to use biometric authentication when opening Unittend?</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={async () => {
              const authenticated = await Biometrics.handleAuthentication();
              if (authenticated) {
                AsyncStorage.setItem("biometricAuthenticationPreference", "true");
                hideDialog();
              }
            }}
          >
            Yes
          </Button>
          <Button
            onPress={() => {
              AsyncStorage.setItem("biometricAuthenticationPreference", "false");
              hideDialog();
            }}
          >
            No
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default BiometricAuthenticationDialog;

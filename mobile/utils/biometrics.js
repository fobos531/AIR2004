import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

// on component load, check for hardware capabilities
const isDeviceCapable = async () => {
  let compatible = await LocalAuthentication.hasHardwareAsync();
  return compatible; // boolean
};
// If device has biometric capabilities, check if there are any biometric records registered
const biometricRecordsAvailable = async () => {
  let biometricRecords = await LocalAuthentication.isEnrolledAsync();
  return biometricRecords;
};
export const handleAuthentication = async () => {
  let result = await LocalAuthentication.authenticateAsync({
    disableDeviceFallback: true,
    cancelLabel: "Cancel",
  });
  if (result.success) {
    return true;
  } else {
    return false;
  }
};

export const checkBiometricAuthenticationPreference = async () => {
  let biometricAuthenticationPreference = null;

  try {
    biometricAuthenticationPreference = await AsyncStorage.getItem("biometricAuthenticationPreference");

    if (biometricAuthenticationPreference != null) {
      biometricAuthenticationPreference = biometricAuthenticationPreference == "true" ? true : false;
    }
  } catch (e) {}
  return biometricAuthenticationPreference;
};

export const isEligibleForBiometricAuthentication = async () => {
  return isDeviceCapable() && biometricRecordsAvailable();
};

export const removeBiometricAuthenticationPreference = async () => {
  try {
    await AsyncStorage.removeItem("biometricAuthenticationPreference");
  } catch (exception) {}
};

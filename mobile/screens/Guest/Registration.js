import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";

import { Header, LearnMoreLinks, DebugInstructions, ReloadInstructions } from "react-native/Libraries/NewAppScreen";

import { Provider as PaperProvider, TextInput, Button, IconButton } from "react-native-paper";

import Login from "./Login";
import { NavigationContainer } from "@react-navigation/native";

const Registration = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [JMBAG, setJMBAG] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [showHidePassword, setShowHidePassword] = useState(false);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleRegistrationRequest = () => {
    //TO DO -> spajanje na backend
    console.log("Sending request for register...");
  };

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
          </View>

          <View style={{ marginTop: 60 }}>
            <TextInput style={styles.textInput} label="First Name" value={name} mode="outlined" onChangeText={(name) => setName(name)} />

            <TextInput
              style={styles.textInput}
              label="Surname"
              value={surname}
              mode="outlined"
              onChangeText={(surname) => setSurname(surname)}
            />

            <TextInput style={styles.textInput} label="E-mail" value={email} mode="outlined" onChangeText={(email) => setUsername(email)} />

            <TextInput
              style={styles.textInput}
              secureTextEntry={showHidePassword === true ? false : true}
              label="Password"
              value={password}
              mode="outlined"
              onChangeText={(password) => setPassword(password)}
              right={
                <TextInput.Icon
                  style={styles.eyeIcon}
                  name={showHidePassword === true ? "eye" : "eye-off"}
                  onPress={handleShowHidePassword}
                />
              }
            />

            <TextInput style={styles.textInput} label="JMBAG" value={JMBAG} mode="outlined" onChangeText={(JMBAG) => setJMBAG(JMBAG)} />

            <TextInput
              style={styles.textInput}
              label="Phone Number"
              value={phoneNumber}
              mode="outlined"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            />
          </View>

          <View style={styles.signButton}>
            <Button contentStyle={{ height: 46 }} mode="contained" onPress={handleRegistrationRequest}>
              SIGN UP
            </Button>
          </View>

          <View style={styles.textContainer}>
            <TouchableOpacity onPress={() => navigation.push("Login")}>
              <Text>Already have an account?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  textInput: {
    width: 330,
    height: 50,
    marginTop: 7,
  },

  signButton: {
    width: 330,
    marginTop: 25,
  },

  textContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 50,
  },

  logo: {
    height: 130,
    width: 170,
  },

  eyeIcon: {
    marginTop: 15,
    marginRight: 10,
  },
});

export default Registration;

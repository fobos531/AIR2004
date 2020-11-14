import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Image, Alert } from "react-native";
import { Provider as PaperProvider, TextInput, Button } from "react-native-paper";

import api from "../../utils/api";

const Registration = ({ navigation }) => {
  const [input, setInput] = useState({
    email: "",
    name: "",
    surname: "",
    password: "",
    jmbag: "",
    phoneNumber: "",
  });

  const [showHidePassword, setShowHidePassword] = useState(false);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleRegistrationRequest = () => {
    api
      .post("/user/student/register", input)
      .then(({ data }) => {
        if (data.success) {
          Alert.alert("Succcessfully created a new account!");
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error.response);
        Alert.alert("Error");
      });
  };

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
          </View>

          <View style={{ marginTop: 60 }}>
            <TextInput
              style={styles.textInput}
              label="First Name"
              value={input.name}
              mode="outlined"
              onChangeText={(name) => setInput((old) => ({ ...old, name }))}
            />

            <TextInput
              style={styles.textInput}
              label="Surname"
              value={input.surname}
              mode="outlined"
              onChangeText={(surname) => setInput((old) => ({ ...old, surname }))}
            />

            <TextInput
              style={styles.textInput}
              label="E-mail"
              value={input.email}
              mode="outlined"
              onChangeText={(email) => setInput((old) => ({ ...old, email }))}
            />

            <TextInput
              style={styles.textInput}
              secureTextEntry={showHidePassword === true ? false : true}
              label="Password"
              value={input.password}
              mode="outlined"
              onChangeText={(password) => setInput((old) => ({ ...old, password }))}
              right={
                <TextInput.Icon
                  style={styles.eyeIcon}
                  name={showHidePassword === true ? "eye" : "eye-off"}
                  onPress={handleShowHidePassword}
                />
              }
            />

            <TextInput
              style={styles.textInput}
              label="JMBAG"
              value={input.jmbag}
              mode="outlined"
              onChangeText={(jmbag) => setInput((old) => ({ ...old, jmbag }))}
            />

            <TextInput
              style={styles.textInput}
              label="Phone Number"
              value={input.phoneNumber}
              mode="outlined"
              onChangeText={(phoneNumber) => setInput((old) => ({ ...old, phoneNumber }))}
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

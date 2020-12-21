import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Dialog, Portal, TextInput, Button, Provider as PaperProvider } from "react-native-paper";
import { useDispatch } from "react-redux";

import api from "../../utils/api";
import { signIn } from "../../actions";
import AnimatedCheckmark from "./components/AnimatedCheckmark";
import AnimatedDotsLoader from "./components/AnimatedLoader";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailChangePassword, setEmailChangePassword] = useState("");
  const [password, setPassword] = useState("");
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [showLoadingIndicatorLogin, setShowLoadingIndicatorLogin] = useState(false);

  const [animatedLoaderVisible, setAnimatedLoaderVisible] = useState(false);
  const [animatedCheckmarkVisible, setAnimatedCheckMarkVisible] = useState(false);
  const [visible, toggleVisible] = useState(false);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleLoginRequest = () => {
    setShowLoadingIndicatorLogin(true);

    toggleVisible(false);

    api
      .post("/user/login", { email, password })
      .then(({ data }) => {
        setShowLoadingIndicatorLogin(false);
        dispatch(signIn(data.user));
      })
      .catch(() => {
        setShowLoadingIndicatorLogin(false);
        Alert.alert("Invalid credentials!");
      });
  };

  const handleResetPassword = () => {
    setAnimatedLoaderVisible(true);
    api
      .post("/user/resetPassword", { email: emailChangePassword })
      .then((data) => {
        setAnimatedLoaderVisible(false);
        console.log("DATA", data);
        if (data.data.success == true) {
          setAnimatedCheckMarkVisible(true);
          setTimeout(() => {
            setAnimatedCheckMarkVisible(false);
            toggleVisible(false);
          }, 1500);
        }
      })
      .catch((error) => {
        setAnimatedLoaderVisible(false);
        if (error.response.status == 400) {
          alert("There has been an error processing your request, please check your input!");
        }
      });
    //TO DO -> spajanje na backend
    console.log("Sending request for changing password...");
  };

  return (
    <PaperProvider>
      <Portal>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={require("../../assets/logo.png")} />
            </View>

            <View>
              <TextInput style={styles.textInput} label="E-mail" value={email} mode="outlined" onChangeText={(email) => setEmail(email)} />

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
            </View>

            <View style={styles.signButton}>
              <Button contentStyle={{ height: 46 }} mode="contained" onPress={handleLoginRequest}>
                SIGN IN
              </Button>

              <View style={{ marginTop: 10 }}>{showLoadingIndicatorLogin && <ActivityIndicator size="large" color="#0000ff" />}</View>
            </View>

            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => navigation.push("Registration")}>
                <Text>Don't have an account?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleVisible(true)}>
                <Text style={{ marginTop: 50 }}>Forgot password?</Text>
              </TouchableOpacity>

              <Portal>
                <Dialog
                  visible={visible}
                  onDismiss={() => {
                    toggleVisible(false);
                    setEmailChangePassword("");
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginRight: 20,
                    }}
                  >
                    <Dialog.Title>Reset password</Dialog.Title>
                  </View>
                  <Dialog.Content>
                    <TextInput
                      label="Enter your email"
                      value={emailChangePassword}
                      mode="outlined"
                      onChangeText={(emailChangePassword) => setEmailChangePassword(emailChangePassword)}
                    />
                    {animatedLoaderVisible && <AnimatedDotsLoader />}
                    {animatedCheckmarkVisible && <AnimatedCheckmark />}
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button
                      onPress={() => {
                        toggleVisible(false);
                        setEmailChangePassword("");
                      }}
                    >
                      Close
                    </Button>
                    <Button onPress={() => handleResetPassword()}>Reset Password</Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Portal>
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
    marginTop: 25,
  },

  signButton: {
    width: 330,
    marginTop: 25,
  },

  textContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 120,
  },

  logo: {
    height: 140,
    width: 170,
  },

  eyeIcon: {
    marginTop: 15,
    marginRight: 10,
  },

  loginIndicator: {
    position: "absolute",
  },
});

export default Login;

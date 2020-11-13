import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  ActivityIndicator
} from 'react-native';

import {Dialog, Portal, TextInput, Button, Provider as PaperProvider} from 'react-native-paper';

import Registration from './Registration';

const Login = ({ navigation }) => {
  const[email, setEmail] = useState('');
  const[emailChangePassword, setEmailChangePassword] = useState('');
  const[password, setPassword] = useState('');
  const[showHidePassword, setShowHidePassword] = useState(false);
  
  const[showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const[visible, toggleVisible] = useState(false);

  const handleShowHidePassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleLoginRequest = () => {
    //TO DO -> spajanje na backend
    console.log('Sending request for login...');
  };

  const handleSubmitChangePassword = () => {
    setShowLoadingIndicator(true);

    setTimeout(() => {
      setShowLoadingIndicator(false);
      toggleVisible(false);
    }, 4000);

    //TO DO -> spajanje na backend
    console.log('Sending request for changing password...');
  }

  return (
    <PaperProvider>
        <Portal>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View>
                <Image
                  style={styles.logo}
                  source={require('../assets/logo.png')}
                />
              </View>

              <View style={{marginTop: 60}}>
                <TextInput
                  style={styles.textInput}
                  label="E-mail"
                  value={email}
                  mode="outlined"
                  onChangeText={(email) => setEmail(email)}
                />

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
                      name={showHidePassword === true ? 'eye' : 'eye-off'}
                      onPress={handleShowHidePassword}
                    />
                  }
                />
              </View>

              <View style={styles.signButton}>
                <Button
                  contentStyle={{height: 46}}
                  mode="contained"
                  onPress={handleLoginRequest}>
                  SIGN IN
                </Button>
              </View>

              <View style={styles.textContainer}>
                <TouchableOpacity onPress={() => navigation.push("Registration")}>
                  <Text>Don't have an account?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleVisible(true)}>
                  <Text style={{marginTop: 50}}>Forgot password?</Text>
                </TouchableOpacity>

                <Portal>
                  <Dialog visible={visible} onDismiss={() => {toggleVisible(false); setEmailChangePassword('');}}>
                  <View style={{flexDirection: "row", justifyContent: "space-between", marginRight: 20}}><Dialog.Title>Change password</Dialog.Title>{showLoadingIndicator && <ActivityIndicator size="large" color="#0000ff" />}</View>
                    <Dialog.Content>
                      <TextInput
                        label="Enter your E-mail"
                        value={emailChangePassword}
                        mode= "outlined"
                        onChangeText={(emailChangePassword) => setEmailChangePassword(emailChangePassword)}
                      />

                    </Dialog.Content>
                    <Dialog.Actions>
                      <Button onPress={() => {toggleVisible(false); setEmailChangePassword('');}}>Close</Button>
                      <Button onPress={() => handleSubmitChangePassword()}>Reset Password</Button>
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
    justifyContent: 'center',
    alignItems: 'center',
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
    alignSelf: 'center',
    alignItems: 'center',
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
});

export default Login;
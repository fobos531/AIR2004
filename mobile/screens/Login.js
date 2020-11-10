/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
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
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Provider as PaperProvider, TextInput, Button, IconButton } from 'react-native-paper';

const Login = (props) => {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

  const handleLoginRequest = () => {
    //TO DO -> spajanje na backend
    console.log("Sending request...");
  }

  return (
    <>
      <PaperProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View>
              <Image style={styles.logo} source={require("../assets/logo.png")}/>
            </View>

            <View style={{marginTop: 60}}>
              <TextInput
                style={styles.textInput}
                label="E-mail"
                value={username}
                mode= "outlined"
                onChangeText={(username) => setUsername(username)}
              />
              
              <TextInput
                style={styles.textInput}
                label="Password"
                value={password}
                mode= "outlined"
                onChangeText={(password) => setPassword(password)}
                right={<TextInput.Icon name={<IconButton icon="eye"/>}/>}
              />
            </View>

            <View style={styles.signButton}>
              <Button
                contentStyle={{height: 46}}
                mode="contained"
                onPress={handleLoginRequest}
              >
                SIGN IN
              </Button>
            </View>

            <View style={styles.textContainer}>
              <TouchableOpacity onPress={() => console.log("")}>
                <Text>Don't have an account?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("")}>
                <Text style={{marginTop: 50}}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

          </View>
        </TouchableWithoutFeedback>
      </PaperProvider>
    </>
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
    marginTop: 25
  },

  signButton: {
    width: 330,
    marginTop: 25
  },

  textContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 120
  },

  logo: {
    height: 140,
    width: 170
  }
});

export default Login;

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {  Text, TextInput, Checkbox } from "react-native-paper";
import { FAB, Provider as PaperProvider } from "react-native-paper";


const EditCourse = () => {
  const [checkLecture, setCheckLecture] = useState(false);
  const [checkSeminar, setCheckSeminar] = useState(false);
  const [checkLab, setCheckLab] = useState(false);
  const [joinPassword, setJoinPassword] = useState('');
  const [allowedAbsences, setAllowedAbsences] = useState(0);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.pageTitle}> 
          <Text style={styles.firstWord}>Edit</Text> course:
        </Text>
        <Text style={styles.title}>
          Enabled lecture types:
        </Text>
        {/* Checkbox lista */}
        <View style={styles.checkBoxContainer}> 
          <Checkbox
            color="#9b5cf4"
            status={checkLecture ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckLecture(checkLecture => !checkLecture);
            }}
          />
            <Text>
              Lecture
            </Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            color="#9b5cf4"
            status={checkSeminar ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckSeminar(checkSeminar => !checkSeminar);
            }}
          />
            <Text>
              Seminar
            </Text>
        </View>
        <View style={styles.checkBoxContainer}>
          <Checkbox
            color="#9b5cf4"
            status={checkLab ? 'checked' : 'unchecked'}
            onPress={() => {
              setCheckLab(checkLab => !checkLab);
            }}
          />
            <Text>
              Lab
            </Text>
        </View>
        <Text style={styles.title}>
          Course join password:
        </Text>
        <TextInput
        style={styles.textInput}
        label="Join password"
        value={joinPassword}
        onChangeText={joinPassword => setJoinPassword(joinPassword)}
        />
        
        <Text style={styles.title}>
          Number of allowed absences:
        </Text>
        <TextInput
        style={styles.textInput}
        label="Allowed absences"
        value={allowedAbsences}
        onChangeText={allowedAbsences => setAllowedAbsences(allowedAbsences)}
        />
      </View>
      <FAB
        style={styles.fab}
        small
        label="save changes"
        icon="content-save"
        color="black"
        onPress={() => console.log('Pressed')}
        onPress={() => navigation.push("QRScan")}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
    checkBoxContainer:{
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center",
    },
    textInput:{
      marginTop: 10,
    },
    title:{
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10,
    },
    container: 
    {
        flex: 1,
        margin: 25,
    },
    courseIcon:
    {
      backgroundColor: "white",
      width: 35,
    },
    pageTitle:
    {    
      fontSize: 24,
      marginBottom: 5,
    },
    fab: 
    {
      position: 'absolute',
      marginBottom: 40,
      marginRight: 20,
      right: 0,
      bottom: 0
    },
    courseCard:
    {
      marginBottom: 10,
    },
    cardTitle:
    {
      fontSize: 18,
      fontWeight: 'normal',
    },
    cardContentWrapper:
    {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      alignItems: 'center',
    },
    cardLectureTypes:
    {
      flexDirection: 'row',
    },
    cardActions:
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    firstWord:{
        fontWeight: "bold",
    },
    lectureTypeBadge:
    {
      borderWidth: 1.5,
      marginRight: 5,
      borderColor: '#9b5cf4',
      backgroundColor: '#f2eafe',
    },
});

export default EditCourse;
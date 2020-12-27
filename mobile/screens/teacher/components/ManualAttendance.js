import React from 'react';
import { View, StyleSheet } from "react-native";
import { Text, RadioButton } from "react-native-paper";
import {Picker} from '@react-native-picker/picker';


const ManualAttendance = () => {
    
    const [checked, setChecked] = React.useState('first');
    const [student, setStudent] = React.useState([
        {
            id: 1,
            label: 'Luka'
        },
        {
            id: 2,
            label: 'Ivan'
        },
        {
            id: 3,
            label: 'Bobi'
        },
        {
            id: 4,
            label: 'Keco'
        },
    ]);
    const [selectedStudent, setSelectedStudent] = React.useState('');
    const [courses, setCourses] = React.useState([
        {
            id: 1,
            label: 'Discrete Structure Theory Mathematics'
        },
        {
            id: 2,
            label: 'Analysis and Software Development'
        },
        {
            id: 3,
            label: 'Software Analysis and Design'
        },
    ]);
    const [selectedCourse, setSelectedCourse] = React.useState('');
        
    return (
        <View style={styles.container}>
        <Text style={styles.radioButtonTitle}>
          Course name:
        </Text>
        <Picker
            selectedValue={selectedCourse}
            style={{height: 50, width: "100%"}}
            onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
        >
            {courses.map(({ id, label }) => <Picker.Item key={id} label={label} value={label} />)}
        </Picker>
        <Text style={styles.studentTitle}>
        Select lecture types:
        </Text>
        <View style={styles.radioButtonGroup}>
            <RadioButton
                color="purple"
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
            />
            <Text>
                Lecture
            </Text>
        </View>
        <View style={styles.radioButtonGroup}>
            <RadioButton
                color="purple"
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            />
            <Text>
                Seminar
            </Text>
        </View>
        <View style={styles.radioButtonGroup}>
            <RadioButton
                color="purple"
                value="third"
                status={ checked === 'third' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('third')}
            />
            <Text>
                Lab
            </Text>
        </View>
        <Text style={styles.studentTitle}>
          Student:
        </Text>
        <Picker
            selectedValue={selectedStudent}
            style={{height: 50, width: "100%"}}
            onValueChange={(itemValue, itemIndex) => setSelectedStudent(itemValue)}
        >
            {student.map(({ id, label }) => <Picker.Item key={id} label={label} value={label} />)}
        </Picker>
        </View>
        
    );
    }

    const styles = StyleSheet.create({
        radioButtonTitle:{
            fontWeight: "bold",
            fontSize: 20,
        },
        radioButtonGroup:{
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
        },
        container:{
        width:"100%",
        paddingLeft: 20,
        flexDirection: "column",
        justifyContent:"flex-start",
        },
        studentTitle:{
            paddingTop: 10,
            fontWeight: "bold",
            fontSize: 20,
        }

      });
export default ManualAttendance;
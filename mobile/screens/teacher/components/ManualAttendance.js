import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from "react-native";
import { Text, RadioButton, Button } from "react-native-paper";
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import api from '../../../utils/api';


const ManualAttendance = () => {

    const user = useSelector(state => state);

    const enrolledStudentsIds = user.courseSelectedOnTablet.course.enrolledStudents;
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState({});

    useEffect(() => {
        api
            .get("/user/student")
            .then((response) => {
                const enrolledStudents = response.data.data.filter(student => enrolledStudentsIds.includes(student.id));
                setEnrolledStudents(enrolledStudents);
                /* console.log('Enrolled students', enrolledStudents);
                console.log('Enrolled students IDs', enrolledStudentsIds); */
            });
    }, []);

    const handleSaveAttendance = () => {
        console.log('Added attendance');
    }
        
    return (
        <View style={styles.container}>
            <Text style={styles.radioButtonTitle}>
            Course name:
            </Text>
            {/* <Picker
                selectedValue={selectedCourse}
                style={{height: 50, width: "100%"}}
                onValueChange={(itemValue, itemIndex) => setSelectedCourse(itemValue)}
            >
                {courses.map(({ id, label }) => <Picker.Item key={id} label={label} value={label} />)}
            </Picker> */}
            <Text>{user.courseSelectedOnTablet.course.name}</Text>
            <Text style={styles.studentTitle}>
            Select lecture types:
            </Text>
            <Text>{user.courseSelectedOnTablet.lecture.type}</Text>
            {/* <View style={styles.radioButtonGroup}>
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
            </View> */}
            <Text style={styles.studentTitle}>
            Student:
            </Text>
            <Picker
                selectedValue={selectedStudent}
                style={{height: 50, width: "100%"}}
                onValueChange={(itemValue, itemIndex) => setSelectedStudent(itemValue)}
            >
                {enrolledStudents.map(({ id, name, surname, jmbag }) => <Picker.Item key={id} label={`${name} ${surname} (${jmbag})`} value={id} />)}
            </Picker>
            <Button
                style={{ marginTop: 50 }}
                mode="contained"
                icon={() => <MaterialCommunityIcons name="plus" size={35} color="#fff" />}
                onPress={handleSaveAttendance}
                >
                Save attendance
            </Button>
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
            padding: 25,
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
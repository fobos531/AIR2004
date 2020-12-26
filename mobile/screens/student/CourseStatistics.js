import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {  
  Text, 
  Surface, 
  DefaultTheme, 
  Provider as PaperProvider, 
} from "react-native-paper";
import { useSelector } from "react-redux";
import { LineChart } from "react-native-chart-kit";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceItem from "../student/components/AttendanceItem";

import api from "../../utils/api";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: 'rgb(238, 238, 238)'
  },
};

const Statistics = ( { route } ) => {
  const[enrolledCourses, setEnrolledCourses] = useState([]);
  const{ courseId } = route.params;
  const{ selectedCourse } = route.params;

  const user = useSelector((state) => state);

  useEffect(() => {
    api.get("/user/details", {
      headers: { 
        Authorization: `Bearer ${user.token}`, 
        "Content-Type": "application/json" 
      }
    })
    .then(({ data }) => {
      setEnrolledCourses(data.data.enrolledCourses); 
    })
    .catch((error) => console.log(error));
  }, []);

  const mockData=[
    {
      id: '1',
      date: '18',
      month: 'Nov',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '10:02',
      present: true
    },
    {
      id: '2',
      date: '25',
      month: 'Nov',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '10:02',
      present: false
    },
    {
      id: '3',
      date: '2',
      month: 'Dec',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '10:02',
      present: false
    },
    {
      id: '4',
      date: '9',
      month: 'Dec',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '10:02',
      present: true
    },
    {
      id: '5',
      date: '16',
      month: 'Dec',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '10:02',
      present: false
    }
  ]; 

  return (
    <PaperProvider>
      <View style={styles.container}>

      <View>
          <Surface style={{...styles.attendanceContainer, marginTop: 5, width: "100%", height: 100}} theme={theme}>
            <Text style={styles.font, { margin: 12, marginBottom: 5 ,fontWeight: "bold", color: "#626262" }}>Total attended</Text>

            <Text style={styles.font, { marginLeft: 12, color: "#000", fontSize: 34 }}>1/2</Text>
          </Surface>
        </View>

        <View style={{ marginTop: 15 }}>
          <Surface style={{ height: "93%", elevation: 4}} theme={theme}>
            <Text style={styles.font, { margin: 12, marginBottom: 5 ,fontWeight: "bold", color: "#626262" }}>Your attendance on {selectedCourse}</Text>
            
              {mockData.length !== 0 ? (

                <FlatList
                  keyExtractor={(item) => item.id}
                  data={mockData}
                  renderItem={({item}) => 
                    <AttendanceItem item={item}/>
                  }
                />

              ) : (
                <View style={{marginLeft: 20}}>
                  <MaterialCommunityIcons name="cloud-sync-outline" size={26}/>
                  <Text style={styles.font}>No data found!</Text>
                </View>
              )}

          </Surface>
        </View>
      </View>
      
    </PaperProvider>
  );
};


const styles = StyleSheet.create({
  container:{
    padding: "4%",
    width: "100%",
    height: "100%"
  },

  attendanceContainer: {
    height: "auto",
    elevation: 4
  },

  font: {
    fontSize: 14
  },
  
});

export default Statistics;
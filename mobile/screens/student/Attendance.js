import React, { useState } from "react";
import { View, StyleSheet, FlatList, Platform } from "react-native";
import { Text } from "react-native-paper";
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AttendanceItem from "../student/components/AttendanceItem";

const Attendance = () => {
  const[selectedFilter, setSelectedFilter] = useState("Courses");

  const mockData=[
    {
      id: '1',
      date: '20',
      month: 'Oct',
      day: 'MONDAY',
      courseName: 'Foreign Trade',
      attendanceTime: '10:01',
      present: true
    },
    {
      id: '2',
      date: '10',
      month: 'Nov',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '13:48',
      present: false
    },
    {
      id: '3',
      date: '10',
      month: 'Nov',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '13:48',
      present: false
    },
    {
      id: '4',
      date: '20',
      month: 'Oct',
      day: 'MONDAY',
      courseName: 'Foreign Trade',
      attendanceTime: '10:01',
      present: true
    },
    {
      id: '5',
      date: '20',
      month: 'Oct',
      day: 'MONDAY',
      courseName: 'Foreign Trade',
      attendanceTime: '10:01',
      present: true
    },
    {
      id: '6',
      date: '10',
      month: 'Nov',
      day: 'MONDAY',
      courseName: 'Software Analysis and Design',
      attendanceTime: '13:48',
      present: false
    }
  ]; 

  return (
    <View style={{margin: 12, marginBottom: 60}}>

      <View style={{flexDirection: "row"}}>
        <Text style={{fontSize: 17, marginLeft: 10, marginBottom: 15, marginTop: 5}}>Filter by: </Text>
        
        <View style={{marginLeft: 10, marginTop: -6}}>
          <Picker
            selectedValue={selectedFilter}
            style={{height: 50, width: 160}}
            mode={"dialog"}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedFilter(itemValue);
            }}
          >
            
            <Picker.Item label="Courses" value="courses" />
            <Picker.Item label="Attended" value="attended" />
            <Picker.Item label="Missed" value="missed" />
            <Picker.Item label="Last week" value="lastWeek" />
            <Picker.Item label="Last month" value="lastMonth" />
          </Picker>
        </View>
      </View>
      
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
    </View>
  );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
    
});

export default Attendance;
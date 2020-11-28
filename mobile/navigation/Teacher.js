import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

import Dashboard from "../screens/teacher/Dashboard";
import Attendance from "../screens/teacher/Attendance";
import Courses from "../screens/teacher/Courses";
import QR from "../screens/teacher/QR";
import { Title } from "react-native-paper";

const Stack = createStackNavigator();
const Tabs = createMaterialBottomTabNavigator();

const TeacherTabNavigation = () => {
  return (

    <Tabs.Navigator
      barStyle={{ backgroundColor: '#6202EE' }}
    >
      <Tabs.Screen
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="home" color={color} size={22} />
          ),
        }} 
      />

      <Tabs.Screen
        name="Attendance" 
        component={Attendance}
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="list" color={color} size={22} />
          ),
        }} 
      />

      <Tabs.Screen
        name="Courses" 
        component={Courses}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="book" color={color} size={22} />
          ),
        }} 
      />
    </Tabs.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';

  console.log(routeName);

  switch (routeName) {
    case 'Dashboard':
      return 'Dashboard';
    case 'Attendance':
      return 'Attendance';
    case 'Courses':
      return 'Courses';
  }
}

const Teacher = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        name="Dashboard" 
        component={TeacherTabNavigation} 
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#6202EE' }
        })}
      />

      <Stack.Screen 
        name="QRScan" 
        component={QR} 
        options={{
          headerTitle: "QR Scan",
          headerTintColor: 'white', 
          headerStyle: { backgroundColor: '#6202EE' }
        }}
      />
    </Stack.Navigator>
  );
};


export default Teacher;
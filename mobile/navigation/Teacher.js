import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "../screens/teacher/Dashboard";
import QR from "../screens/teacher/QR";

const Stack = createStackNavigator();

const Teacher = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="QRScan" component={QR} />
    </Stack.Navigator>
  );
};

export default Teacher;
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

import Dashboard from "../screens/teacher/Dashboard";
import Attendance from "../screens/teacher/Attendance";
import Courses from "../screens/teacher/Courses";
import QR from "../screens/teacher/QR";

const DashboardStack = createStackNavigator();
const AttendanceStack = createStackNavigator();
const CoursesStack = createStackNavigator();

const Tabs = createMaterialBottomTabNavigator();

const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen 
      name="Dashboard" 
      component={Dashboard}
      options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#6202EE' },
      }}
    />

    <DashboardStack.Screen 
      name="QRScan" 
      component={QR}
      options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#6202EE' },
      }}
    />
  </DashboardStack.Navigator>
);

const AttendanceStackScreen = () => (
  <AttendanceStack.Navigator>
    <AttendanceStack.Screen 
      name="Attendance" 
      component={Attendance}
      options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#6202EE' },
      }}
    />
  </AttendanceStack.Navigator>
);

const CoursesStackScreen = () => (
  <CoursesStack.Navigator>
    <CoursesStack.Screen 
      name="Courses" 
      component={Courses}
      options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#6202EE' },
      }}
    />
  </CoursesStack.Navigator>
);

const Teacher = () => {
  return (

    <Tabs.Navigator
      barStyle={{ backgroundColor: '#6202EE' }}
    >
      <Tabs.Screen
        name="Dashboard" 
        component={DashboardStackScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="home" color={color} size={22} />
          ),
        }} 
      />

      <Tabs.Screen
        name="Attendance" 
        component={AttendanceStackScreen}
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="list" color={color} size={22} />
          ),
        }} 
      />

      <Tabs.Screen
        name="Courses" 
        component={CoursesStackScreen}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="book" color={color} size={22} />
          ),
        }} 
      />
    </Tabs.Navigator>


    /*<Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="QRScan" component={QR} />
    </Stack.Navigator>*/
  );
};

export default Teacher;
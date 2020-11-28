import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

import Dashboard from "../screens/student/Dashboard";
import Attendance from "../screens/student/Attendance";
import Statistics from "../screens/student/Statistics";

const DashboardStack = createStackNavigator();
const AttendanceStack = createStackNavigator();
const StatisticsStack = createStackNavigator();

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

const StatisticsStackScreen = () => (
  <StatisticsStack.Navigator>
    <StatisticsStack.Screen 
      name="Statistics" 
      component={Statistics}
      options={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#6202EE' },
      }}
    />
  </StatisticsStack.Navigator>
);

const Student = () => {
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
        name="Statistics" 
        component={StatisticsStackScreen}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcons name="chart-pie" color={color} size={22} />
          ),
        }} 
      />
    </Tabs.Navigator>

    /*<Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>*/
  );
};

export default Student;
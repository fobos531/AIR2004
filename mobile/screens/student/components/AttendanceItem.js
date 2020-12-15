import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";

const AttendanceItem = ({id, attendanceTime, courseName}) => {
    return(
        <View>
            <Card key={id} style={{marginLeft: 10, marginRight: 10, marginTop: 7, marginBottom: 5}}>
                <Card.Content>
                    <Paragraph>{attendanceTime} AM</Paragraph>
                    <Paragraph style={{fontWeight: "bold"}}>{courseName}</Paragraph>
                </Card.Content>
            </Card>
        </View>
    );
}


export default AttendanceItem;


<Card style={{marginLeft: 10, marginRight: 10, marginTop: 7}}>
                  <Card.Content>
                    <Paragraph>10:01 AM</Paragraph>
                    <Paragraph style={{fontWeight: "bold"}}>Software Analysis and Design</Paragraph>
                  </Card.Content>
                </Card>
import React from "react";
import { View } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";

const AttendanceItem = ({ item }) => {
  if (item.present === undefined) {
    return (
      <View>
        <Card
          key={item.id}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 7,
            marginBottom: 5,
          }}
        >
          <Card.Content>
            <Paragraph>{item.attendanceTime}</Paragraph>
            <Paragraph style={{ fontWeight: "bold" }}>
              {item.courseName}
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  } else {
    return (
      <View>
        <Card
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 7,
            marginBottom: 5,
          }}
        >
          <Card.Content style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 20 }}>
              <Paragraph style={{ fontSize: 30, lineHeight: 40 }}>
                {item.date}
              </Paragraph>
              <Paragraph
                style={{ fontSize: 22, lineHeight: 22, alignSelf: "center" }}
              >
                {item.month}
              </Paragraph>
            </View>

            <View>
              <Paragraph>{item.day}</Paragraph>
              <Paragraph
                style={{ fontWeight: "bold", fontSize: 16, lineHeight: 24 }}
              >
                {item.courseName}
              </Paragraph>
              <Paragraph>{item.attendanceTime}</Paragraph>
            </View>

            <View style={{ position: "absolute", right: 10, top: 7 }}>
              {item.present && <Feather name="check-circle" size={30} />}
              {!item.present && <Feather name="x-circle" size={30} />}
            </View>

            <View style={{ position: "absolute", right: 10, bottom: 7 }}>
              <Paragraph>{item.lectureType}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  }
};

export default AttendanceItem;

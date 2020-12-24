import React from "react";
import { Card, Paragraph } from "react-native-paper";

const StudentAttendanceCard = () => {
  return (
    <Card style={{ marginLeft: 10, marginRight: 10, marginTop: 7, marginBottom: 5 }}>
      <Card.Content>
        <Paragraph style={{ fontWeight: "bold" }}>John Doe</Paragraph>
        <Paragraph style={{ color: "gray" }}>2 seconds ago</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default StudentAttendanceCard;

import React from "react";
import { Card, Paragraph } from "react-native-paper";
import { StyleSheet } from "react-native";
import moment from "moment";

const StudentAttendanceCard = ({ data }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Paragraph style={styles.nameLabel}>
          {data.user.name} {data.user.surname}
        </Paragraph>
        <Paragraph style={styles.timeLabel}>{moment(data.modifiedAt).fromNow()}</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 7,
    marginBottom: 5,
  },
  nameLabel: {
    fontWeight: "bold",
  },
  timeLabel: {
    color: "gray",
  },
});

export default StudentAttendanceCard;

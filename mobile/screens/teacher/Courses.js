import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { IconButton, Text, Title, Card, Button } from "react-native-paper";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import api from "../../utils/api";
import BlankSpacer from "react-native-blank-spacer";
import LectureItem from "./components/LectureItem";

const Courses = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state);

  const [courses, setCourses] = useState([]);

  console.log("USER", user);
  const [lectures, SetLectures] = useState([]);
  console.log("LECTURES", lectures);
  useEffect(() => {
    api
      .get("/user/details", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => setCourses(data.data.assignedCourses))
      .catch((error) => console.log(error));
    api
      .get("/lecture/lecturesForTeacher", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => SetLectures(data.data))
      .catch((error) => console.log(error));
  }, []);

  // ref
  const bottomSheetRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ["1%", "50%", "80%"], []);

  // callbacks

  const handleSheetChange = useCallback((index) => {
    console.log("handleSheetChange", index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={styles.pageTitle}>Your courses</Text>
        <IconButton icon="plus" size={30} onPress={() => navigation.push("NewCourse")} />
      </View>

      {courses.map(({ id, name, passcode, allowedAbsences }) => (
        <>
          <Card key={id}>
            <Card.Content>
              <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                <Title style={styles.cardTitle}>{name}</Title>
                <IconButton
                  icon={() => <MaterialCommunityIcon name="pencil-outline" size={20} />}
                  onPress={() => navigation.push("EditCourse")}
                />
                <IconButton
                  icon={() => <MaterialCommunityIcon name="trash-can-outline" size={20} />}
                  onPress={() => console.log("Potrebno implementirati brisanje")}
                />
              </View>

              <View style={styles.cardContentWrapper}>
                <Text>Allowed absences: {allowedAbsences}</Text>
                <Text>Course passcode: {passcode}</Text>
                <View style={styles.cardActions}></View>
              </View>
            </Card.Content>
          </Card>
          <BlankSpacer height={15} />
        </>
      ))}
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} onChange={handleSheetChange}>
        <Text style={{ fontWeight: "bold", fontSize: 19, paddingLeft: 15 }}>Recent lectures</Text>
        <BottomSheetFlatList
          keyExtractor={(lecture) => lecture.id}
          data={lectures}
          renderItem={({ item }) => <LectureItem lecture={item} />}
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },

  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },

  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "normal",
  },
  cardContentWrapper: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  cardLectureTypes: {
    flexDirection: "row",
  },
  cardActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  lectureTypeBadge: {
    borderWidth: 1.5,
    marginRight: 5,
    borderColor: "#9b5cf4",
    backgroundColor: "#f2eafe",
  },
});

export default Courses;

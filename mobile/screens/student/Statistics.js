import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Text,
  Surface,
  Card,
  Paragraph,
  DefaultTheme,
  Provider as PaperProvider,
  FAB,
} from "react-native-paper";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { showMessage, hideMessage } from "react-native-flash-message";

import api from "../../utils/api";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    surface: "rgb(255, 255, 255)",
  },
};

const Statistics = ({ navigation }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const user = useSelector((state) => state);

  useEffect(() => {
    api
      .get("/user/details", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(({ data }) => {
        setEnrolledCourses(data.data.enrolledCourses);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View>
          <Surface style={styles.courseContainer} theme={theme}>
            <Text
              style={
                (styles.font,
                {
                  margin: 12,
                  marginBottom: 5,
                  fontWeight: "bold",
                  color: "#626262",
                })
              }
            >
              Select course to see statistics
            </Text>

            {enrolledCourses.length !== 0 ? (
              <FlatList
                keyExtractor={(item) => item.id}
                data={enrolledCourses}
                extraData={enrolledCourses.length}
                renderItem={({ item }) => (
                  <View>
                    <TouchableWithoutFeedback
                      key={item.id}
                      onPress={() => {
                        navigation.push("CourseStatistics", {
                          courseId: item.id,
                          selectedCourse: item.name,
                        });
                      }}
                    >
                      <Card
                        style={{
                          marginLeft: 10,
                          marginRight: 10,
                          marginTop: 7,
                          marginBottom: 7,
                          elevation: 4,
                        }}
                      >
                        <Card.Content>
                          <Paragraph style={{ fontWeight: "bold" }}>
                            {item.name}
                          </Paragraph>
                        </Card.Content>
                      </Card>
                    </TouchableWithoutFeedback>
                  </View>
                )}
              />
            ) : (
              <View style={{ marginLeft: 20 }}>
                <MaterialCommunityIcons name="cloud-sync-outline" size={26} />
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
  container: {
    padding: "4%",
    width: "100%",
    height: "100%",
  },

  courseContainer: {
    marginTop: 5,
    elevation: 4,
  },

  font: {
    fontSize: 14,
  },
});

export default Statistics;

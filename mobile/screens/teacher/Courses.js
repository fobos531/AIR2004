import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { IconButton, Button, Text, Title, Chip, Card } from "react-native-paper";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { FAB, Provider as PaperProvider } from "react-native-paper";
import api from '../../utils/api';

const Courses = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state);

  const [courses, setCourses] = useState([]);

  useEffect(() => { 
    api.get('/user/details', {
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json", 
      }
      })
      .then(({ data }) => setCourses(data.data.assignedCourses))
      .catch(error => console.log(error));
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Your courses</Text>
        {courses.map(({ id, name }) => (
          <Card style={styles.courseCard} key={id}>
            <Card.Content>
              <Title style={styles.cardTitle}>{name}</Title>
              <View style={styles.cardContentWrapper}>
                <View style={styles.cardLectureTypes}>
                  {/* {lectureTypes.map(lectureType => <Chip style={styles.lectureTypeBadge} textStyle={{ color: '#9b5cf4', fontWeight: 'bold' }}>{lectureType}</Chip>)} */}
                  <Chip style={styles.lectureTypeBadge} textStyle={{ color: '#9b5cf4', fontWeight: 'bold' }}>Lecture</Chip>
                  <Chip style={styles.lectureTypeBadge} textStyle={{ color: '#9b5cf4', fontWeight: 'bold' }}>Lab</Chip>
                </View>
                <View style={styles.cardActions}>
                  <IconButton style={styles.courseIcon} icon={() => (<FontAwesomeIcons name="pen" size={16}/> )} onPress={() => navigation.push("EditCourse")} /> 
                  <IconButton style={styles.courseIcon} icon={() => (<FontAwesomeIcons name="trash" size={16}/> )} onPress={() => console.log('Potrebno implementirati brisanje')} />
                </View>
              </View>
            </Card.Content>
          </Card>
        ))}
      </View>
      <FAB
        style={styles.fab}
        small
        label="add"
        icon="plus"
        color="black"
        onPress={() => navigation.push("NewCourse")}
      />
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        margin: 25,
    },
    courseIcon:
    {
      backgroundColor: "white",
      width: 35,
    },
    pageTitle:
    {    
      fontWeight: "bold",
      fontSize: 24,
      marginBottom: 15,
    },
    fab: 
    {
      position: 'absolute',
      marginBottom: 40,
      marginRight: 20,
      right: 0,
      bottom: 0
    },
    courseCard:
    {
      marginBottom: 10,
    },
    cardTitle:
    {
      fontSize: 18,
      fontWeight: 'normal',
    },
    cardContentWrapper:
    {
      flexDirection: 'row',
      flexWrap: 'wrap', 
      alignItems: 'center',
    },
    cardLectureTypes:
    {
      flexDirection: 'row',
    },
    cardActions:
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    lectureTypeBadge:
    {
      borderWidth: 1.5,
      marginRight: 5,
      borderColor: '#9b5cf4',
      backgroundColor: '#f2eafe',
      
    },
});

export default Courses;
import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { IconButton, Button, Text, Title, Chip, Card } from "react-native-paper";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { FAB, Provider as PaperProvider } from "react-native-paper";


const Courses = () => {
  const dispatch = useDispatch();

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Course 1',
      lectureTypes: ['Lecture', 'Seminar'],
    },
    {
      id: 2,
      title: 'Course 2',
      lectureTypes: ['Lecture', 'Lab'],
    },
    {
      id: 3,
      title: 'Course 3',
      lectureTypes: ['Lecture'],
    },
  ]);

  useEffect(() => {
    
  }, []);


  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Your courses</Text>
        {courses.map(({ id, title, lectureTypes }) => (
          <Card style={styles.courseCard} key={id}>
            <Card.Content>
              <Title style={styles.cardTitle}>{title}</Title>
              <View style={styles.cardContentWrapper}>
                <View style={styles.cardLectureTypes}>
                  {lectureTypes.map(lectureType => <Chip style={styles.lectureTypeBadge} textStyle={{ color: '#9b5cf4', fontWeight: 'bold' }}>{lectureType}</Chip>)}
                </View>
                <View style={styles.cardActions}>
                  <IconButton style={styles.courseIcon} icon={() => (<FontAwesomeIcons name="pen" size={16}/> )} onPress={() => console.log('Luka ce dobiti posao')} /> 
                  <IconButton style={styles.courseIcon} icon={() => (<FontAwesomeIcons name="trash" size={16}/> )} onPress={() => console.log('Luka ce dobiti posao')} />
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
        onPress={() => console.log('Pressed')}
        onPress={() => navigation.push("QRScan")}
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
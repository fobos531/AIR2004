import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Button, Headline, Dialog, Portal} from 'react-native-paper';

const Home = () => {
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Headline style={styles.headline}>Your courses</Headline>
        <View style={styles.courses}>
          <Button mode="contained" style={styles.button} onPress={showDialog}>
            SOFTWARE ANALYSIS AND DESIGN
          </Button>
          <Button mode="contained" style={styles.button} onPress={showDialog}>
            FOREIGN TRADE
          </Button>
          <Button mode="contained" style={styles.button} onPress={showDialog}>
            STRATEGIC MANAGEMENT
          </Button>
        </View>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={styles.dialog}>
            <Dialog.Title style={{alignSelf: 'center'}}>
              Select lecture type
            </Dialog.Title>
            <Dialog.Content>
              <Button mode="contained" style={styles.dialogButton}>
                Lecture
              </Button>
              <Button mode="contained" style={styles.dialogButton}>
                Seminar
              </Button>
              <Button mode="contained" style={styles.dialogButton}>
                Lab
              </Button>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headline: {
    marginTop: '10%',
    fontWeight: '700',
    marginBottom: '2%',
  },
  courses: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  button: {
    padding: '3%',
    margin: '3%',
  },
  dialog: {
    flexDirection: 'column',
  },
  dialogButton: {
    width: '40%',
    padding: '2%',
    margin: '1%',
    alignSelf: 'center',
  },
});

export default Home;

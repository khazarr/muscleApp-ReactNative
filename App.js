import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        < View style = {
          {
            flex: 1,
            backgroundColor: '#002642',
            justifyContent: 'center',
            alignItems: 'center'
          }
        } >
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Roboto',
            color: '#FBFAF8'
          }} >
            MuscleApp
          </Text>
        </View>

        < View style = {
          {
            flex: 4,
            backgroundColor: '#FBFAF8',
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
        >
          <Text style={styles.time}>00</Text>
          <Text style={styles.time}>00</Text>
        </View>


        < View style = {
          {
            flex: 2,
            backgroundColor: '#4F5D75'
          }
        }
        >
        < Button
          onPress = {
            () => {
              Alert.alert('You tapped the button!');
            }
          }
          title = "BREAK TIME"
          color = "#002642"
        />
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    color: '#002642',
    fontSize: 180,
    lineHeight: 180
  }
});
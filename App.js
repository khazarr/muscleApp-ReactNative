import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import moment from 'moment'
const DATA = {
  currentTime: 1234567,
}

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        < View style = {styles.topContainer} >
          <Text style={styles.titleText}>
            MuscleApp
          </Text>
        </View>

        < View style = {styles.middleContainer}>
           < TimerDisplay time = {
             DATA.currentTime
           }
           />
        </View>


        < View style = {styles.bottomContainer} >
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

function TimerDisplay({time}) {
    const duartion = moment.duration(time)
    return <Text style={styles.time}> {duartion.minutes()}:{duartion.seconds()}:{duartion.milliseconds()} </Text>
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
    fontSize: 18,
    lineHeight: 18
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#002642',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleContainer: {
    flex: 4,
    backgroundColor: '#FBFAF8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: '#4F5D75'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#FBFAF8'
  }
});
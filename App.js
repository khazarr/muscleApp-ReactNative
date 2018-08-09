import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      totalWorkoutTime: 113311,
      start: 0,
      now: 0
    }
  }
  render() {
    const { totalWorkoutTime, now, start} = this.state
    const currentTime = now - start

    const startFun = () => {
      const now = new Date().getTime()
      this.setState({
        start: now + 1000,
        now
      })
      // this.timer = setInterval(() => {
      //   this.setState({ now: new Date().getTime()}),
      //   500 })
    }

    const stopFun = () => {
      clearInterval(this.timer)
    }

    return (
      <View style={{flex: 1}}>
        < View style = {styles.topContainer} >
          <Text style={styles.titleText}>
            MuscleApp
          </Text>
        </View>

        <View style = {styles.middleContainer}>
           <TimerDisplay time = {currentTime} style={styles.time} />
        </View>


        <View style = {styles.bottomContainer} >
        <Button
          onPress = {
            () => {
              Alert.alert('You tapped the button!');
            }
          }
          title = "BREAK TIME"
          color = "#002642"
        />
        <BreakOptions />
        <WorkoutOptions start={startFun} stop={stopFun}/>
        <TotalWorkout time={totalWorkoutTime} />

        </View>


      </View>
    );
  }
}

function TimerDisplay({time, style}) {
    const duartion = moment.duration(time)
    return <Text style={styles.time}> {duartion.minutes()}:{duartion.seconds()}:{duartion.milliseconds()} </Text>
}

function TotalDisplay({time, style}) {
    const duartion = moment.duration(time)
    return <Text style={styles.time}> {duartion.minutes()}:{duartion.seconds()} </Text>
}

function TotalWorkout({time}) {
  return (
    <View style={styles.totalWorkout}>
      <Text>Total Workout time: </Text>
      <TotalDisplay time={time}/>
    </View>
  )
}

function BreakOptions() {
  return (
    <View style={BreakOptionsStyles.MainContainer}>
      <View style={BreakOptionsStyles.TitleContainer}>
        <Text>Break Options</Text>
      </View>
      <View style={BreakOptionsStyles.BtnContainer}>
        <OptionBtn style={BreakOptionsStyles.Btn} title="+10" textStyle={BreakOptionsStyles.TextStyle}/>
        <OptionBtn style={BreakOptionsStyles.Btn} title="RETRY" textStyle={BreakOptionsStyles.TextStyle}/>
        <OptionBtn style={BreakOptionsStyles.Btn} title="END" textStyle={BreakOptionsStyles.TextStyle}/>
      </View>
    </View>
  )
}

function WorkoutOptions({start, stop}) {
  return (
    <View style={BreakOptionsStyles.MainContainer}>
      <View style={BreakOptionsStyles.TitleContainer}>
        <Text>Workout Options</Text>
      </View>
      <View style={BreakOptionsStyles.BtnContainer}>
        <OptionBtn style={BreakOptionsStyles.Btn} title="START" textStyle={BreakOptionsStyles.TextStyle} onPress={start}/>
        <OptionBtn style={BreakOptionsStyles.Btn} title="STOP" textStyle={BreakOptionsStyles.TextStyle} onPress={stop}/>
      </View>
    </View>
  )
}

function OptionBtn({ style, title, textStyle, onPress }) {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

// stykes

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
    backgroundColor: '#92DCE5',
    padding: 10
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#FBFAF8'
  },
  totalWorkout: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const BreakOptionsStyles = StyleSheet.create({
  Btn: {
    width: 65,
    height: 35,
    backgroundColor: '#002642',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3
  },
  TextStyle: {
    color: '#FBFAF8',
    fontWeight: '600'
  },
  BtnContainer: {
    flexDirection: 'row'
  },
  MainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6
  },
  TitleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})
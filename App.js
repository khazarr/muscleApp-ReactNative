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
import FontAwesome, { Icons } from 'react-native-fontawesome';
const reactTimer = require('react-native-timer')
const ONE_MIN_30_SEC = 90000

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      totalWorkoutTime: 113311,
      start: 0,
      now: 0,
      breakTime: 90000,
      waitForBreakMsg: 'Wait for it',
      breakEndedMsg: 'Keep it'
    }
  }
  startFun = () => {
    const now = new Date().getTime()
    const timeInterval = 100
    this.setState({
      start: now,
      now
    })
    // reactTimer.setInterval('main',() => {
    //   this.setState({now: new Date().getTime()})
    // }, 100)
    reactTimer.setInterval('break', () => {
      this.setState((prevState) => { 
        return {
          breakTime: prevState.breakTime - timeInterval
        }
      })
    }, timeInterval)
  }

  add10Sec = () => {
    const tenSeconds = 10000
    this.setState((prevState) => {
      return {
        breakTime: prevState.breakTime + tenSeconds
      }
    })
  }

  endBreak = () => {
    this.setState({breakTime: 0})
  }

  setBreakTimeToStart = () => {
    this.setState({breakTime: ONE_MIN_30_SEC})
  }
  stopFun = () => {
    reactTimer.clearInterval('break')
    Alert.alert('ZACZYMANE')
  }

  render() {
    const { totalWorkoutTime, now, start, breakTime, waitForBreakMsg, breakEndedMsg} = this.state
    const currentTime = now - start

    return (
      <View style={{flex: 1}}>
        < View style = {styles.topContainer} >
          <Text style={styles.titleText}>
            MuscleApp
          </Text>
        </View>

        <View style = {styles.middleContainer}>
          <View style={styles.workoutMsgContainer}>
            <Text style={styles.workoutMsg}>{breakTime > 0 ? waitForBreakMsg : breakEndedMsg}</Text>
          </View>
          <TimerDisplay time={breakTime} style={styles.time} />
          <MilisecTimerDisplay time={breakTime} />
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
          <BreakOptions add10Sec={this.add10Sec} endBreak={this.endBreak} setBreakTimeToStart={this.setBreakTimeToStart} />
        <WorkoutOptions start={this.startFun} stop={this.stopFun}/>
        <TotalWorkout time={totalWorkoutTime} />

        </View>


      </View>
    );
  }
}

function TimerDisplay({time, style}) {
    time = Math.abs(time) // propper display when break end
    const duartion = moment.duration(time)
    const minutes = duartion.minutes()
    const seconds = duartion.seconds()
    if (minutes) {
      return (
        <View style={styles.timerDisplayContainer}>
          <Text style={styles.mainTime}> {minutes >= 9 ? minutes : `0${minutes}`} </Text>
          <Text style={styles.mainTime}> {seconds >= 9 ? seconds : `0${seconds}`} </Text>
        </View>
      )
    } else {
      return (
        <View style={styles.timerDisplayContainer}>
          <Text style={styles.mainTime}> {seconds >= 9 ? seconds : `0${seconds}`} </Text>
        </View>
      )
    }
}
function MilisecTimerDisplay({time, style}) {
  time = Math.abs(time) // propper display when break end
  const miliseconds = moment.duration(time).milliseconds()
  return <Text style={[styles.milisec]}> {miliseconds != 0 ? miliseconds: '000'} </Text>
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

function BreakOptions({ add10Sec, endBreak, setBreakTimeToStart }) {
  return (
    <View style={BreakOptionsStyles.MainContainer}>
      <View style={BreakOptionsStyles.TitleContainer}>
        <Text>Break Options</Text>
      </View>
      <View style={BreakOptionsStyles.BtnContainer}>
        <OptionBtn style={BreakOptionsStyles.Btn} title="+10" textStyle={BreakOptionsStyles.TextStyle} onPress={add10Sec}/>
        <OptionBtn style={BreakOptionsStyles.Btn} title="RETRY" textStyle={BreakOptionsStyles.TextStyle} onPress={setBreakTimeToStart} />
        <OptionBtn style={BreakOptionsStyles.Btn} title="END" textStyle={BreakOptionsStyles.TextStyle} onPress={endBreak}/>
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
        <OptionBtn style={BreakOptionsStyles.Btn} title={<FontAwesome>{Icons.chevronLeft}</FontAwesome>} textStyle={BreakOptionsStyles.TextStyle} onPress={start}/>
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
    color: '#1f1f21',
    fontSize: 18,
    lineHeight: 18
  },
  mainTime: {
    fontSize: 160,
    lineHeight: 160,
    fontWeight: '100',
    fontFamily: 'Roboto',
    color: '#1f1f21',
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#002642',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleContainer: {
    flex: 4,
    backgroundColor: '#fff', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: '#eceff1',
    padding: 10,
    margin: 10,
    borderWidth: 2.5,
    borderColor: '#dddddd',
    borderRadius: 4
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
  },
  workoutMsg: {
    fontSize: 14,
    fontWeight: '200',
    margin: 'auto'
  },
  milisec: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontSize: 9,
    fontWeight: '100'
  },
  timerDisplayContainer: {
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  unitInfo: {
    fontSize: 7,
    fontWeight: '100',
    left: -30,
    position: 'relative'
  },
  workoutMsgContainer: {
    backgroundColor: '#eceff1',
    paddingHorizontal: 55,
    paddingVertical: 4,
    position: 'absolute',
    top: 5,
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
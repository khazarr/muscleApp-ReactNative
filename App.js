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
import { FontAwesome } from '@expo/vector-icons';
const reactTimer = require('react-native-timer')
const ONE_MIN_30_SEC = 90000
const isFirstStart = false

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      totalWorkoutTime: 0,
      start: 0,
      now: 0,
      breakTime: 90000,
      waitForBreakMsg: 'Wait for it',
      breakEndedMsg: 'Keep it',
      isRunning: false
    }
  }
  startFun = () => {
    const now = new Date().getTime()
    const timeInterval = 200
    this.setState({
      start: now,
      isRunning: true,
      now
    })
    // reactTimer.setInterval('main',() => {
    //   this.setState({now: new Date().getTime()})
    // }, 100)
    reactTimer.setInterval('break', () => {
      this.setState((prevState) => { 
        return {
          breakTime: prevState.breakTime - timeInterval,
          now: new Date().getTime()
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
    this.setState((prevState) => {
      const totalWorkoutTime = prevState.now - prevState.start
      return {
        totalWorkoutTime,
        isRunning: false
      }
    })
  }

  render() {
    const { totalWorkoutTime, now, start, breakTime, isRunning} = this.state
    const currentTime = now - start + totalWorkoutTime

    return (
      <View style={{flex: 1}}>
        < View style = {styles.topContainer} >
          <Text style={styles.titleText}>
            MuscleApp
          </Text>
        </View>

        <View style = {styles.middleContainer}>
 
          <MainBreakBtn setBreakTimeToStart={this.setBreakTimeToStart} time={breakTime}/>
          <TimerDisplay time={breakTime} style={styles.time} />
          <MilisecTimerDisplay time={breakTime} />
        </View>


        <View style = {styles.bottomContainer} >

        <BreakOptions add10Sec={this.add10Sec} endBreak={this.endBreak} setBreakTimeToStart={this.setBreakTimeToStart} />
          <WorkoutOptions start={this.startFun} stop={this.stopFun} isRunning={isRunning}/>
          <TotalWorkout time={currentTime} />

        </View>


      </View>
    );
  }
}

function MainBreakBtn({ time, setBreakTimeToStart }) {
  const isBreakTime = time > 0 ? false : true

  if (isBreakTime) {
    return (
      <View style={MainBreakBtnStyles.Container}>
        <TouchableOpacity style={[MainBreakBtnStyles.Btn, styles.Shadow]} onPress={setBreakTimeToStart} >
          <Text style={MainBreakBtnStyles.Text}>
            BREAK TIME
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={[styles.workoutMsgContainer, styles.Shadow]}>
        <Text style={styles.workoutMsg}>Wait for it</Text>
      </View>
    )
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
          <Text style={styles.mainTime}> {minutes > 9 ? minutes : `0${minutes}`} </Text>
          <Text style={styles.mainTime}> {seconds > 9 ? seconds : `0${seconds}`} </Text>
        </View>
      )
    } else {
        return (
          <View style={styles.timerDisplayContainer}>
            <Text style={styles.mainTime}> {seconds > 9 ? seconds : `0${seconds}`} </Text>
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
    const duration = moment.duration(time)
    const minutes = duration.minutes() + 60 * duration.hours()

    if (minutes > 0) {
      return (
        <Text style={styles.time}> {`${minutes} min`} </Text>
      )
    } else {
      return (
        <Text style={styles.time}> under 1 min </Text>
      )
    }
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
        <OptionBtn style={BreakOptionsStyles.Btn} title={<FontAwesome name="repeat" size={20} color="#eceff1" />} textStyle={BreakOptionsStyles.TextStyle} onPress={setBreakTimeToStart} />
        <OptionBtn style={BreakOptionsStyles.Btn} title={<FontAwesome name="stop" size={20} color="#eceff1" />} textStyle={BreakOptionsStyles.TextStyle} onPress={endBreak}/>
      </View>
    </View>
  )
}

function WorkoutOptions({ start, stop, isRunning}) {

  function ProperOptionBtn() {
    if (isRunning) {
      return <OptionBtn style={BreakOptionsStyles.Btn} title={<FontAwesome name="pause" size={20} color="#eceff1" />} textStyle={BreakOptionsStyles.TextStyle} onPress={stop} />
    } else {
      return <OptionBtn style={BreakOptionsStyles.Btn} title={<FontAwesome name="play" size={20} color="#eceff1" />} textStyle={BreakOptionsStyles.TextStyle} onPress={start} />
    }
  }
  return (
    <View style={BreakOptionsStyles.MainContainer}>
      <View style={BreakOptionsStyles.TitleContainer}>
        <Text>Workout Options</Text>
      </View>
      <View style={BreakOptionsStyles.BtnContainer}>
        <ProperOptionBtn />
      </View>
    </View>
  )
}

function OptionBtn({ style, title, textStyle, onPress }) {
  return (
    <TouchableOpacity style={[style, styles.Shadow]} onPress={onPress}>
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
    fontSize: 170,
    lineHeight: 170,
    fontWeight: '100',
    fontFamily: 'Roboto',
    color: '#1f1f21',
    textShadowColor: 'rgba(0, 38, 66, 0.5)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 20
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#002642',
    justifyContent: 'center',
    alignItems: 'center'
  },
  middleContainer: {
    flex: 7,
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
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#FBFAF8'
  },
  totalWorkout: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  workoutMsg: {
    fontSize: 18,
    fontWeight: '300',
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
    marginTop: 40,
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
    width: 300,
    height: 40,
    position: 'absolute',
    top: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainBreakBtn: {
    position: 'relative'
  },
  mainBreakBtnContainer: {
    marginTop: 10,
  },
  Shadow: {
    shadowColor: "#d7d7d7",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 2.22,
    elevation: 3,
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

const MainBreakBtnStyles = StyleSheet.create({
  Btn: {
    width: 300,
    height: 40,
    backgroundColor: '#002642',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Text: {
    color: '#FBFAF8',
    fontWeight: '600',
    fontSize: 17
  },
  Container: {
    position: 'absolute',
    top: 13,
  }
})
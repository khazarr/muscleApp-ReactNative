import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
            flex: 3,
            backgroundColor: '#FBFAF8'
          }
        }
        />
        < View style = {
          {
            flex: 2,
            backgroundColor: '#4F5D75'
          }
        }
        />
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
});
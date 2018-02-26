import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginScreen from './app/screens/LoginScreen'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      screen: 'login'
    }
  }


  render() {
    const { screen } = this.state

    if (screen === 'login') {
      return <LoginScreen/>
    } else {
      return (
        <View style={styles.container}>
          <IntroScreen />
        </View>
      )
    }
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

import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AuthFlowContainer from './src/navigators';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {

  componentDidMount() {
  	SplashScreen.hide();
  }

  render() {
    return <AuthFlowContainer />;
  }
}

import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import AuthFlowContainer from './src/navigators';

export default class App extends React.Component {

  render() {
    return <AuthFlowContainer />;
  }
}

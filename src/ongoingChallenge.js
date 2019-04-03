import React, { Component } from 'react'
import {Dimensions, Image, Text, TouchableWithoutFeedback, View, ScrollView, TouchableNativeFeedback, BackHandler} from 'react-native'
import styles from './challengeStyles';
import SnapCarousel from 'react-native-snap-carousel';
import axios from "axios/index";
const screen = Dimensions.get('window');
import {NavigationActions} from 'react-navigation';


class ongoingChallenge extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Select Topic',
    header: null
  })

   constructor() {
    super();
    this.state = {
      
    }
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleBackButton() {
    console.log("workingjdh");
    this.props.navigation.navigate('start');
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

   render() {
    return (
      <View style={styles.container}>
        <Text>abcd</Text>
        <Text>{this.props.navigation.state.params.subject}</Text>
        <Text>{this.props.navigation.state.params.chapter}</Text>
        <Text>{this.props.navigation.state.params.username}</Text>
        <Text>{this.props.navigation.state.params.name}</Text>
      </View>
    )
  }
}

export default ongoingChallenge

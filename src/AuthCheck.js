import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  View,
  Text
} from 'react-native';
import firebase from 'react-native-firebase';

class AuthCheck extends Component {

	constructor(props) {
    super(props);
  
  	this.authChecker = this.authChecker.bind(this);
	}


	authChecker() {

		firebase.auth().onAuthStateChanged(user => {
	            if (user) {
	                this.props.navigation.navigate('Drawer');
	            }
	            else {
	                this.props.navigation.navigate("Login");
	            }
	          }
	       	);
	}


	render () {

		this.authChecker();

		return (
	      <View>
	        <Text>Welcome to ClassCast</Text>
	      </View>
	      )
    
  }
}

export default AuthCheck;

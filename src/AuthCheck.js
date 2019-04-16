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
  
	}

	componentWillUnmount() {
        this.unsubscribe();
    }

	componentWillMount() {
		this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
			console.log("snsfwfhaohf1: "+JSON.stringify(user));
	        if (!user) {
	        	console.log("snsfwfhaohf2: "+JSON.stringify(user));
	            this.props.navigation.navigate('Login2');
	        }
	        else {
	        	console.log("snsfwfhaohf3: "+JSON.stringify(user));
	            this.props.navigation.navigate("Drawer");
	        }
	      }
	   	);
	}

	render () {

		return (
	      <View>
	        <Text>Welcome to ClassCast</Text>
	      </View>
	      )
    
  }
}

export default AuthCheck;

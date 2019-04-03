import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import SnapCarousel from 'react-native-snap-carousel';
import axios from 'axios';
import firebase from 'react-native-firebase';
import MathJax from 'react-native-mathjax';
//var currentUser = firebase.auth().currentUser;

const screen = Dimensions.get('window');
  vh = screen.height / 100;
  vw = screen.width / 100;

const question = "The equation of circle passing through (0,0), (0,a), (a,0) is AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKA"
const option1 = "x2+y2=0"
const option2 = "x2+y2=a2"
const option3 = "x2+y2=a"
const option4 = "x2+y2=0a4"

const data = [1,2,3,4,5]

const mmlOptions = {
    jax: ['input/MathML'],
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      blocks: [],
    	timer: 600,
    	ActiveSlide: 0,
    	startTime: new Date(),
    }
  }

  async componentDidMount() {
    axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjkwYmVmMzI2MmVkMzI0MzZkNzhlMjdjYWJhYzg3YmIwZWUxZGYwYzIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2xhc3NjYXN0LTE5ODgxMiIsImF1ZCI6ImNsYXNzY2FzdC0xOTg4MTIiLCJhdXRoX3RpbWUiOjE1NTI0NzMxNjAsInVzZXJfaWQiOiJ2TXdNQTFNd0J0ZFhSSnd1aExWaWtYTjR1U1IyIiwic3ViIjoidk13TUExTXdCdGRYUkp3dWhMVmlrWE40dVNSMiIsImlhdCI6MTU1MjQ3MzE2MCwiZXhwIjoxNTUyNDc2NzYwLCJwaG9uZV9udW1iZXIiOiIrOTExMTExMTExMTIyIiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTExMTExMTExMTIyIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.Vr3PGKDkArEyV6UzOFFX61F_-lVSb35cjVnpKvUgSsjSB3_ng7DptaoVIG_c-5DLxFBztSVdIxYa8uITS3ynKm6PDVo4SZzyim-fRSjv9uGz2wi-PoTZNTiKIrF75bx7WKuMQW-TOx0CY-3oO7gXInu7qDtqaUKth7Kmy85I_XJE9_m3fPbaaHdN1-127H7VYoq9-Gcx-AqowSLOEvN3WfECTCLrj7YUVV57UkJNPxMGk784tU-CH6-mAWscXfbeqiNs3f1n6LTu26gfp9m3y5xPbZo-s5W-9Mx5oCT7LDDPIDEj4Zg825e65Fcq1WtN2MGSJd5yWLziOvZ4Diamww';
    axios.get(`https://classcast-198812.appspot.com/test/test/?goal=JEE&n_questions=30`)
                .then((response)=> {
                  response['data'].map(q => {
                    
                    console.log(q.question);
                    console.log("_____________________________")
                  })
                  //this.setState({blocks: response.data});
                })
                .catch(function (error) {
                  console.log(error);
                });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
      )
  }
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAEA',
  },
  questionHeader: {
  	width: vw * 94,
  	backgroundColor: '#ffffff',
  	marginLeft: '3%',
  	marginRight: '3%',
  	marginBottom: 0.1 * vh,
  	marginTop: 1 * vh,
  	borderTopRightRadius: 2 * vw,
  	borderTopLeftRadius: 2 * vw,
  	elevation: 6,
  	flexDirection: 'row',
  	padding: 1 * vw,
  },
  questionContainer: {
  	width: vw * 94,
  	backgroundColor: '#ffffff',
  	marginLeft: '3%',
  	marginRight: '3%',
  	elevation: 6,
  	padding: 3 * vw,
  	borderBottomRightRadius: 2 * vw,
  	borderBottomLeftRadius: 2 * vw,
  },
  optionContainer: {
  	width: vw * 94,
  	backgroundColor: '#ffffff',
  	marginLeft: '3%',
  	marginRight: '3%',
  	elevation: 6,
  	marginTop: 2 * vh,
  	padding: 3 * vw,
  	borderTopRightRadius: 2 * vw,
  	borderTopLeftRadius: 2 * vw,
  	borderBottomRightRadius: 2 * vw,
  	borderBottomLeftRadius: 2 * vw,
  },
  questionHeaderPositive: {
  	marginLeft: 55 * vw, 
  	backgroundColor: 'green', 
  	height: 3 * vh, 
  	width: 5 * vh,
  	borderRadius: 1 * vw,
  	justifyContent: 'center',
    alignItems: 'center',
  },
  PreviousButton: {
  	marginTop: 4 * vh,
  	marginLeft: 3 * vw,
  	height: 6 * vh,
  	width: 20 * vw,
  	elevation: 6,
  	backgroundColor: 'white',
  	borderRadius: 2 * vw,
  	justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
  	marginTop: 4 * vh,
  	marginLeft: 53 * vw,
  	height: 6 * vh,
  	width: 20 * vw,
  	elevation: 6,
  	backgroundColor: 'white',
  	borderRadius: 2 * vw,
  	justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
  	height: 4 * vh,
  	width: 30 * vw,
  	elevation: 6,
  	backgroundColor: '#7900EA',
  	borderRadius: 2 * vw,
  	justifyContent: 'center',
    alignItems: 'center',
  },
  activeQuestion: {
  	height: 4 * vh,
  	width: 4 * vh,
  	backgroundColor: '#7900EA',
  	borderRadius: 2 * vh,
  	justifyContent: 'center',
    alignItems: 'center',
  },
  questionHeaderNegative: {
  	marginLeft: 2 * vw, 
  	backgroundColor: 'red', 
  	height: 3 * vh, 
  	width: 5 * vh,
  	borderRadius: 1 * vw,
  	justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
  	justifyContent: 'space-between',
  	flexDirection: 'row',
  	width: vw * 100,
  	height: vh * 8,
  	backgroundColor: '#EBEAEA',
  },
  header1: {
  	width: vw * 39.6,
  	height: vh * 8,
  	backgroundColor: '#ffffff',
  	justifyContent: 'center',
    alignItems: 'center',
  },
  header2: {
  	width: vw * 60,
  	height: vh * 8,
  	backgroundColor: '#ffffff',
  	justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeSnapText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inactiveSnapText: {
    color: '#C385FC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 20,
  }
})
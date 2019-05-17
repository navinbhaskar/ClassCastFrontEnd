import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  AsyncStorage,
  Dimensions,
  Alert,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import CourseListPlaceholder from "./courseListPlaceholder";
import firebase from 'react-native-firebase';

const db = firebase.firestore();

const SCREEN_WIDTH = Dimensions.get('window').width;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        {
         
        }
      ],
      isReady: false,
      modalVisible: false,
      isEnrolled: true,
      enrollCode: '',
      username: '',
      redirectCourse: ''
    }
    this.firebaseLink = this.firebaseLink.bind(this);
    this.switchModal = this.switchModal.bind(this);
    this.tryenroll = this.tryenroll.bind(this);
  }

  switchModal(){
    if(this.state.modalVisible){
      this.setState({modalVisible: false});
    }
    else {
      this.setState({modalVisible: true});
    }
  }

  firebaseLink = () => {
    console.log("hgguyguyfyfjkgkk");
    firebase.links()
    .getInitialLink()
    .then((url) => {
      console.log("hgguyguyfyfk: "+url.split('/')[5] );
      this.setState({redirectCourse: url.split('/')[5]});
    });
  }

  tryenroll(){

    var data= {
      "access_code" : this.state.enrollCode
    }

    axios.post('https://classcast-198812.appspot.com/accesstoken/enroll/', data)
              .then((response) => 
              {
                  if(response.code == 201) {
                  Alert.alert('Badhai Ho!');
                 }
                 this.props.navigation.navigate("Home");
              })
              .catch((error) => {
                  Alert.alert('Wrong passcode, please try again or contact ClassCast team');
              })


  }

   async componentDidMount() {
     console.log('znjdnd: '+this.props.navigation.state.params.data.firstname+ ' '+this.props.navigation.state.params.data.lastname);
      this.firebaseLink();
      axios.get('https://classcast-198812.appspot.com/teachers/teachercoursedatanew/'+this.props.navigation.state.params.data.teacher_id+'/')
                .then(function (response){
                  this.setState({courses: response.data.data});
                  this.setState({isEnrolled: response.data.teacher_enrolled});
                  this.setState({isReady: true});
                }.bind(this))
                .catch(function (error) {
                  console.log('error');
                });

    var currentUser = await firebase.auth().currentUser;                 
     await currentUser.getIdToken()
            .then(idToken => {
                  this.setState({ username: currentUser['phoneNumber'].slice(3, 13) })
                });
  }

  _renderItem ({item, index}) {
    console.log("djdsdijk: "+JSON.stringify(item));
    if(item.block_id == this.state.redirectCourse) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'CourseHome',
        params: {
          course_id: item.block_id,
          display_name: item.display_name,
          teacher_name: this.props.navigation.state.params.data.firstname+ ' '+this.props.navigation.state.params.data.lastname,
          number_of_videos: item.number_of_videos,
          number_of_assignment: item.number_of_assignment,
          number_of_pdf: item.number_of_pdf,
          percentage_completion: item.percentage_completion,
        },
      });
      this.props.navigation.dispatch(navigateAction);
    }
    return (
            <View style={styles.courseCardContainer}>
              <Text style={styles.h2}>{item.display_name} </Text>
              <View style={styles.coursePreview}>
                <View style={styles.coursePreviewLeft}>
                  <View style={styles.courseAbout}>
                    <Text style={{textAlign: 'justify', fontFamily: 'ProximaNova-Regular',}}>{item.course_info}</Text>
                  </View>
                 <View style={styles.videoTestCount}>
                    <Icon
                      name='play-circle-outline'
                      type='material'
                      color='red'
                    />
                    <Text style={styles.videoCount}> {item.number_of_videos} Videos </Text>

                    <Icon
                      name='description'
                      type='material'
                      color='green'
                    />
                    <Text style={styles.videoCount}> {item.number_of_assignment} Tests </Text>
                  </View>
                </View>
                <View style={styles.courseImageContainer}>
                    <Image source={{uri: item.display_image}} style={styles.courseImage}/>
                    <Button title="Resume"
                     onPress = {()=> {
                      if(this.state.isReady){
                        if(this.state.isEnrolled) {
                          const navigateAction = NavigationActions.navigate({
                          routeName: 'CourseHome',
                          params: {
                            course_id: item.block_id,
                            display_name: item.display_name,
                            teacher_name: this.props.navigation.state.params.data.firstname+ ' '+this.props.navigation.state.params.data.lastname,
                            number_of_videos: item.number_of_videos,
                            number_of_assignment: item.number_of_assignment,
                            number_of_pdf: item.number_of_pdf,
                            percentage_completion: item.percentage_completion,
                          },
                        });
                        this.props.navigation.dispatch(navigateAction);
                         }
                         else {
                          ToastAndroid.show('Please enrol to view the course', ToastAndroid.SHORT);
                         }
                       }
                     }
                     }
                      //this.props.navigation.navigate('CourseHome')} 
                      />
                </View>
              </View>
            </View>

         );
    }

  render () {
    return (
      <View style={styles.container}>
      <CourseListPlaceholder onReady={this.state.isReady} animate="fade">
        <FlatList
          data={this.state.courses}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem.bind(this) }
          keyExtractor={(item, index) => index.toString()}
        />
        </CourseListPlaceholder>
        {(!this.state.isEnrolled && !this.state.modalVisible) &&
         <Button
                containerStyle={{ marginVertical: 20, marginLeft: 20 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                buttonStyle={{
                  height: 55,
                  width: SCREEN_WIDTH - 40,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                title="Enrol Now"
                titleStyle={{
                  fontFamily: 'regular',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={() => {
                  const navigateAction = NavigationActions.navigate({
                          routeName: 'accessCode'
                        });
                        this.props.navigation.dispatch(navigateAction);
                }}
                activeOpacity={0.5}
              />
            }
          <Modal backdropOpacity={0.6}
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.switchModal();
            Alert.alert('Modal has been closed.');
          }}>

          <View style={{margin: 35, height: '50%' , width: '80%', marginTop: '40%', backgroundColor: '#1e90ff', borderRadius: 10, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.headerText}>Enter Access Code given by your teacher</Text>
              
                <Input
                  onChangeText={enrollCode => this.setState({ enrollCode })}
                  inputStyle={styles.inputStyle}
                  autoFocus={true}
                  autoCapitalize="none"
                  errorStyle={styles.errorInputStyle}
                  autoCorrect={true}
                  blurOnSubmit={true}
                  placeholderTextColor="#7384B4"
                />
                <Icon
                      raised
                      name='keyboard-arrow-right'
                      type='material'
                      color='red'
                      onPress = {()=> this.tryenroll()}
                    />
              <TouchableHighlight onPress={() => {
                  firebase.firestore().collection('enrollment_requests').add({
                    student: this.state.username,
                    teacher: this.props.navigation.state.params.data.firstname + ' ' + this.props.navigation.state.params.data.lastname,
                    status: false,
                  })
                  this.switchModal();}}>
                <Text style={[styles.headerText, {color: 'red'}]}>Don't have any Access Code</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.switchModal();}}>
                <Text style={styles.headerText}>Dismiss</Text>
              </TouchableHighlight>
          </View>
        </Modal>
        
      </View>
      )
  }
}

export default Courses;

const styles = StyleSheet.create({
  
  container:{
     flex: 1,
     alignItems: 'center',
     backgroundColor: '#ffffff'
   },
   h2:{
    fontFamily: 'ProximaNova-Bold',
    paddingLeft: 1 * vw,
     fontSize: 3.2 * vh,
     color: 'black'
   },
   videoCount: {
    fontFamily: 'ProximaNova-Regular',
     color: 'black'
   },
   h2Blue:{
     fontSize: 3.0 *vh,
     fontWeight: 'bold',
     color: 'blue'
   },
   courseCardContainer:{
     width: '98%',
     borderRadius: 2 * vw,
     backgroundColor:'#ffffff',
     elevation: 10,
     marginTop: 1 * vh,
     padding: 1.5* vh,
     marginBottom: 1 * vh,
     alignSelf: 'center',
   },
   coursePreview:{
     flex:1,
     flexDirection:'row',
   },
   coursePreviewLeft:{
     width:'70%',
     margin: 0.5 * vh,
   },
   courseAbout:{
     padding: 1 * vw,
     width: '100%',
   },
   courseImageContainer:{
     width:'28%',
     margin: 0.4 * vh,
     alignSelf: 'center',
   },
   courseImage:{
     resizeMode:'contain',
     alignItems: 'flex-end',
     height: 10 * vh,
     width: 10 * vh,
     marginBottom: 0.5 * vh,
     alignSelf: 'center',
   },
    headerText: {
    fontSize: 20,
    color: 'white',
    zIndex: 100,
    paddingTop: 2 * vh,
    paddingLeft: 3 * vw,
    fontFamily: 'ProximaNova-Regular',
  },
    videoTestCount:{
      flex:1,
      alignItems:'center',
      flexDirection:'row',
    },
    inputContainer: {
      paddingLeft: 8,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: 'red',
      height: 45,
      width: 150,
      marginVertical: 10,
    },
    inputStyle: {
      flex: 1,
      marginLeft: 10,
      color: 'white',
      fontFamily: 'light',
      fontSize: 16,
    },
    errorInputStyle: {
      marginTop: 0,
      textAlign: 'center',
      color: '#F44336',
    }
  });

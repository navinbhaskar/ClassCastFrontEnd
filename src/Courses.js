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
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import courseListPlaceholder from "./courseListPlaceholder";

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
      enrollCode: ''
    }
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

  tryenroll(){

    var data= {
      "access_code" : this.state.enrollCode
    }

    axios.post('https://classcast-198812.appspot.com/accesstoken/enroll/', data)
              .then((response) => 
              {
                 console.log("API response" + JSON.stringify(response))
                  if(response.code == 201) {
                  Alert.alert('Badhai Ho!');
                 }
                 this.props.navigation.navigate("Home");
              })
              .catch((error) => {
                  Alert.alert('Wrong passcode, please try again or contact ClassCast team');
                  console.log("API error" + JSON.stringify(error))
              })


  }

   componentDidMount() {
    console.log("skkslanlx: "+JSON.stringify(this.props.navigation.state.params.data.teacher_id));
      axios.get('https://classcast-198812.appspot.com/teachers/teachercoursedata/'+this.props.navigation.state.params.data.teacher_id+'/')
                .then(function (response){
                  this.setState({courses: response.data.data});
                  this.setState({isEnrolled: response.data.teacher_enrolled});
                  this.setState({isReady: true});
                  console.log("Navigation" + JSON.stringify(response));
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
  }


  _renderItem ({item, index}) {
    console.log("hsbsahbhdas: "+JSON.stringify(item))
    return (
            <View style={styles.courseCardContainer}>
              <Text style={styles.h2}>{item.display_name} </Text>
              <View style={styles.coursePreview}>
                <View style={styles.coursePreviewLeft}>
                  <View style={styles.courseAbout}>
                    <Text>{item.course_info}</Text>
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
                      const navigateAction = NavigationActions.navigate({
                      routeName: 'CourseHome',
                      params: {
                        course_id: item.block_id,
                        display_name: item.display_name,
                        number_of_videos: item.number_of_videos,
                        number_of_assignment: item.number_of_assignment,
                        number_of_pdf: item.number_of_pdf,
                        percentage_completion: item.percentage_completion,
                      },
                    });
                    this.props.navigation.dispatch(navigateAction);
                     }}
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
        <FlatList
          data={this.state.courses}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem.bind(this) }
          keyExtractor={(item, index) => index.toString()}
        />
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
                title="Enroll Now"
                titleStyle={{
                  fontFamily: 'regular',
                  fontSize: 20,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={() => {this.switchModal();}}
                activeOpacity={0.5}
              />
            }
          <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={{margin: 35, height: '60%' , width: '80%', backgroundColor: '#1e90ff', borderRadius: 10, elevation: 3, alignItems: 'center', justifyContent: 'center'}}>
              <Text>Hello World!</Text>
              
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
    
              <TouchableHighlight
                onPress={() => {this.switchModal();}}>
                <Text>Hide Modal</Text>
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
      backgroundColor: '#121212'
    },
    h2:{
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black'
    },
    videoCount: {
      color: 'black'
    },
    h2Blue:{
      fontSize: 20,
      fontWeight: 'bold',
      color: 'blue'
    },
    courseCardContainer:{
      width: '100%',
      borderRadius:5,
      backgroundColor:'white',
      elevation: 3,
      marginTop: 10,
      padding: 5
    },
    coursePreview:{
      flex:1,
      flexDirection:'row',
    },
    coursePreviewLeft:{
      width:'60%',
      margin: 2,
    },
    courseAbout:{
      width: '100%',
    },
    courseImageContainer:{
      width:'36%',
      margin: 2,
    },
    courseImage:{
      resizeMode:'contain',
      height: 120,
      width: 120
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

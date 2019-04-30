import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import axios from "axios";
import firebase from 'react-native-firebase';
import { DrawerActions } from 'react-navigation-drawer';
import CourseListPlaceholder from "./courseListPlaceholder";
import {NavigationActions} from 'react-navigation';

class disover extends Component {


  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.state = {
      username: '',
      n_teachers: 0,
      isReady: false,
    availableTeachers: [
      {
      }
      ]
    }
  }

  async componentDidMount() {       
    var currentUser = await firebase.auth().currentUser;                 
     await currentUser.getIdToken()
                      .then(idToken => {
                            
                            this.setState({ username: currentUser['phoneNumber'].slice(3, 13) })
                          });

    axios.get(`https://classcast-198812.appspot.com/teachers/availableTeachers/`+this.state.username)
              .then(function (response){
                this.setState({availableTeachers: response.data});
                this.setState({n_teachers: response.data.length});
                this.setState({isReady: true});
              }.bind(this))
              .catch(function (error) {
                console.log('error');
                this.setState({isReady: true});
              });
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({isReady: false});
      axios.get(`https://classcast-198812.appspot.com/teachers/availableTeachers/`+this.state.username)
              .then(function (response){
                this.setState({availableTeachers: response.data});
                this.setState({n_teachers: response.data.length});
                this.setState({isReady: true});
              }.bind(this))
              .catch(function (error) {
                console.log('error');
                this.setState({isReady: true});
              });
    })
  } 



  _renderItem ({item, index}) {
    return (
            <View style={styles.teacherCardContainer}>
              <View style={styles.teacherPreview}>
                <View style={styles.teacherPreviewLeft}>
                  <Text style={styles.h2}>{item.firstname} {item.lastname} - {item.subject} </Text>
                    <View style={styles.insituteName}>
                      <Icon
                          name='university'
                          type='font-awesome'
                          color='green'
                        />
                      <Text style={styles.h3}> {item.coaching_name} </Text>

                    </View>
                    <View style={styles.insituteName}>
                      <Icon
                          name='compass'
                          type='font-awesome'
                          color='blue'
                          size={30}
                        />
                      <Text style={styles.h3}> {item.area} </Text>
                      
                    </View>
                  
                 <View style={styles.videoTestCount}>
                    <Icon
                      name='play-circle-outline'
                      type='material'
                      color='red'
                    />
                    <Text style={styles.videoCount}> {item.number_of_courses} Courses </Text>

                  </View>
                </View>
                <View style={styles.teacherCardRight} >
                <View style= {styles.teacherImageContainer}>
                    <Image source={{uri: item.photo}} style={styles.teacherImage}/>
                </View>
                <Button title="View"  buttonStyle={{width:100}}
                  onPress={() => {
                    this.props.navigation.navigate('HomeStack', {}, NavigationActions.navigate({ 
                          routeName: 'TeacherArea',
                          params: {
                            data: item
                          },
                        }));
                  }
                  }/>
                </View>
              </View>
            </View>

         );
    }

  render () {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', height: 9 * vh}}>
        <View style={{justifyContent:'flex-start', marginLeft: 3 * vw}}>
        <Icon           
          name='menu'
          color='white'
          type='material'
          size= {35} 
          onPress={() => this.props.navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        </View>
        <View style={{marginLeft:0}}>
          <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}> Discover Teachers</Text>
        </View>
        <View style={{justifyContent:'flex-end', marginRight: 3 * vw}}>
        <Icon
          name='notifications'
          color='white'
          type='material'
          size= {35} 
          onPress={() => this.props.navigation.navigate('notification', { title: "Notification" })}
          />
        </View>

      </View>

      <CourseListPlaceholder onReady={this.state.isReady} animate="fade">
      { this.state.n_teachers == 0 && this.state.isReady &&
        <View style={{height: 5 * vh, width: 60 * vw, marginTop: 5 * vh}}>
          <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}> No available teachers </Text>
        </View>
      }
        <FlatList
          data={this.state.availableTeachers}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem }
          keyExtractor={(item, index) => index.toString()}
        />
      </CourseListPlaceholder>
        
      </View>
      )
  }
}

export default disover;

const styles = StyleSheet.create({
  
  container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      backgroundColor: '#0F3651',
    },
    h2:{
      fontSize: 2.8 * vh,
      fontWeight: 'bold',
      color: 'black'
    },
    h3:{
      fontSize: 2.4 * vh,
      color: 'black'
    },
    videoCount: {
      color: 'black'
    },
    h2Blue:{
      fontSize: 3 * vh ,
      fontWeight: 'bold',
      color: 'blue'
    },
    teacherCardContainer:{
      width: '100%',
      borderRadius: 3 * vw,
      backgroundColor:'white',
      elevation: 3,
      marginTop: 2* vh ,
      padding: 2 * vh
    },
    teacherPreview:{
      flex:1,
      flexDirection:'row',
    },
    teacherPreviewLeft:{
      width:'60%',
      margin: 0.5 * vh ,
    },
    teacherAbout:{
      width: '100%',
    },
    teacherImageContainer:{
      margin: 1 * vh,
      alignItems: 'center'
    },
    teacherCardRight:{
      width:'36%',
      margin: 0.5* vh ,
      alignItems: 'center'

    },
    teacherImage:{
      resizeMode:'contain',
      height: 25 * vw,
      width: 25 * vw,
    },
    videoTestCount:{
      flex:1,
      alignItems:'center',
      flexDirection:'row',
      margin: 0.5 * vh,
    },
    insituteName:{
      flex:1,
      alignItems:'center',
      flexDirection:'row',
      margin : 0.5 * vh,
    }
  });
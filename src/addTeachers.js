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

const Teacher_Image = require('./images/user-hp.png');
const data = [ 50, 10, 40, 95, -4, -24, 85, 91 ];




class addTeachers extends Component {


  constructor(props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
    this.state = {
    username: '',
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
                            console.log("AXABXJBJ: "+JSON.stringify(currentUser));
                            console.log("AXABXJBJ: "+currentUser['phoneNumber'].slice(3, 13));
                            this.setState({ username: currentUser['phoneNumber'].slice(3, 13) })
                          });

    axios.get('https://classcast-198812.appspot.com/teachers/availableTeachers/'+this.state.username)
              .then(function (response){
                this.setState({availableTeachers: response.data});
              }.bind(this))
              .catch(function (error) {
                console.log(error);
              });
  } 

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  })


  _renderItem ({item, index}) {
    return (
            <View style={styles.teacherCardContainer}>
              <View style={styles.teacherPreview}>
                <View style={styles.teacherPreviewLeft}>
                  <Text style={styles.h2}>{item.name} - {item.subject} </Text>
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
                  onPress={() => this.props.navigation.navigate('TeacherArea', { data: item})}/>
                </View>
              </View>
            </View>

         );
    }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.availableTeachers}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem }
          keyExtractor={(item, index) => index.toString()}
        />
        
      </View>
      )
  }
}

export default addTeachers;

const styles = StyleSheet.create({
  
  container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      backgroundColor: '#0F3651',
    },
    h2:{
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black'
    },
    h3:{
      fontSize: 16,
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
    teacherCardContainer:{
      width: '100%',
      borderRadius:5,
      borderWidth: 1,
      backgroundColor:'white',
      elevation: 3,
      marginTop:5,
      padding: 5
    },
    teacherPreview:{
      flex:1,
      flexDirection:'row',
    },
    teacherPreviewLeft:{
      width:'60%',
      margin: 2,
    },
    teacherAbout:{
      width: '100%',
    },
    teacherImageContainer:{
      margin: 5,
      alignItems: 'center'
    },
    teacherCardRight:{
      width:'36%',
      margin: 5,
      alignItems: 'center'

    },
    teacherImage:{
      resizeMode:'contain',
      height: 100,
      width: 100
    },
    videoTestCount:{
      flex:1,
      alignItems:'center',
      flexDirection:'row',
      margin: 2,
    },
    insituteName:{
      flex:1,
      alignItems:'center',
      flexDirection:'row',
      margin :2,
    }
  });

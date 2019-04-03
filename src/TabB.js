import React, { Component } from 'react'
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts';
import { ListItem, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import axios from "axios";
import firebase from 'react-native-firebase';
import * as shape from 'd3-shape'

var USER_DP = require('./images/user-hp.png');


class TabB extends Component {


  constructor(props) {
    super(props);
    this.state = {
    teachers: [
      {
        type: 'add'
      }
      ],
    performance: [
    ]
    }
  }



  async componentDidMount() {    
      var currentUser = await firebase.auth().currentUser;                 
     await currentUser.getIdToken()
                      .then(function(idToken){
                            console.log(" ID Token : "  + idToken);
                            axios.defaults.headers.common['Authorization'] = idToken; 
                          });
      
      axios.get(`https://classcast-198812.appspot.com/teachers/myteachers/`)
                .then(function (response){
                  response.data.push({type: 'add'});
                  this.setState({teachers: response.data});
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
      axios.get('https://classcast-198812.appspot.com/performance/getmyperformance/1111111122')
                .then(function (response){
                  console.log("Performance: " + response.data);
                  this.setState({performance: response.data});
                }.bind(this))
                .catch(function(error){
                  console.log(error);
                });
  } 


  static navigationOptions = {
    title: 'Home',
    header: null
  }

  _renderItem ({item, index}) {

     console.log(JSON.stringify(item))

      if(item.type) {
        return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('addTeachers', { title: "Add Teachers" })}>
                <View style={styles.teacherContainer}>
                    <Icon
                      name='pluscircleo'
                      type='antdesign'
                      size= {70} />
                    
                    <Text style={styles.teacherName}> Add New </Text>
                </View>
              </TouchableOpacity>
        );
      }

      else {

        return (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TeacherArea', { data: item})}>
                <View style={styles.teacherContainer}>
                  <View style={styles.teacherImageContainer}>
                    <Image
                      source={{uri: item.photo}}
                      style={styles.teacherImage}/>
                    </View>
                    <Text style={styles.teacherName}> {item.firstname} </Text>
                </View>
              </TouchableOpacity>
        );
      }
      }

  render() {
    const classes = ['11', '12', '12+']
    const streams = ['Science', 'Commerce']
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 }
    const xAxisHeight = 30
      
    const list = [
      {
        name: 'Rohit Gaba',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Chemistry',
        message: 'Added a course in Electrochemistry',
      },
      {
        name: 'Ashutosh Jha',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Chemistry',
        message: 'Cancelled class on 17/8/19',
      }
    ]
    return (
     <ScrollView>
     <View style={styles.container}>
      
      <View style={styles.linearGradient} >
        <Text style={styles.h3}> Your Classrooms</Text>
      </View>

      <View style={styles.classrooms}>
          <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.teachers}
              renderItem={this._renderItem.bind(this)}
              sliderWidth={380}
              itemWidth={100}
              inactiveSlideOpacity={1}
              inactiveSlideScale={1}
            />
      </View>
      

      <View style={styles.performaceContainer} >
        <Text style={styles.h3}> Your Performance</Text>
      </View>  
      <LineChart
                  style={{ height: 120, width: 320, position: 'absolute', marginTop: 320, borderRadius:2, borderWidth: 1, borderColor:'grey' }}
                  data={ this.state.performance }
                  svg={{ stroke: 'rgb(134, 65, 244)',
                          strokeWidth: 2, }}
                  contentInset={{ top: 20, bottom: 20 }}
                  curve={ shape.curveNatural }
              >
                  
      </LineChart>

      <View style={styles.updatesContainer}>
        <Text style={styles.h3}> Updates...</Text>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
      </View>


    </View>
    </ScrollView>
  );
  }}

export default TabB;

const styles = StyleSheet.create({
  
  container: {
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#0F3651',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
   h2: {
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 28,
    color: 'grey',
  },
   h3: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 20,
    paddingLeft: 10,
    color: 'black',
    fontWeight: 'bold'
  },
   teacherImage: {
    height: 80,
    width: 80,
    resizeMode:'contain',
  },
  teacherName: {
    fontSize:12,
    color: '#0F3651',
    fontWeight: 'bold',   
  },
  classrooms:{
    height: 150,
    width:'100%',
    borderRadius:5,
    position: 'absolute',
    marginTop: 95,
    alignItems: 'center'
  },
  linearGradient:{
    marginTop: 10,
    height: 200,
    flexDirection: 'row',
    width: '100%',
    borderRadius:5,
    backgroundColor:'white',
    borderWidth:1,
    borderColor: 'grey',
    zIndex: 0,
  },
  performaceContainer:{
    marginTop: 10,
    height: 220,
    width:'100%',
    flexDirection: 'row',
    borderRadius:5,
    backgroundColor:'white',
    borderWidth:1,
    borderColor: 'grey'
  },
  updatesContainer:{
    marginTop: 10,
    width:'100%',
    borderRadius:5,
    backgroundColor:'white',
    borderWidth:1,
    borderColor: 'grey'
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  teacherImageContainer: {
    height: 90,
    width: 90,
    borderRadius: 45,
    borderWidth: 3,
    marginTop:5,
    alignItems:'center',
    justifyContent: 'center',
    borderColor: '#0F3651',
    elevation: 3
  },
  teacherContainer: {
    margin: 3,
    height: 145,
    elevation: 4,
    zIndex: 1,
    alignItems:'center'
  }
});
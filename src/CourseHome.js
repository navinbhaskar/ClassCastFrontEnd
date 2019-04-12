import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  SectionList,
  TouchableNativeFeedback,
  ActivityIndicator,
  Modal
} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { ProgressCircle }  from 'react-native-svg-charts';
import axios from 'axios';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const videoIcon = require('./images/download.jpg');    

class CourseHome extends Component {

  navigateToScreen = (route, url) => {
    console.log("working2");
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {
        url: url,
      },
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props) {
    super(props);
    this.state = {
      startBuffering: false,
      blocks: [
        {
         
        }
      ]
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Electrostatistics"
  })


  componentDidMount() {
      axios.get(`https://classcast-198812.appspot.com/coursedata/courseblocks/MA1211AC`)
                .then(function (response){
                  this.setState({blocks: response.data.blocks});
                  
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
  }

  render() {     
    return (
            <View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.startBuffering}
            >
            <View style={{height: 100, width: 100, alignItems: 'center', justifyContent: 'center', position: 'absolute', marginTop: 300, marginLeft: 150}}>
              <DotIndicator color='purple' />
              </View>
            </Modal>
              <ScrollView contentContainerStyle={styles.container}>
                <View style = {styles.courseAboutContainer}>
                  <View style= {styles.componentCount}>
                    <View style= {styles.singleComponentCount}>
                      <Icon
                        name='play-circle-outline'
                        type='material'
                        color='#0F3651'
                      />
                      <Text style={styles.videoCount}> 3 Videos </Text>
                    </View>
                    <View style= {styles.singleComponentCount}>
                      <Icon
                        name='play-circle-outline'
                        type='material'
                        color='#0F3651'
                      />
                      <Text style={styles.videoCount}> 3 Videos </Text>
                    </View>
                    <View style= {styles.singleComponentCount}>
                      <Icon
                        name='play-circle-outline'
                        type='material'
                        color='#0F3651'
                      />
                      <Text style={styles.videoCount}> 3 PDFs </Text>
                    </View>
                  </View>
                  <View style = {styles.progress}>
                      <ProgressCircle
                          style={ { height: 95, width: 95, position:'absolute' } }
                          progress={ 0.7 }
                          progressColor={'#0F3651'}
                      />
                      <Text style={{ color: 'black', fontSize: 24}}> 56% </Text>
                      <Text style={styles.videoCount}> Completed </Text>
                  </View>
                </View>


                <View>
                  {
                    this.state.blocks && this.state.blocks.map((blocks, index)=>{
                      
                      return(
                      <View>
                      <View style={styles.sectionHeader}>
                        <Text style={{fontSize: 16, color: '#0F3651', fontWeight: 'bold'}}>{blocks.title} </Text>
                      </View>

                      <View style={styles.sectionContent}>
                        {
                          blocks.data && blocks.data.map((data, index)=>{
                            console.log("working4: "+data.url);
                            return(
                              <TouchableNativeFeedback
                                onPress={() => {
                                  this.setState({startBuffering: true});
                                  axios.post(`https://classcast-198812.appspot.com/coursedata/generateSignedUrl`, {
                                    "path": "/classcast-198812.appspot.com/classcast_videos/Mathematics_CBSE/Anurag_Chauhan_Delhi/Class_12/Applications_of_Derivatives/Day%201%20Out%20-%20%20(1)-1.mp4"
                                  })
                                    .then( response => {
                                      console.log("ABCD: "+JSON.stringify(response.data));
                                      this.setState({startBuffering: false});
                                      this.navigateToScreen('video', response.data);
                                    })
                                  }
                              }

                              >
                                <View style={styles.videoComponent}>
                                <View style={styles.videoPreview}>
                                    <Image source={{uri: data.image}} style={{height:70, width: 130}}/>
                                </View>
                                {console.log("URL: "+JSON.stringify(data))}
                                <View style = {styles.aboutVideo}>
                                    <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>{data.display_name}</Text>
                                    <Text style={{fontSize: 12, color: 'black'}}> 36 Minutes</Text>
                                    <Text style={{fontSize: 12, color: 'black'}}> +3 Points </Text>
                                </View>                     

                            </View>
                            </TouchableNativeFeedback>
                              )
                          })
                        }
                      </View>
                      </View>
                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>
    
  );
  }
}
export default CourseHome;


const styles = StyleSheet.create({
  container:{
    paddingBottom: 100,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#dbdbdb'
  },
  singleComponentCount:{
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  componentCount:{
    margin:15,
  },
  sectionHeader:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 5,
    marginTop: 10,
    alignItems: 'center'
  },
  courseAboutContainer:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 5,
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 2,
    backgroundColor: 'white'
  },
  videoCount: {
    color: 'black'
    },
  progress: {
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionContent: {
    backgroundColor: "white",
    margin: 5,
    elevation:2,
    borderRadius: 5,
  },
  videoPreview:{
    margin: 5,
    height: 80,
    width: 140,
  },
  videoComponent:{
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 0,
    marginRight: 8,
    flex:1,
    flexDirection: 'row',
  },
  aboutVideo:{
    justifyContent:'center',
    width: 190
  },
  hairline: {
      backgroundColor: 'black',
      height: 2,
      width: 165
},
  
});

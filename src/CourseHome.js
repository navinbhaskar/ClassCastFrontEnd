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
  Modal,
  ToastAndroid,
  Dimensions
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

const screen = Dimensions.get('window'),
  vh = screen.height / 100,
  vw = screen.width / 100;

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
      title: '',
      blocks: [
        {
         
        }
      ]
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "course"
  })


  componentDidMount() {
    //this.setState({title: this.props.navigation.state.params.display_name});
    console.log("hsbsahbhdasaa: "+JSON.stringify(this.props.navigation.state.params));
      axios.get('https://classcast-198812.appspot.com/coursedata/courseblocks/'+this.props.navigation.state.params.course_id+'/')
                .then(function (response){
                  this.setState({blocks: response.data.blocks});
                  console.log("sakjbskbs: "+JSON.stringify(response))
                }.bind(this))
                .catch(function (error) {
                  console.log(error);
                });
  }

  render() {     
    return (
            <View style={{height: 100*vh, width: '100%', justifyContent: 'center',  alignItems: 'center', flex: 1}}>
            <Modal
              visible={this.state.startBuffering}
              transparent={true}
              backdropOpacity={0.6}
              backdropColor="black"
            >

            <View style={{height: 20 * vh,width: 30 * vw, borderRadius: 1.5 * vw, marginTop: 34 * vh, marginLeft: 35 * vw, backgroundColor: 'white'}}>
              <MaterialIndicator/>
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
                      <Text style={styles.videoCount}> {this.props.navigation.state.params.number_of_videos+ ' Videos'} </Text>
                    </View>
                    <View style= {styles.singleComponentCount}>
                      <Icon
                        name='play-circle-outline'
                        type='material'
                        color='#0F3651'
                      />
                      <Text style={styles.videoCount}> {this.props.navigation.state.params.number_of_assignment+ ' Assignments'} </Text>
                    </View>
                    <View style= {styles.singleComponentCount}>
                      <Icon
                        name='play-circle-outline'
                        type='material'
                        color='#0F3651'
                      />
                      <Text style={styles.videoCount}> {this.props.navigation.state.params.number_of_pdf+ ' PDFs'} </Text>
                    </View>
                  </View>
                  <View style = {styles.progress}>
                      <ProgressCircle
                          style={ { height: 95, width: 100, position:'absolute' } }
                          progress={ this.props.navigation.state.params.percentage_completion }
                          progressColor={'#0F3651'}
                      />
                      <Text style={{ color: 'black', fontSize: 24}}> {this.props.navigation.state.params.percentage_completion+'%'} </Text>
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
                            console.log("working4: "+data.path);
                            console.log("working4: "+data.block_type);
                            if(data.block_type == 'video') {
                              return(
                                <TouchableNativeFeedback
                                  onPress={() => {
                                    this.setState({startBuffering: true});
                                    axios.post(`https://classcast-198812.appspot.com/coursedata/generateSignedUrl`, {
                                      "path": data.path
                                      //"path": "/classcast-198812.appspot.com/classcast_videos/Mathematics_CBSE/Anurag_Chauhan_Delhi/Class_12/Applications_of_Derivatives/Day%201%20Out%20-%20%20(1)-1.mp4"
                                    })
                                      .then( response => {
                                        console.log("ABCD: "+JSON.stringify(response.data));
                                        this.setState({startBuffering: false});
                                        this.navigateToScreen('video', response.data);
                                      })
                                      .catch(err => {
                                        this.setState({startBuffering: false});
                                        ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
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
                              }
                            else if(data.block_type == 'pdf'){
                              return(
                                <TouchableNativeFeedback
                                  onPress={() => {
                                    this.setState({startBuffering: true});
                                    axios.post(`https://classcast-198812.appspot.com/coursedata/generateSignedUrl`, {
                                      "path": data.path
                                    })
                                      .then( response => {
                                        console.log("ABCD: "+JSON.stringify(response.data));
                                        this.setState({startBuffering: false});
                                        this.navigateToScreen('pdfViewer', response.data);
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
                            }
                            else if(data.block_type == 'problem'){
                              return(
                                <TouchableNativeFeedback
                                  onPress={() => {
                                    this.setState({startBuffering: true});
                                    axios.post(`https://classcast-198812.appspot.com/coursedata/fetchassignmentquestions`, {
                                      "block_id": data.url
                                    })
                                      .then( response => {
                                        console.log("ABCD: "+JSON.stringify(response.data));
                                        this.setState({startBuffering: false});
                                        this.navigateToScreen('assignmentQuestions', response.data);
                                      })
                                      .catch(err=> {
                                        console.log("ABCDerror: "+JSON.stringify)
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
                            }
                            else {
                              return(
                                <TouchableNativeFeedback
                                  onPress={() => {
                                    
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
                            }
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
    width: 100 * vw,
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
    justifyContent: 'center',
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

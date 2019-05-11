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
import firebase from 'react-native-firebase';
import {NavigationActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { ProgressCircle }  from 'react-native-svg-charts';
import axios from 'axios';
import {MaterialIndicator} from 'react-native-indicators';

const screen = Dimensions.get('window'),
  vh = screen.height / 100,
  vw = screen.width / 100;
   

class CourseHome extends Component {

  navigateToScreen = (route, url, block_id, course_id) => {
    console.log("saklndlknA: "+route);
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      params: {
        url: url,
        block_id: block_id,
        course_id: course_id
      },
    });
    this.props.navigation.dispatch(navigateAction);
  }

  constructor(props) {
    super(props);
    this.firebaseLink = this.firebaseLink.bind(this);
    this.state = {
      startBuffering: true,
      title: '',
      completion: 0.000,
      blocks: [
        {
         
        }
      ]
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: "course"
  })

  firebaseLink = () => {
    console.log("gkyyufyifkkkkk");
    firebase.links()
    .getInitialLink()
    .then((url) => {
      var startIndex = url.indexOf('///',1);
      console.log("gkyyufyif: "+startIndex);
      console.log("gkyyufyif: "+url.slice(startIndex+2,url.length));
      this.setState({redirectCourse: url.slice(startIndex+2,url.length)});
      axios.post(`https://classcast-198812.appspot.com/coursedata/generateSignedUrl`, {
        "path": url.slice(startIndex+2,url.length)
      })
        .then( response => {
          console.log("gkyyufyifSS: "+JSON.stringify(response.data));
          this.setState({startBuffering: false});
          this.navigateToScreen('video', response.data, data.block_id, this.props.navigation.state.params.course_id);
          //this.navigateToScreen('video', response.data);
        })
        .catch(err => {
          this.setState({startBuffering: false});
          ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        })
    });
  }

  async componentDidMount() {
    this.firebaseLink();
    var currentUser = await firebase.auth().currentUser;                 
    await currentUser.getIdToken()
                      .then(idToken => {
                            axios.defaults.headers.common['Authorization'] = idToken; 
                            console.log("hhhhhh: "+idToken);
                          });
    //this.setState({title: this.props.navigation.state.params.display_name});
      //this.setState({completion: this.props.navigation.state.params.percentage_completion});
      axios.get('https://classcast-198812.appspot.com/coursedata/courseblocks/'+this.props.navigation.state.params.course_id+'/')
                .then(function (response){
                  console.log("sdabskj");
                  this.setState({startBuffering: false});
                  this.setState({blocks: response.data.blocks});
                }.bind(this))
                .catch(function (error) {
                  console.log("error");
                });
  }

  render() {     
    console.log("andnhak: "+JSON.stringify(this.state.blocks))
    return (
            <View style={{height: 100*vh, width: '100%', justifyContent: 'center',  alignItems: 'center', flex: 1}}>
            <Modal
              visible={this.state.startBuffering}
              transparent={true}
              backdropOpacity={0.6}
              backdropColor="black"
            >

            <View style={{height: 20 * vh,width: 30 * vw, borderRadius: 1.5 * vw, marginTop: 34 * vh, marginLeft: 35 * vw }}>
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
                          style={ { height: 25 * vw, width: 25 * vw, position:'absolute' } }
                          progress={ this.state.completion/100 }
                          progressColor={'#0F3651'}
                      />
                      <Text style={{ color: 'black', fontSize: 24}}> {this.state.completion.toFixed(2)+'%'} </Text>
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
                            console.log("nkaskajxas: "+JSON.stringify(blocks.data));
                            if(data.block_type == 'video') {
                              return(
                                <TouchableNativeFeedback
                                  onPress={() => {
                                    this.setState({startBuffering: true});
                                    this.setState({completion: this.state.completion + (100/this.props.navigation.state.params.number_of_videos)})
                                    axios.post(`https://classcast-198812.appspot.com/coursedata/generateSignedUrl`, {
                                      "path": data.path
                                      //"path": "/classcast-198812.appspot.com/classcast_videos/Mathematics_CBSE/Anurag_Chauhan_Delhi/Class_12/Applications_of_Derivatives/Day%201%20Out%20-%20%20(1)-1.mp4"
                                    })
                                      .then( response => {
                                        console.log("nkaskajxasaa: "+JSON.stringify(response.data));
                                        this.setState({startBuffering: false});
                                        this.navigateToScreen('video', response.data, data.block_id, this.props.navigation.state.params.course_id);
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
                                  
                                  <View style = {styles.aboutVideo}>
                                      <Text style={{fontSize: 16, color: 'black', fontWeight: 'bold'}}>{data.display_name}</Text>
                                      <Text style={{fontSize: 12, color: 'black'}}> </Text>
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
                                    axios.post(`http://classcast-198812.appspot.com/coursedata/storestudentblockinteractions`, {
                                      "course_id": this.props.navigation.state.params.course_id,
                                      "block_id": data.block_id
                                    });
                                    axios.post(`https://classcast-198812.appspot.com/coursedata/generateSignedUrl`, {
                                      "path": data.path
                                    })
                                      .then( response => {
                                        this.setState({startBuffering: false});
                                        this.navigateToScreen('pdfViewer', response.data, data.block_id, this.props.navigation.state.params.course_id);
                                        //this.navigateToScreen('pdfViewer', response.data);
                                      })
                                    }
                                }

                                >
                                  <View style={styles.videoComponent}>
                                  <View style={styles.videoPreview}>
                                      <Image source={{uri: data.image}} style={{height:70, width: 130}}/>
                                  </View>
                                  
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
                                    axios.post(`http://classcast-198812.appspot.com/coursedata/storestudentblockinteractions`, {
                                      "course_id": this.props.navigation.state.params.course_id,
                                      "block_id": data.block_id
                                    });
                                    axios.post(`https://classcast-198812.appspot.com/coursedata/fetchassignmentquestions`, {
                                      "block_id": data.url
                                    })
                                      .then( response => {
                                        
                                        this.setState({startBuffering: false});
                                        this.navigateToScreen('assignmentQuestions', response.data, data.block_id, this.props.navigation.state.params.course_id);
                                        //this.navigateToScreen('assignmentQuestions', response.data);
                                      })
                                      .catch(err=> {
                                        console.log("error")
                                      })
                                    }
                                }

                                >
                                  <View style={styles.videoComponent}>
                                  <View style={styles.videoPreview}>
                                      <Image source={{uri: data.image}} style={{height:70, width: 130}}/>
                                  </View>
                                  
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
    paddingBottom: 10 * vh,
    width: 100 * vw,
    marginBottom: 10,
    backgroundColor: '#dbdbdb'
  },
  singleComponentCount:{
    flex: 1,
    flexDirection: 'row',
    margin: .6 * vh
  },
  componentCount:{
    margin:1.8 * vh,
  },
  sectionHeader:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 1 * vh,
    marginTop: 2 * vh,
    alignItems: 'center'
  },
  courseAboutContainer:{
    borderRadius: .6 * vh,
    borderWidth: .2 * vw,
    borderColor: 'grey',
    margin: .6 * vh,
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
    margin: .6 * vh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContent: {
    backgroundColor: "white",
    margin: 1.5 * vw,
    elevation:2,
    borderRadius: 1 * vw,
  },
  videoPreview:{
    margin: 1.3 * vw,
    height: 10.5 * vh,
    width: 35 * vw,
  },
  videoComponent:{
    marginTop: .5 * vh,
    marginLeft: 2 * vw,
    marginBottom: 0,
    marginRight: 2 * vw,
    flex:1,
    flexDirection: 'row',
  },
  aboutVideo:{
    justifyContent:'center',
    width: 57*vw,
  },
  hairline: {
      backgroundColor: 'black',
      height: 2,
      width: 165
},
  
});

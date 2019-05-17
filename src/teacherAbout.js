
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import {NavigationActions} from 'react-navigation';
const screen = Dimensions.get('window');
  vh = screen.height / 100;
  vw = screen.width / 100;

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;


export default class teacherAbout extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', height: 40 * vw, width: 40 * vw, marginTop: 5 * vh, alignSelf: 'center', backgroundColor: '#6044f0', borderRadius: 20 * vw, padding: 1 * vw}}>
                <Image
                  source= {{uri: this.props.navigation.state.params.data.photo}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>
              
                <Text
                  style={{
                    fontFamily: 'ProximaNova-regular',
                    flex: 1,
                    fontSize: 26,
                    color: 'black',
                    alignSelf: 'center'
                  }}
                >
                  {this.props.navigation.state.params.data.firstname+ ' '+this.props.navigation.state.params.data.lastname+ ' sir'}
                </Text>
                <View
                style={{
                  height: 5 * vh,
                  marginTop: 2 * vh,
                  marginHorizontal: 40,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
              <Image
                  source= {{uri: 'data:image/png;base64,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'}}
                  style={{
                    width: '10%',
                    height: '100%',
                    marginRight: 2 * vw,
                  }}
                />
                <Text
                  style={{
                    fontFamily: 'ProximaNova-regular',
                    fontSize: 18,
                    color: 'gray',
                    textAlign: 'left',
                    marginTop: 5,
                  }}
                >
                  {this.props.navigation.state.params.data.coaching_name+', '}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'gray',
                    textAlign: 'left',
                    marginTop: 5,
                  }}
                >
                  {this.props.navigation.state.params.data.area}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                  width: SCREEN_WIDTH - 80,
                  marginLeft: 40,
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'white',
                    fontFamily: 'regular',
                  }}
                >
                  {this.props.navigation.state.params.data.about}
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 0 * vh }}>
                <Text
                  style={{
                    fontFamily: 'ProximaNova-regular',
                    flex: 1,
                    fontSize: 15,
                    color: '#6044f0',
                    marginLeft: 10 * vw,
                  }}
                >
                  INFO
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 3 * vh,
                    marginHorizontal: 10 * vw,
                  }}
                >
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.infoTypeLabel}>Subject -</Text>
                      <Text style={styles.infoAnswerLabel}>{' '+this.props.navigation.state.params.data.subject}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.infoTypeLabel}>Location -</Text>
                      <Text style={styles.infoAnswerLabel}>{' '+this.props.navigation.state.params.data.area}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.infoTypeLabel}>Classes -</Text>
                      <Text style={styles.infoAnswerLabel}>{' '+this.props.navigation.state.params.data.classes}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text style={styles.infoTypeLabel}>Focus Exams -</Text>
                      <Text style={styles.infoAnswerLabel}>{' ' + this.props.navigation.state.params.data.goal}</Text>
                    </View>
                    
                  </View>
                </View>
              </View>
              
            </ScrollView>
            {!this.props.navigation.state.params.isEnrolled &&
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
                onPress={() => {
                  const navigateAction = NavigationActions.navigate({
                          routeName: 'accessCode'
                        });
                        this.props.navigation.dispatch(navigateAction);
                }}
                activeOpacity={0.5}
              />
            }
          </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 17,
    fontFamily: 'ProximaNova-regular',
    textAlign: 'left',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 17,
    fontFamily: 'ProximaNova-regular',
    color: 'black',
    paddingBottom: 10,
  },
});
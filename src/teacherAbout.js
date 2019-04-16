
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

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;


export default class teacherAbout extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: 'rgba(47,44,60,1)' }}>
            <ScrollView style={{ flex: 1 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image
                  source= {require('./images/anurag.png')}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 26,
                    color: 'white',
                    fontFamily: 'bold',
                  }}
                >
                  Anurag Ji
                </Text>
                <Text
                  style={{
                    flex: 0.5,
                    fontSize: 15,
                    color: 'gray',
                    textAlign: 'left',
                    marginTop: 5,
                  }}
                >
                  EduMitra
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
                  Kaafi cool aadmi. Maths boht faad padhata hai. Burari me padha raha hai sadiyo se, gazab aadmi hai
                </Text>
              </View>
              <View style={{ flex: 1, marginTop: 30 }}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 15,
                    color: 'rgba(216, 121, 112, 1)',
                    fontFamily: 'regular',
                    marginLeft: 40,
                  }}
                >
                  INFO
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginTop: 20,
                    marginHorizontal: 30,
                  }}
                >
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.infoTypeLabel}>Subject</Text>
                      <Text style={styles.infoTypeLabel}>Location</Text>
                      <Text style={styles.infoTypeLabel}>Classes</Text>
                      <Text style={styles.infoTypeLabel}>Focus Exams</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.infoAnswerLabel}>Mathematics</Text>
                      <Text style={styles.infoAnswerLabel}>Burari</Text>
                      <Text style={styles.infoAnswerLabel}>11, 12</Text>
                      <Text style={styles.infoAnswerLabel}>CBSE, JEE Mains</Text>
                    </View>
                  </View>
                </View>
              </View>
              
            </ScrollView>
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
                onPress={() => console.log('Message Theresa')}
                activeOpacity={0.5}
              />
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
    fontSize: 15,
    textAlign: 'right',
    color: 'rgba(126,123,138,1)',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    fontFamily: 'regular',
    paddingBottom: 10,
  },
});
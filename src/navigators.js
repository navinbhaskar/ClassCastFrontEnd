
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableNativeFeedback
} from 'react-native';
import {NavigationActions} from 'react-navigation';
// Navigators
import {createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator } from 'react-navigation';
import SideMenu from './SideMenu';

// StackNavigator screens
import ItemList from './ItemList'
import Item from './Item'
import createTest from './createTest'
import createGym from './createGym'
import testTopic from './testTopic'
import gymTopic from './gymTopic'
import loadingTest from './loadingTest'
import loadingGym from './loadingGym'
import reviewTest from './reviewTest'
import gymPerformance from './gymPerformance'
import testPerformance from './testPerformance'
import contacts from './contacts'
import subject from './challengeSubject'
import chapter from './challengeChapter'
import startChallenge from './startChallenge'
import ongoingChallenge from './ongoingChallenge'
import notifications from './notifications'
import challengePerformance from './challengePerformance'
// TabNavigator screens
import TabA from './TabA'
import TabB from './TabB'

// Plain old component
import Plain from './Plain'
import CustomTabBar from './customBarBottom'
import { Icon } from 'react-native-elements'
import TeacherHome from './TeacherHome'
import teacherAbout from './teacherAbout'
import CourseHome from './CourseHome'
import video from './video'
import pdfViewer from './pdfViewer'
import assignmentQuestions from './assignmentQuestions'
import Signup from './signup'
import UserDetails from './userdetails'
import addTeachers from './addTeachers'
import { fromRight} from 'react-navigation-transitions';
import AuthCheck from './AuthCheck';
import accessCode from './accessCode';
import Courses from './Courses';
import ClassUpdates from './ClassUpdates';


export const PlaygroundGym = createStackNavigator({
  test3: { screen: createGym },
  gymTopic: { screen: gymTopic },
  loadingGym: { screen: loadingGym },
  gymPerformance: { screen: gymPerformance },
}, {
  initialRouteName: 'test3',
})

export const PlaygroundTest = createStackNavigator({
  test2: { screen: createTest},
  topic: { screen: testTopic },
  loading: { screen: loadingTest },
  testPerformance: { screen: testPerformance },
  reviewTest: { screen: reviewTest },
}, {
  initialRouteName: 'test2',
})

export const PlaygroundChallenge = createStackNavigator({
  test1: { screen: contacts},
  subject: { screen: subject },
  chapter: { screen: chapter },
  start: { screen: startChallenge },
  ongoingChallenge: { screen: ongoingChallenge },
  challengePerformance: { screen: challengePerformance }
}, {
  initialRouteName: 'test1',
})

export const Playground = createStackNavigator({
  ItemList: { screen: ItemList },
  test: { screen: PlaygroundTest },
  gym: { screen: PlaygroundGym },
  challenge: { screen: PlaygroundChallenge },
  ongoingChallenge: { screen: ongoingChallenge },
  Item: { screen: Item },
}, {
  initialRouteName: 'ItemList',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
        header: null
    }
})


export const Tabs = createBottomTabNavigator({
  TabA: { screen: TabA, navigationOptions: {
    tabBarIcon: ({ tintColor }) =>(
      <View Style={{height: 5 * vh, width: 5 * vh, backgroundColor:'red', justifyContent: 'center', alignItems: 'center', marginLeft: 2 * vw}}>
        <Image
          style={{ height: 3.5 * vh, width: 3.5 * vh, marginBottom: .5 * vh, marginLeft: 2 * vw}}
          resizeMode={'contain'}
          source={{uri: tintColor == '#ffffff' ? 'data:image/png;base64,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': 'data:image/png;base64,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'}}
        />
        <Text style={{fontSize: 2.8 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Explore</Text>
      </View>
      )
  }},
  Home: { screen: TabB, navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View Style={{height: 5 * vh, width: 5 * vh, backgroundColor:'red', justifyContent: 'center', alignItems: 'center',}}>
        <Image
          style={{ height: 3.5 * vh, width: 3.5 * vh, marginBottom: .5 * vh, marginLeft: 1 * vw}}
          resizeMode={'contain'}
          source={{uri: tintColor == '#ffffff' ? 'data:image/png;base64,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': 'data:image/png;base64,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'}}
        />
        <Text style={{fontSize: 2.8 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Home</Text>
      </View>
      )
  } },
  Tabs: { screen: ItemList, navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View Style={{height: 5 * vh, width: 5 * vh, backgroundColor:'red', justifyContent: 'center', alignItems: 'center',}}>
        <Image
          style={{ height: 3.5 * vh, width: 3.5 * vh, marginBottom: .5 * vh, marginLeft: 4 * vw}}
          resizeMode={'contain'}
          source={{uri: tintColor == '#ffffff' ? 'data:image/png;base64,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': 'data:image/png;base64,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'}}
        />
        <Text style={{fontSize: 2.8 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Playground</Text>
      </View>
      )
  } },
}, {
  tabBarComponent: props => (
  <CustomTabBar
      {...props}/> ),
  tabBarOptions: {
    activeTintColor: "#ffffff",
    inactiveTintColor: "#aeadb2",
  },
  initialRouteName: 'Home',
  navigationOptions: {
        header: null,
    }
})

export const TeacherHomeNavigator = createMaterialTopTabNavigator({
  Courses: { screen: Courses, navigationOptions: {
    tabBarIcon: ({ tintColor }) =>(
     
      <View Style={{height: 5 * vh, width: 5 * vh, backgroundColor:'red', justifyContent: 'center', alignItems: 'center', marginLeft: 2 * vw}}>
        <Text style={{fontSize: 4 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Courses</Text>
      </View>
      //</TouchableNativeFeedback>
      )
  }},
  Updates: { screen: ClassUpdates, navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View Style={{height: 5 * vh, width: 5 * vh, backgroundColor:'red', justifyContent: 'center', alignItems: 'center',}}>
        
        <Text style={{fontSize: 4 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Updates</Text>
      </View>
      )
  } },
  About : { screen: teacherAbout, navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View Style={{height: 5 * vh, width: 5 * vh, backgroundColor:'red', justifyContent: 'center', alignItems: 'center',}}>
                <Text style={{fontSize: 4 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>About</Text>
      </View>
      )
  } },
}, {
  tabBarComponent: props => (
  <CustomTabBar
      {...props}/> ),
  tabBarOptions: {
    activeTintColor: "#ffffff",
    inactiveTintColor: "#aeadb2",
    style: {
    backgroundColor: '#222126',
  },
  },
  lazy: true,
  initialRouteName: 'Courses',
})


export const HomeStack = createStackNavigator({
  Home: { screen: Tabs },
  TeacherArea: { screen: TeacherHomeNavigator,
                  navigationOptions: ({ navigation }) => ({
                  title: `${navigation.state.params.data.firstname} ${navigation.state.params.data.lastname}`,
                }), },
  CourseHome: {screen: CourseHome,
                  navigationOptions: ({ navigation }) => ({
                  title: `${navigation.state.params.display_name}`,
                }), },
  accessCode: { screen: accessCode,
              navigationOptions: ({ navigation }) => ({
                  title: `Enter Access Code`,
                }) },
  video: {screen: video},
  pdfViewer: { screen: pdfViewer },
  assignmentQuestions: { screen: assignmentQuestions },
  addTeachers: { screen: addTeachers},
  notification: { screen: notifications }
}, {
  initialRouteName: 'Home',
  transitionConfig: () => fromRight(),
})

export const Drawer =createDrawerNavigator({
  Playground: { screen: Playground },
  HomeStack: { screen: HomeStack },
  Plain: { screen: Plain },
},{
  lazy: true,
  initialRouteName: 'HomeStack',
  contentComponent: SideMenu,
  drawerWidth: 300
})


export const Login1 = createStackNavigator({
  Login: { screen: Signup },
  UserDetails: { screen: UserDetails },
  accessCode: { screen: accessCode },
  Drawer: { screen: Drawer}
}, {
  lazy: true,
  initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

export const Authstack = createSwitchNavigator({
  Login2: {screen: Login1},
  AuthCheck: {screen: AuthCheck},
  Drawer: {screen: Drawer}
}, {
  lazy: true,
  initialRouteName: 'AuthCheck',
})

const AuthFlowContainer = createAppContainer(Authstack);

export default AuthFlowContainer;
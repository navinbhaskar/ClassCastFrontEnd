
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
      <View Style={{height: 5 * vh, width: 5 * vh, justifyContent: 'center', alignItems: 'center', marginLeft: 2 * vw}}>
        <Icon
          name='compass'
          type='font-awesome'
          size={ tintColor == '#6044f0' ? 8 * vw: 6 * vw}
          color= {tintColor}
        />
        <Text style={{fontSize: 2.8 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Explore</Text>
      </View>
      )
  }},
  Home: { screen: TabB, navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View Style={{height: 5 * vh, width: 5 * vh, justifyContent: 'center', alignItems: 'center',}}>
        <Icon
          name='home'
          type='foundation'
          size={ tintColor == '#6044f0' ? 8 * vw: 6 * vw}
          color= {tintColor}
        />
        <Text style={{fontSize: 2.8 * vw, fontFamily: 'Montserrat-Bold', color: tintColor,}}>Home</Text>
      </View>
      )
  } },
  Tabs: { screen: ItemList, navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <View Style={{height: 5 * vh, width: 5 * vh,  justifyContent: 'center', alignItems: 'center',}}>
        <Icon
          name='gamepad'
          type='font-awesome'
          size={ tintColor == '#6044f0' ? 8 * vw: 6 * vw}
          color= {tintColor}
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
    activeTintColor: "#6044f0",
    inactiveTintColor: "#c1c8db",
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
    activeTintColor: "#6044f0",
    inactiveTintColor: "#c1c8db",
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
                  headerStyle: {
                    backgroundColor: '#874acf',
                  },
                  headerTitleStyle: { color: 'white' },
                  headerTintColor: 'white',
                  style: {
                    backgroundColor: '#874acf',
                    height: 8 * vh
                  },
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
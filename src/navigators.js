
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

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
// TabNavigator screens
import TabA from './TabA'
import TabB from './TabB'

// Plain old component
import Plain from './Plain'
import CustomTabBar from './customBarBottom'
import { Icon } from 'react-native-elements'
import TeacherHome from './TeacherHome'
import CourseHome from './CourseHome'
import video from './video'
import Signup from './signup'
import UserDetails from './userdetails'
import addTeachers from './addTeachers'
import { fromRight} from 'react-navigation-transitions';
import AuthCheck from './AuthCheck';
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
  ongoingChallenge: { screen: ongoingChallenge }
}, {
  initialRouteName: 'test1',
})

export const Playground = createStackNavigator({
  ItemList: { screen: ItemList },
  test: { screen: PlaygroundTest },
  gym: { screen: PlaygroundGym },
  challenge: { screen: PlaygroundChallenge },
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
    tabBarIcon: ({ tintColor }) => <Icon
    reverse
    name='compass'
    type='font-awesome'
    color='#0F3651'/>
  }},
  Home: { screen: TabB, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon
    reverse
    name='home'
    type='font-awesome'
    color='#0F3651'/>
  } },
  TabC: { screen: ItemList, navigationOptions: {
    tabBarIcon: ({ tintColor }) => <Icon
    reverse
    name='gamepad'
    type='font-awesome'
    color='#0F3651'/>
  } },
}, {
  tabBarComponent: props => (
  <CustomTabBar
      {...props}/> ),
  tabBarOptions: {
    activeTintColor: "#4F4F4F",
    inactiveTintColor: "#ddd",
  },
  initialRouteName: 'Home',
  navigationOptions: {
        header: null,
    }
})

export const TeacherHomeNavigator = createMaterialTopTabNavigator(
  {
    Courses: { screen: Courses },
    Updates: { screen: ClassUpdates },
    About : { screen: TabA },
  },{
  initialRouteName: 'Courses'
}
)

export const TeacherArea = createStackNavigator(
  {
    TeacherHome: {screen: TeacherHomeNavigator,},
  }, {
    initialRouteName: 'TeacherHome',
    headerMode: 'none',
  })



export const HomeStack = createStackNavigator({
  Home: { screen: Tabs },
  TeacherArea: { screen: TeacherArea,
                  navigationOptions: ({ navigation }) => ({
                  title: `${navigation.state.params.data.firstname} ${navigation.state.params.data.lastname}`,
                }), },
  CourseHome: {screen: CourseHome},
  video: {screen: video},
  addTeachers: { screen: addTeachers}
}, {
  initialRouteName: 'Home',
  transitionConfig: () => fromRight(),
})

export const Drawer =createDrawerNavigator({
  Playground: { screen: Playground },
  HomeStack: { screen: HomeStack },
  Plain: { screen: Plain },
},{
  initialRouteName: 'HomeStack',
  contentComponent: SideMenu,
  drawerWidth: 300
})


export const Login = createStackNavigator({
  Login: { screen: Signup },
  UserDetails: { screen: UserDetails },
  Drawer: { screen: Drawer}
}, {
  initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

export const Authstack = createSwitchNavigator({
  Login: {screen: Signup},
  AuthCheck: {screen: AuthCheck},
  Drawer: {screen: Drawer}
}, {
  initialRouteName: 'AuthCheck',
})

const AuthFlowContainer = createAppContainer(Authstack);
const AppContainer = createAppContainer(Playground);
const AppContainer2 = createAppContainer(Tabs);
const AppContainer3 = createAppContainer(Drawer);
const AppContainer4 = createAppContainer(Login);
export default AuthFlowContainer;
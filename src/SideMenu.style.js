import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('window'),
 vh = screen.height / 100,
 vw = screen.width / 100;

export default {
 container: {
   paddingTop: 2.5 * vh,
   flex: 1,
   backgroundColor: '#f0f3fa'
 },
 navItemStyle: {
   padding: 2 * vh,
   paddingHorizontal: 8 * vw,
   color: '#211482',
   fontSize: 3.5 * vw,
   fontFamily: 'Montserrat-SemiBold',
 },
 navSectionStyle: {
   backgroundColor: '#262f46'
 },
 sectionHeadingStyle: {
   paddingVertical: 1.25 * vh,
   paddingHorizontal: 4 * vw,
   marginTop: 1.25 * vh,
   backgroundColor: 'white',
   fontWeight: 'bold'
 },
 footerContainer: {
   padding: 0.4 * vh,
   backgroundColor: '#1d136b'
 },
  userImage: {
   height: '100%',
   width: '100%',
   alignSelf: 'center'
 },
 userImageContainer: {
  height: 30 * vw,
  width: 30 * vw,
  borderRadius: 15 * vw,
  padding: 0.6 * vw,
  backgroundColor: '#29206f'
 },
  userName: {
   fontSize: 3.5 * vh,
   margin: 1 * vh,
   color: '#7165cb',
   fontFamily: 'ProximaNova-Regular',
 },
 class: {
  fontSize: 2.5 * vh,
  color: '#7165cb',
  marginLeft: 1 * vh,
  fontFamily: 'ProximaNova-Regular',
},
 aboutUserSection:{
   marginTop: 2 * vh,
   height: 25 * vh,
   marginLeft: 5 * vw,
   marginBottom: 2 * vh
 },
 tncModal: {
   height: 80 * vh,
   width: 90 * vw,
   backgroundColor: 'white',
   borderRadius: 1.5 * vw,
   paddingTop: 5 * vh,
   paddingLeft: 7.5 * vw,
   paddingRight: 7.5 * vw,
   paddingBottom: 5 * vh,
 },
 tncHeadingBig: {
   fontSize: 6 * vw,
   color: 'black',
   fontFamily: 'Montserrat-Bold',
   marginBottom: 2 * vh,
 },
 tncText: {
   color: 'black',
   fontSize: 3.5 * vw,
   marginBottom: 2 * vh,
 },
 tncTextListItem: {
   color: 'black',
   fontSize: 3.5 * vw,
   marginBottom: 2 * vh,
   marginLeft: 2 * vw,
 },
 tncHeadingSmall: {
   fontSize: 4.5 * vw,
   fontFamily: 'Montserrat-SemiBold',
   color: 'black',
   marginBottom: 2 * vh,
 },
 contactInfo: {
   fontSize: 3.5 * vw,
   color: 'black',
   fontFamily: 'Montserrat-Bold'
 },
 tncButtonContainer: {
   width: '100%',
   alignItems: 'flex-end',
 },
 tncButton: {
   fontSize: 4.5 * vw,
   fontFamily: 'Montserrat-Bold',
   color: '#754faf',
   marginTop: 2 * vh,
 },
};
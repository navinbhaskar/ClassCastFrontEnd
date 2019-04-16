import {Dimensions, StyleSheet} from 'react-native';

const screen = Dimensions.get('window'),
  vh = screen.height / 100,
  vw = screen.width / 100;

export default {
  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10,
    paddingHorizontal: 20
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: 'white',
    fontWeight: 'bold'
  },
  footerContainer: {
    padding: 5,
    backgroundColor: '#0F3651'
  },
   userImage: {
    marginRight:20,
    marginLeft: 5,
    height: 70,
    width: 70,
   
  },
   userName: {
    fontSize:20,
    margin: 5,
    
  },
  aboutUserSection:{
    marginTop: 10,
    height:80,
    flex:2,
    flexDirection: 'row'
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
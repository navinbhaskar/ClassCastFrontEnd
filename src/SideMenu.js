import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {ScrollView, Text, View, Image} from 'react-native';
import { Badge, Divider } from 'react-native-elements';
import CustomHeader from "./CustomHeader";

const USER_DP = require('./images/user-hp.png');

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
    console.log(JSON.stringify(this.props));
  }


  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.aboutUserSection}>
              <Image 
                source={USER_DP}
                style={styles.userImage}/>
              <View>
              <Text style={styles.userName}>
              Deepak Jha
              </Text>
              <Badge value="Class 11" status="success" />
              </View>
            </View>
          </View>
          <View style={{alignItems:'center'}}>
          <Divider style={{ backgroundColor: 'blue', width: '90%' }} />
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Section 2
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('TabB')}>
                Page2
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('TabC')}>
                Page3
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text>Built with love by team ClassCast</Text>
        </View>
      </View>
    );
  }
}



export default SideMenu;
import React, { Component } from 'react'
import {Dimensions, Image, Text, TouchableWithoutFeedback, View, PermissionsAndroid} from 'react-native'
import styles from './TestStyles';
import SnapCarousel from 'react-native-snap-carousel';
import {NavigationActions} from 'react-navigation';
import Contacts from 'react-native-contacts';
const screen = Dimensions.get('window');


class contactsRead extends Component {

  static navigationOptions = ({ navigation }) => ({
    header : null
  })

   constructor() {
    super();
    this.state = {
     selected: 0,
      viewRef: null,
      contacts: [],
      registeredUsers: [],
    }
  }

  requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Classcast contacts permission',
          'message': 'Classcast needs to access your contacts to let you challenge them!'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll((err, contacts) => {
        if(err && err.type === 'permissionDenied'){
          // x.x
        } else {
          //this.setState({
          //  contacts.map(contact => ({ number:  contact.phoneNumbers.map(number => ({ Number2: number.number })), name: contact.givenName+" "+contact.familyName }))
          //});
          var allContacts = contacts.map(contact => ({ number:  contact.phoneNumbers.map(number => ({ Number2: number.number })), name: contact.givenName+" "+contact.familyName }));
          console.log("OO: "+JSON.stringify(allContacts.map(number => ({ number1: number.number }))));
          this.setState({contacts: allContacts});
          //console.log("OO: "+JSON.stringify(this.state.contacts));

        }
      })
      } else {
        console.log("Contacts permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  };

  async componentDidMount() {
    await this.requestContactsPermission();
  }

   render() {
    return (
      <View style={styles.container}>
        <Text>abcd</Text>
      </View>
    )
  }

}

export default contactsRead

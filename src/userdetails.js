import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  AsyncStorage,
  ToastAndroid,
  BackHandler
} from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import {Icon} from 'react-native-elements';
import axios from "axios";
import DeviceInfo from 'react-native-device-info';
import {MaterialIndicator} from 'react-native-indicators';

const uniqueId = DeviceInfo.getUniqueID();

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const USER_STUDENT = require('./images/user-student.png');
const USER_HP = require('./images/user-hp.png');
export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selectedClassesIndex: 3,
    selectedStreamIndex: 2,
    loading: false,
    selectedType: null,
    fontLoaded: false,
    name: '',
    username:'',
    lastname: '',
    usernameValid: true,
    lastnameValid: true,
    phone:'',
  };
  this.updateClassesIndex = this.updateClassesIndex.bind(this);
  this.updateStreamIndex = this.updateStreamIndex.bind(this);
  this.setSelectedType = this.setSelectedType.bind(this);
  this.updateinfo = this.updateinfo.bind(this);
  this.validateClass = this.validateClass.bind(this);
  this.validateStream = this.validateStream.bind(this);
  this.validateGender = this.validateGender.bind(this);
  this.retrieveData = this.retrieveData.bind(this);
  }

 

  async retrieveData () { 
    const {phone} =this.state;
    const token =  await AsyncStorage.getItem("Token");
    const phone_number = await AsyncStorage.getItem("Phone");
    this.setState({phone: phone_number});
    return token;
  }

  

  setSelectedType (selectedType){
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });
  }

  updateClassesIndex (selectedClassesIndex) {
    this.setState({selectedClassesIndex})
  }

  updateStreamIndex (selectedStreamIndex) {
    this.setState({selectedStreamIndex})
  }

  validateClass(){
    const { selectedClassesIndex } = this.state; 
    if (selectedClassesIndex == 0) return 11;
    else if (selectedClassesIndex == 1) return 12;
    else if (selectedClassesIndex == 2) return 13;
    else {
      ToastAndroid.show('Please select you Class', ToastAndroid.SHORT);
      this.setState({loading: false});
      return 0;
    }
  }

  validateStream(){
    const { selectedStreamIndex } = this.state; 
    if (selectedStreamIndex == 0) return 'Science';
    else if (selectedStreamIndex == 1) return 'Commerce';
    else {
      ToastAndroid.show('Please select you Stream', ToastAndroid.SHORT);
      this.setState({loading: false});
      return 0;
    }
  }

  validateGender(){
    const { selectedType } = this.state; 
    if (selectedType == 'Male') return 'Male';
    else if (selectedType == 'Female') return 'Female';
    else {
      ToastAndroid.show('Please select you Gender', ToastAndroid.SHORT);
      this.setState({loading: false});
      return 0;
    }
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    if( !usernameValid) {
      this.setState({loading: false});
    }
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  validateLastname() {
    const { lastname } = this.state;
    const lastnameValid = lastname.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ lastnameValid });
    if( !lastnameValid) {
      this.setState({loading: false});
    }
    lastnameValid || this.lastnameInput.shake();
    return lastnameValid;
  }

  async updateinfo(){
    this.setState({loading: true});
    const nameValid = await this.validateUsername();
    const lastnameValid = await this.validateLastname();
    const genderValid = await this.validateGender();
    const classValid = await this.validateClass();
    const streamValid = await this.validateStream();
    const token = await this.retrieveData();

    if (nameValid && lastnameValid && genderValid && classValid && streamValid){

      var data = {
              "firstname": this.state.username,
              "lastname": this.state.lastname,
              "gender": genderValid,
              "standard": classValid,
              "phone_number": this.state.phone,
              "username": this.state.phone,
              "email": this.state.phone + '' + '@gmail.com '
            }
      if (token)
      axios.defaults.headers.common['Authorization'] = token;
      axios.defaults.headers.post['Content-Type'] = 'application/json';
       axios.post('https://classcast-198812.appspot.com/users/updateprofile', data)
            .then((response) => 
            {
              var data2 = {
                "device_id": uniqueId
              }
              axios.post('https://classcast-198812.appspot.com/deviceid/save_device_id/',data2)
              .then(res =>{
               this.props.navigation.navigate("accessCode");
              })
               
            })
            .catch((error) => {
              this.setState({loading: false});
            })
      
     

      }

  }


  render() {
    const classes = ['11', '12', '12+']
    const streams = ['Science', 'Commerce']
    const { selectedClassesIndex, selectedStreamIndex, name, selectedType, username, lastname, usernameValid } = this.state
    return (
     <ScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
      <Text style={styles.h2}> Introduction Please!</Text>
      <View style={styles.userTypesContainer}>
            <UserTypeItem
              label="FEMALE"
              labelColor="#2CA75E"
              image={USER_STUDENT}
              onPress={() => this.setSelectedType('Female')}
              selected={selectedType === 'Female'}
            />
            <UserTypeItem
              label="MALE"
              labelColor="#36717F"
              image={USER_HP}
              onPress={() => this.setSelectedType('Male')}
              selected={selectedType === 'Male'}
            />
      </View>
      <View style={{ width: '80%', alignItems: 'center' }}>
            <FormInput
              refInput={input => (this.usernameInput = input)}
              icon="user"
              autoFocus={true}
              value={username}
              onChangeText={username => this.setState({ username })}
              placeholder="First Name"
              returnKeyType="next"
              errorMessage={
                usernameValid ? null : "Please tell us your name"
              }
              onSubmitEditing={() => {
                this.validateUsername();
              }}
            />
        </View>
        <View style={{ width: '80%', alignItems: 'center' }}>
            <FormInput
              refInput={input => (this.lastnameInput = input)}
              icon="user"
              value={lastname}
              onChangeText={lastname => this.setState({ lastname })}
              placeholder="Last Name"
              returnKeyType="next"
              errorMessage={
                usernameValid ? null : "Please tell us your name"
              }
              onSubmitEditing={() => {
                this.validateLastname();
              }}
            />
        </View>
      <Text style={styles.h3}> Select your Class</Text>
          <ButtonGroup
            onPress={this.updateClassesIndex}
            selectedIndex={selectedClassesIndex}
            buttons={classes}
            containerStyle={{height: 50, borderRadius: 20}}
          />
          
      <Text style={styles.h3}> Engineer or CA ? </Text>
          <ButtonGroup
            onPress={this.updateStreamIndex}
            selectedIndex={selectedStreamIndex}
            buttons={streams}
            containerStyle={{height: 50, borderRadius: 20}}
          />
      { !this.state.loading &&
      <Icon
        raised
        name='arrow-circle-right'
        type='font-awesome'
        color='#293046'
        onPress={() => this.updateinfo()} />
      }
      { this.state.loading &&
        <MaterialIndicator color='white'/>
      }
     
      </ScrollView>
  );
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} type='font-awesome' color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={true}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={true}
      blurOnSubmit={true}
      placeholderTextColor="#7384B4"
    />
  );
};



const styles = StyleSheet.create({
  
  container: {
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    alignItems: 'center',
  },
   h2: {
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 28,
    color: 'white',
  },
   h3: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 20,
    color: 'white',
  },

  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 80,
    width: 80,
  },
  userTypeMugshotSelected: {
    height: 110,
    width: 110,
  },
  userTypeLabel: {
    color: 'yellow',
    fontFamily: 'bold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  
});
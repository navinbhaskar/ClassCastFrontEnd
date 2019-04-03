import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  StyleSheet,
  ScrollView,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import firebase from 'react-native-firebase';




// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const USER_STUDENT = require('./images/user-student.png');
const USER_HP = require('./images/user-hp.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      name: '',
      phone: '',
      phoneIN:'',
      phoneLogin: '',
      phoneValid: true,
      username:'',
      usernameValid: true,
      isModalVisible: false,
      verificationId: '',
      OTP1:'',
      OTP2:'',
      OTP3:'',
      OTP4:'',
      OTP5:'',
      OTP6:'',
    };

    this.setSelectedType = this.setSelectedType.bind(this);
    this.validatePhone = this.validatePhone.bind(this);
    this.signon = this.signon.bind(this);
    this.storeData = this.storeData.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.auth = this.auth.bind(this);
  }


  async auth() {
    console.log("yelllllleeee");
    LayoutAnimation.easeInEaseOut();
    const phoneValid = await this.validatePhone();
    if (phoneValid && this.state.phoneIN!='') {
      firebase.auth()
      .verifyPhoneNumber(this.state.phoneIN)
      .on('state_changed', (phoneAuthSnapshot) => {
        switch (phoneAuthSnapshot.state) {
          // ------------------------
          //  IOS AND ANDROID EVENTS
          // ------------------------
          case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
            console.log('code sent');
            this.setState({verificationId: phoneAuthSnapshot.verificationId});
            this.setState({ isModalVisible: true });
            break;

          case firebase.auth.PhoneAuthState.ERROR: // or 'error'
            console.log('verification error');
            console.log(phoneAuthSnapshot.error);
            break;

          // ---------------------
          // ANDROID ONLY EVENTS
          // ---------------------
          case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
            console.log('auto verify on android timed out');
            
            break;
          case firebase.auth.PhoneAuthState.AUTO_VERIFIED: 
            console.log('auto verified on android');
            console.log(phoneAuthSnapshot);
            // Example usage if handling here and not in optionalCompleteCb:
            const { verificationId, code } = phoneAuthSnapshot;
            const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
            signon(credential);

            
            // firebase.auth().currentUser.linkWithCredential(credential);
            // etc ...
            break;
        }
      }, (error) => {
        // optionalErrorCb would be same logic as the ERROR case above,  if you've already handed
        // the ERROR case in the above observer then there's no need to handle it here
        console.log(error);
        // verificationId is attached to error if required
        console.log(error.verificationId);
      }, (phoneAuthSnapshot) => {
        // optionalCompleteCb would be same logic as the AUTO_VERIFIED/CODE_SENT switch cases above
        // depending on the platform. If you've already handled those cases in the observer then
        // there's absolutely no need to handle it here.

        // Platform specific logic:
        // - if this is on IOS then phoneAuthSnapshot.code will always be null
        // - if ANDROID auto verified the sms code then phoneAuthSnapshot.code will contain the verified sms code
        //   and there'd be no need to ask for user input of the code - proceed to credential creating logic
        // - if ANDROID auto verify timed out then phoneAuthSnapshot.code would be null, just like ios, you'd
        //   continue with user input logic.
        console.log(phoneAuthSnapshot);
  });
    }
  }

  signon(credential){
    firebase.auth().signInWithCredential(credential).then((result) => {
                        this.setState({ isModalVisible: false });
                          if (result.additionalUserInfo.isNewUser)
                              this.props.navigation.navigate("UserDetails");
                          else this.props.navigation.navigate("Home");
                          
                          result.user.getIdToken().then(function(idToken) {
                          userIdToken = idToken;
                          console.log('bhakkk'+ JSON.stringify(userIdToken));
                          this.storeData(userIdToken);
                          this.retrieveData();

                           }.bind(this));

                          }, (error) => {console.log("singon error" + error)});

  }

  async storeData (data) {
    const {phone} = this.state;
    try{ await AsyncStorage.setItem("Token", data);
         await AsyncStorage.setItem("Phone", phone);
        }
    catch (error) {console.log("bhosade fat gaye storage ke");}
  }

  async retrieveData () { 
    const token =  await AsyncStorage.getItem("Token");
    console.log("Badhai ho" + token);
  }


  validatePhone() {
    const { phone, phoneIN } = this.state;
    const phoneValid = phone.length=10;
    LayoutAnimation.easeInEaseOut();
    this.setState({phoneIN: '+'+91 + ''+ phone});
    this.setState({ phoneValid });
    phoneValid || this.phoneInput.shake();
    return phoneValid;
  }


  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const {
      isLoading,
      selectedType,
      phone,
      phoneLogin,
      phoneValid,
      username,
      usernameValid,
      isModalVisible,
      OTP1,
      OTP2,
      OTP3,
      OTP4,
      OTP5,
      OTP6,
      phoneIN,
      verificationId
    } = this.state;

    return (
      <ScrollView
        scrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}>

          <View style={{ flex: 1 }}>
            <Modal isVisible={this.state.isModalVisible} style={styles.bottomModal}>
              <View style={styles.modalContent}>
                <Text style={{fontSize:20}}>Enter OTP</Text>
                <View style={{height:50, width:'100%', marginLeft:10, marginRight:10, alignItems:'center'}}>
                <View style={{flexDirection:'row', flex:1}}>
                  <View style={{height:40, width:40, margin:5}}>
                  <OTPInput
                      refInput={input => (this.OTPInput1 = input)}
                      value={OTP1}
                      onChangeText={OTP1 => {
                        this.setState({ OTP1 });
                        this.OTPInput2.focus()
                      }}
                        
                      placeholder="X"
                      keyboardType='numeric'
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.OTPInput2.focus();
                      }}
                    />
                  </View>
                  <View style={{height:40, width:40, margin:5}}>
                  <OTPInput
                      refInput={input => (this.OTPInput2 = input)}
                      value={OTP2}
                     onChangeText={OTP2 => {
                        this.setState({ OTP2 });
                        this.OTPInput3.focus()
                      }}
                      placeholder="X"
                      keyboardType='numeric'
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.OTPInput3.focus();
                      }}
                    />
                  </View>
                  <View style={{height:40, width:40, margin:5}}>
                  <OTPInput
                      refInput={input => (this.OTPInput3 = input)}
                      value={OTP3}
                      onChangeText={OTP3 => {
                        this.setState({ OTP3 });
                        this.OTPInput4.focus()
                      }}
                      placeholder="X"
                      keyboardType='numeric'
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.OTPInput5.focus();
                      }}
                    />
                  </View>
                  <View style={{height:40, width:40, margin:5}}>
                  <OTPInput
                      refInput={input => (this.OTPInput4 = input)}
                      value={OTP4}
                      onChangeText={OTP4 => {
                        this.setState({ OTP4 });
                        this.OTPInput5.focus()
                      }}
                      placeholder="X"
                      keyboardType='numeric'
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.OTPInput5.focus();
                      }}
                    />
                  </View>
                  <View style={{height:40, width:40, margin:5}}>
                  <OTPInput
                      refInput={input => (this.OTPInput5 = input)}
                      value={OTP5}
                      onChangeText={OTP5 => {
                        this.setState({ OTP5 });
                        this.OTPInput6.focus()
                      }}
                      placeholder="X"
                      keyboardType='numeric'
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.OTPInput6.focus();
                      }}
                    />
                  </View>
                  <View style={{height:40, width:40, margin:5}}>
                  <OTPInput
                      refInput={input => (this.OTPInput6 = input)}
                      value={OTP6}
                      onChangeText={OTP6 => {
                        this.setState({ OTP6 });
                        const OTP= Number(OTP1+OTP2+OTP3+OTP4+OTP5+OTP6)
                        console.log(OTP1+OTP2+OTP3+OTP4+OTP5+OTP6)
                        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, OTP1+OTP2+OTP3+OTP4+OTP5+OTP6);
                        console.log("huha" + credential);
                        this.signon(credential);
                        
                      }}
                      placeholder="X"
                      keyboardType='numeric'
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        this.validatePhone();
                      }}
                    />
                  </View>
                  </View>
                  </View>
                <TouchableOpacity onPress={this._toggleModal}>
                  <Text>Hide Modal</Text>
                </TouchableOpacity>
              </View>
              
            </Modal>
          </View>
          
            
          <Text style={styles.signUpText}>Sign On</Text>
          <Text style={styles.whoAreYouText}>What is you dial number?</Text>
          
            <FormInput
              refInput={input => (this.phoneInput = input)}
              icon="phone"
              value={phone}
              onChangeText={phone => this.setState({ phone })}
              placeholder="Enter you 10 digit Phone No."
              keyboardType='numeric'
              returnKeyType="next"
              errorMessage={
                phoneValid ? null : 'Please enter a valid phone address'
              }
              onSubmitEditing={() => {
                this.validatePhone();
              }}
            />
            
           
            <Button
              title="SIGN-ON"
              containerStyle={{ flex: -1 }}
              buttonStyle={styles.signUpButton}
              titleStyle={styles.signUpButtonText}
              onPress={
                this.auth
              }
            />
         
      </ScrollView>
    );
  }
}


export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} color="#7384B4" size={18} />}
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

export const OTPInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.OTPinputContainer}
      leftIcon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.OTPinputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      maxLength={1}
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={true}
      placeholderTextColor="#7384B4"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'light',
  },
  whoAreYouText: {
    color: '#7384B4',
    fontFamily: 'bold',
    fontSize: 14,
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

  OTPinputContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 40,
    width:40,
    alignItems:'center'
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  OTPinputStyle: {
    color: 'black',
    fontFamily: 'light',
    fontSize: 15,
    margin:-4
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'lightitalic',
    fontSize: 12,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
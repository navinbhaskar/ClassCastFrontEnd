import React, { Component } from 'react'
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  SectionList,
  TouchableNativeFeedback,
  ActivityIndicator, 
  Slider, 
  StatusBar
} from 'react-native';
import styles from './VideoStyles';
import axios from 'axios';
import VideoPlayer from 'react-native-video';
import {Icon} from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { ProgressCircle }  from 'react-native-svg-charts';
import Orientation from 'react-native-orientation';

class video extends Component {


  static navigationOptions = {
    title: 'video',
    header: null,
  };


   getTime = sec => {
    let s = parseInt(sec);
    let m = Math.floor(s / 60);
    s = s % 60;
    s = s >= 10 ? s : '0' + s;
    m = m >= 10 ? m : '0' + m;
    return `${m}:${s}`
  };

  onLoad = (data) => {
    
    this.setState({
      loaded: true,
      paused: false,
      duration: data.duration,
      back: false,


    });
  };

  onProgress = (data) => {
    console.log("jdidb:Cb "+data.currentTime/data.seekableDuration);
    if(data.currentTime/data.seekableDuration > 0.7 && !this.state.apiHit) {
      this.setState({apiHit: true});
      console.log("jdidb");
      axios.post(`https://classcast-198812.appspot.com/coursedata/storepointsfromcourseblocks`, {
        "course_id": this.props.navigation.state.params.course_id,
        "block_id": this.props.navigation.state.params.block_id,
        "points": 3
      })
      .then( response => {
          console.log("gkyyufyifSS: "+JSON.stringify(response));
        })
        .catch(err => {
          console.loG("gkyyufyifSSerror: "+err);
        })
    }
    this.setState({
      currentTime: data.currentTime,
      playableDuration: this.state.duration,
      seekableDuration: this.state.duration,
      paused: false,
      buffer: false
    });
  };
  onEnd = () => {
    //setTimeout(() => this.props.learnNext(), 100);
    this.setState({paused: true});
  };

  onBuffer = (data) => {
    console.log("jdidb:C "+JSON.stringify(data));
    this.setState({buffer: true,
      currentTime: data.currentTime});
    
  };

  onAudioBecomingNoisy = () => {
    this.setState({paused: true})
  };

  onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
    this.setState({paused: !event.hasAudioFocus})
  };

  renderRateControl(rate) {
    const isSelected = (this.state.rate === rate);

    return (
      <TouchableNativeFeedback onPress={() => {
        this.setState({
          rate,
          showSettings: false,
        })
      }}>
        <Text style={[styles.controlOption, {
          fontWeight: isSelected ? 'bold' : 'normal',
          opacity: isSelected ? 1 : 0.4,
        }]}>
          {rate}x
        </Text>
      </TouchableNativeFeedback>
    );
  };

  renderVideo() {
    return(

      <VideoPlayer 
        ref={(ref: Video) => {
          this.video = ref
        }}
       
        source={{uri: this.props.navigation.state.params.url}}
        style={styles.fullScreen}
        //rate={this.state.rate}
        paused={this.state.paused}
        //volume={this.state.volume}
        //muted={this.state.muted}
        resizeMode={this.state.resizeMode}
        onLoad={this.onLoad.bind(this)}
        onBuffer={this.onBuffer}
        onProgress={this.onProgress}
        progressUpdateInterval={1000}
        onEnd={this.onEnd}
        onError={(error) => {console.log('videoError:')}}
        onAudioBecomingNoisy={this.onAudioBecomingNoisy}
        onAudioFocusChanged={this.onAudioFocusChanged}
        repeat={false}
        fullScreen={true}
        fullscreenOrientation={'landscape'}
      />
    )
  }


  constructor(props) {
    super(props);
    this.state = {
      playVideo: false,
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0,
      currentPosition: 200.0,
      currentTime: 0.0,
      paused: false,
      seek: 0,
      showControls: false,
      showSettings: false,
      loaded: false,
      buffer: false,
      videoUrl: 0,
      sliderValue: 0,
      apiHit: false,
    };
  }

  
  componentWillMount() {
    Orientation.lockToLandscape();
    const initial = Orientation.getInitialOrientation();
  }
  

  ComponentDidMount() {
    console.log("working");
  }
    
  componentWillUnmount() {
    Orientation.lockToPortrait();
    console.log("working2: "+JSON.stringify(this.props.navigation));
  } 
  
  render() {
    console.log("samskalas: "+this.state.showControls);
    console.log("working1: "+JSON.stringify(this.props.navigation));
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <TouchableNativeFeedback
          style={styles.fullScreen}
          onPress={() => {
            this.setState({showControls: !this.state.showControls});
            setTimeout(() => this.setState({showControls: false}), 10000);
          }}
        >

          { 
            this.renderVideo()
          }
        </TouchableNativeFeedback>
       
        {
          this.state.loaded && this.state.buffer && <ActivityIndicator size="large"/>
        }
        {
          this.state.showControls &&
          <View style={styles.controls}>
            <Text style={styles.videoTitle}>{this.props.name}</Text>
            <TouchableNativeFeedback
              onPress={() => this.setState({showSettings: !this.state.showSettings})}
            >
              <Image
                style={styles.settingsIcon}
                resizeMode={'contain'}
                source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKR0lEQVR4nO2dXaxdRRXH/+sUpVRKgWIkrYVq21sCD/Yjhgdj+BBjTOgLGmiBKKI+aAwmgInRSEyKogIGwYA0RC1+gNXyoCTiCw+I1IRSegXsdynQ2pBU29valn7Iz4fZB27b29tz9qw5e+9z5pfctGm6/2tmr3Vn7z2zZo00AAATgduBVcB2YC9wCDha/Bwq/m1H8X9uB86out0ZB4DpwMt0z8vA9Krbn4kAmACsLuH8NquBCVX3I1MS4PoI57e5vup+pKRVdQMS86maaNSWfg+AuQ4aQw4ataXfA2BOTTRqi1XdgFQA50j6j5PcOWa2x0mrVvTzCOD5m9u3o0AOgN5r1YocAL3XqhU5AHqvVStyAPReq1b05VcAYJJ2S5riJDmi8CWAk15tSD4CAJOBc1PbOY7L5ed8FVqXOeqdEmAKTV6RBD4HvDRqTn0ncCcwMbHdFvCswxrA8TxTjCwp2346sLS4V22GgRtS2nUHuHucGzkMeEzRnsz29xM4v83ShO2eA7w4ju27U9l2hfGd32YfzqtswBnAA/E+PiX34zyKAYsJCSmn4keedt2hM+ePZlnszQSmAXcQMn16xfbC5rTItk8EHu7S9g9jbCaD7p3fZhjoasUNMOCTwBPAkZJ2PTgCrASuosv3A2AIWFvS7g+6805iKO/8NnuBxR3YORe4DdgYaS8FG4Fb6eCLB1hCZ0P+eNQjCIh3/mgeBS4aw8ZCYDlw0NFWKg4S2rpwjH5cBPzK0dZdsf6L+qwhvMj9JrYRY/CapK2SUJiFm5HARi94XdKm4u+zJM1MYGOJmT1e9uLYAHhR0rwYjUw0a81sftmLSwcAYZZqf4xGxgUkTTKzt8pcHDMV/F5l59cBk/SesheXDgAzG5G0vez1GTe2m9m+shfHLgY9Enl9Jp4oH8S+BJ4u6TlJC2J0MqV5QdLHzOxQWYHoZzgwS9IaSWfFamW6YkTSAjPbGiMSnQ9gZlskfSlWJ9M1X4x1vuSUEGJmv5f0oIdWpiMeMLOVHkJun3HF+8AqSaUnJTIdsVrhuX/YQ8z1Ox6YrfBikt8H0jAiab6Zveol6JoTaGabJX3ZUzNzDDd7Ol9KkBRqZiskLffWzegXZvaEt2iSqVxgjqSNKbQHmCEz23Tq/9YdyebygS2SPpxKf8DYamazUgin3BewJaH2oBH9vX8yUgZAXilsACkDoG/301XA7FTCSQIAmC/pwhTaA8pMIEnmVaoR4JZEuoPM11KIuj+nCbV5dkhq7sbGenJA0nTvWkUpRoCblJ2fgkmSPu8t6r0WYJLWq89r61XIBjM7Yd9EDN4jwCeUnZ+SucCVnoLeAfAVZ73MiXzVU8wzH2Cawo6e07w0nRmR9KSkpyWtlbRNUvuF6myFXTvzJF0p6Wr5Vhjx5KikC83sX1U35BgI26XryAbgJrrYhk7Ytv2F4to6ckdKX3YNoThDL/fnd8J+wm7d0iMScFqhsb/SnpzIGyQutdMVhKoZdWITcLFj/y4uNOvE/V79i7kxLdLW5CnDGmBqgr5OLbTrxPeA3td6JFTouII01bhi2EQC54/q93nUbyR4luCLUi/0414EnKewqje7+Gn/fUj1e0s+IOmjZvbPlEYIj5bnFWbm6sSIQhbWZoWaBO/8aWa7TnbROwFAeFlaLOnTCidtzFL4PGoKt5nZj3thCLhV0r29sOXEHoWA2CDpz5J+Z2ZHpSIACMej/VHN3eO3UdIl7U6lpvhleUXNnfV8QdIiM9vZInxOPKXmOl+S7uqV8yWpsBVdn6dCFkr6C3C6NXA4O54RSeeXrZBRluIX5001exPMrS1Jn6m6FZE82WvnS1Jh80+9tuvMNS1JF1TdikieHlDbHlzQknRm1a2IZO2A2vZgcktSfeaUy7FtQG17MNGAo5KafEDyBDN7uwrDhGnY/1Vh24kj/XxmUKYDWpKOVN2ISKqcrWzSTOlYHG1J6vknlDMzB9S2B2+1JP236lZEUmWt4qbXSd7XUqho3WRcs2QbZNuD11uSXKpNVcjVVJAeVdhc1Gu7zjzRUijv9nLVLYlgisIydq9ZomavA7wk6cG8HFyCvloOliQz2yHpUkk3KpwAslrv5sw3gSH1dkfy19Us5+9WyGL6taQbJF1qZjulU6eETdXYKWFzNbgpYZco3My6bYDdozASHpMOppAS9m9XS7ybFPq3HiY/dsImQh5jEqhnUuhfgctJfKztyW6IMThp4edRv7TwO6nC8WPcnJ9WfSeOw3tjyCXU7zf/Pq/+RUN/bw27DThQaU9O5DVCce5ovMrFH5S0zEPLkUkKuY6vEDZ6dr05VOFT7x7V74Xv4ZhTQkaTt4cHjt8evkj1neQ5ImmGmb3pIeZdImalpGs8NTMnsMLMrvMS804IyaeGpOchT7EURaLWKUwUZfxZZ2ZuXzeS/4ERSPqZp2bmGNzvbYpCkWcrFIqs2+7ZpnNA0rTixFY3UpwYskdS6ePMMyflMW/nS+lODJkn6cUU2gPMPDMb9hZNeWLIq2p+0mRdeNXMkpy+kk8MaQabUwmnDAASamecSBkA+cAoP5Ldy1QnhgwpB4AnswintLuTagT4diLdQeZbKURTTAQtkfRbb92MJOna4qR2N7zXAoYUMoone+pm3mGvpAVm5vaF5fYIKBIuVig7PyVnSVrhlQ0k+b4D3CfpI456mbFZIMmtIKbLIwBYLOkxD61Mx1xXnNQeRXQAEE4Kf0F56O81eyUtNLOoWcKoR0DxLMrP/WpweR+IfQf4rppfJKHJzJf0zRiB0o8A4CxJO5UTP6pmu5nNKHtxzAjwcWXn14EPAu8re3FMAHwg4tqMHyii0ltMAKyLuDbjxxozO1z24tK7eMxsFfBzSTeX1RiHbXo3oWSOmlvQeptCP1A4geVDCWzck0CzMwibJ5903PS4vFhPON7OQuCXwEFHW6nYDzwCnDArCswFHnW0dXdvPD0OwCTg75EdGQGu7cDWuYQdvxsj7aVgHXALIS3+VP1YAuyNtFe989sQztRbX7Ija4DZXdoz4CpgJXAk8kbGcBhYAVxR4p4NAcMl7dbH+W2AGXQfBA8ROZMFTCOcW9zL+gRvAN8Bzo9s+0RgWZe26+f8NsD7gec76MRewgKSp+0zgAe6vJll+AnOhSmB64F9Hdiur/PbAGcC93HyA5eHGeNFz9F+yppFSxO2ey7wj3Fs19/5owEmA58F7iU8q/9AKLeStKwr4TzjFEfaPkPigkyER8JSYOcou8PAjSnt9h2EEnbeXNbjPkwBkpemqb7EWAKK39Q98ivzslvS1GL7e1/Rl0fGFI7a4Ci5rh+dL/VpABR47qdLtjevavo5ADbVVKtW9HMA5BGgA3IA9F6rVvRzAORHQAf0bQCY2S75HHqxK0VtnrrQtwFQ4LGHrm+Hf6n/A2C9g4bnfELt6PcAeKomGpkqIKSsxZzy8TzQ5JPVM8B04JUSzn+JUAI/03QIySLfAFYBOwgJKYeBt4ufw8W/7QCeowfL1nXh/xKvq9i5XMu7AAAAAElFTkSuQmCC'}}
              />
            </TouchableNativeFeedback>
            {
              this.state.showSettings && this.state.loaded &&
              <View style={styles.generalControls}>
                <Text style={styles.controlTitle}>Playback Speed</Text>
                <View style={styles.rateControl}>
                  {this.renderRateControl(0.5)}
                  {this.renderRateControl(0.75)}
                  {this.renderRateControl(1.0)}
                  {this.renderRateControl(1.25)}
                  {this.renderRateControl(1.5)}
                </View>
              </View>
            }
            {
              !this.state.showSettings && this.state.loaded &&
              <TouchableNativeFeedback
                onPress={() => this.setState({paused: !this.state.paused})}
              >
                <Image
                  style={styles.playIcon}
                  resizeMode={'contain'}
                  source={{
                    uri:
                      !this.state.paused
                        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAABfklEQVR4nO3SwU3DUBRFQRspTSDKBdqA4mLaeGxYsbWjODkzBVy/b51lAQAAAAAAAAA42MxcZuZ9ZrY5zva3eXn2+x7ezHwe+GP/+3j2+/Za733AzGzLsrzeaH5b1/Vtz8DZ79vrDAHMLffXdd31xrPft9fLPT/O/QkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHECSBOAHECiBNAnADiBBAngDgBxAkgTgBxAogTQJwA4gQQJ4A4AcQJIE4AcQKIE0CcAOIEECeAOAHEnSGAnxtubwdsnP2+Xc4QwNcNt78P2Dj7fY9tZi4z8z4z1znO9W/z8uz3AQAAAAAAAAD89wvZ40hJ20f6WgAAAABJRU5ErkJggg=='
                        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFGklEQVR4nO3dTahVZRTG8WdVhIQUhkGDoJmJGSmJQvQ1SYgaNIioqJBAJ9qHimIRDsJJEuWkD8iCMgqlcGBGKaSRFomgRpYK3UgylVsJEmR+3H+D3YGbnO7X2Xuvfc55fqM7e5+XtXjX2Zz77iOZmZmZmZmZmZmZmZmZmZmZTRBwB7AFOA4MAp8A92TnshoAK4ELtLcNmJ6d0SoCzAPO/0/xW84Ca4HJ2XmtZMCmUYo/3C/Aw9mZrUTAwDgaoGUnMDM7u5VgAsVvOQesA67K3oN1oIMGaDkBLAAiey82ASU0QMtuYHb2fmycSmwAKB4lXwOmZO/LxqjkBmgZBBYBl2Tvz0ZRUQO07AHmZu/RRlBxAwAMAeuBqdl7tTZqaICWP4DFwKXZe+4mlT9aAVS9xkX2S1oSEbtrXrcr9eKHqFmSdgHvAtdmh2m6XmyAlsckHQaWAZdlh2mqXhwB7XyvYizsyA7SNL18Agw3Q9LnwEbguuwwTdIvDdDyoKRDwCrg8uwwTdAvI6CdI5KeiojPsoNk6rcTYLhpkj4FNgPXZ4fJ0s8N0HK/pB+A1cCk7DB16+cR0M6ApGciYkt2kLq4AdrbKunpiPgxO0jVPALau1fSQWANcEV2mCr5BBjdUUnLI+LD7CBVcAOM3XYVj42HsoOUySNg7O6W9C09doHFJ8DE/CppRUS8nx2kU26Aznyh4kum77KDTJRHQGfulLSPLr7A4hOgPCclrZL0TkR0zZ7dAOX7SsVY2JcdZCw8Asp3q6S9wOvA1dlhRuMToFq/S3pO0vqIGMoO044boB57VYyFb7KDXMwjoB5zJH0NvAVckx1mODdAfULSEyr+U3lJUy6weATkOaBiLOzKDOETIM/Nkr4ENmReYHED5HtUiRdYPAKapfYLLD4BmqV1geWluhZ0AzTTcmBlHQt5BDTXGUkzIuKnKhfxCdBckyQtrHoRN0Cz3Vf1Am6AZqv8ypoboM+5AZrt56oXcAM029aqF/BjYHOdkXRjRAxUuYhPgOZ6oeriSz4BmurliFhex0J+fVqzHJT0pL8M6j+nJS2TNKvuV9n5BMiFpPckrYyIExkB3AB5DkhanP1OY4+A+p2StETSLdnFl3wC1AlJb0t6NiIGs8O0uAHqsVfFcb8nO8jFPAKq9ZukRZLmNbH4kk+AqgxJekPS8xFxKjvMSNwA5fP18D51UtICSbd1S/ElN0AZzktaJ2laRHTV20Ekj4BO+SVRfeqYpEci4q5uLr7kBhivc5LWSpoeER9khymDR8DYbVfxVe3h7CBl8gkwuqOSHoiI+b1WfMkNMJK/Ja1Rcdx/lB2mKh4B7fXND0a4Af5rQEXhP84OUhePgMJfklaruI3bN8WXfAJI0mZJSyOi8ls4TdTPDXBExWPdtuwgmfpxBPyp4q3eN/V78aX+OwE2qvgBqGPZQZqiXxrgoIovbXZmB2maXh8BpyUtVXHhYmdylkbq1RMASRtUXLg4mR2myXqxAfarOO7T/+e+G/TSCDglabGkOS5+g1C9IeBNYGr2Xq2Niou/B5ibvUcbQUWFHwQWAr00wnpTyYW/ALwKTMnel41RicXfDczO3o+NUwmFPw48DlT+PiOrQAeFPwe8AlyZvQfrADAwgeLvAGZmZ7cSAJvGUfhfgIeyM1uJgHnA+VEKfxZ4EZicndcqAKygeIRrZxtwQ3ZGqxhwO7CF4lP9yX//np+dy8zMzMzMzMzMzMzMzMzMzKzX/ANcwvqrHCtF+QAAAABJRU5ErkJggg=='
                  }}
                />
              </TouchableNativeFeedback>
            }
            <View style={styles.trackingControls}>
              <Text style={styles.timeLabelText}>{this.state.currentTime == undefined ? '00:00' : this.getTime(this.state.currentTime)}</Text>
              <Slider
                style={styles.seek}
                minimumTrackTintColor={'#5e4096'}
                maximumTrackTintColor={'rgba(255,255,255,1)'}
                thumbTintColor={'#5e4096'}
                value={this.state.sliderValue}
                onValueChange={value => {
                  this.setState({ currentTime: value * this.state.duration });
                  this.setState({sliderValue: value});
                  this.video.seek(value * this.state.duration);
                }}
              />
              <Text style={styles.timeLabelText}>{this.getTime(this.state.duration)}</Text>
            </View>
          </View>
        }
      </View>
    )

  }
}
  export default video;
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList
} from 'react-native'
import {Icon} from 'react-native-elements';
import firebase from 'react-native-firebase';


const db = firebase.firestore();

class ClassUpdates extends Component {
  constructor() {
    super();
    this.timeSince = this.timeSince.bind(this);
    this.state = {
      updates: []
    }
  }

async componentDidMount() {
  
  await firebase.firestore()
   .collection('announcement/'+this.props.navigation.state.params.data.teacher_id+'/'+this.props.navigation.state.params.data.batch_id)
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          
          this.setState({updates:[...this.state.updates, doc.data()]});
        });
    }); 
  }

  timeSince(date) {

    //ToastArndroid.show(date, ToastAndroid.SHORT);
    var dif =  new Date() - date;
    var seconds = Math.floor(parseFloat(dif / 1000));
    

    var interval = Math.floor(parseFloat(seconds / 31536000));

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(parseFloat(seconds / 2592000));
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(parseFloat(seconds / 86400));
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(parseFloat(seconds / 3600));
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(parseFloat(seconds / 60));
    if (interval > 1) {
        return interval + " minutes";
    }
    //ToastAndroid.show("auaaaa" + Math.floor(parseFloat(seconds))+ new Date() + typeof(Math.floor(parseFloat(seconds))) + typeof(seconds) + typeof(interval), ToastAndroid.SHORT);
  
    return Math.floor(parseFloat(seconds)) + " seconds";
  }

  _renderItem ({item, index}) {
    console.log("date1: "+item.time);
    console.log("data1: "+this.timeSince(new Date(item.time)));
    return (
            <View style ={{flexDirection:'row', borderRadius:5, width: '100%', marginTop: 2 * vh, alignSelf: 'flex-start', padding: 2 * vw}}>
              <Icon     name='message'
                        color='grey'
                        type='material'
                        size= {35} />
              <View style={{marginLeft: 2 * vw, width: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
                  <Text style={{fontSize: 15, color:'grey', fontWeight: 'bold'}}> {item.type} </Text>
                  <Text style={{color: '#4286f4', fontSize: 15, fontStyle: 'italic', textAlign: 'center'}}>{this.timeSince(new Date(item.time)) + ' ago'}</Text>
                </View>
                <Text style={{fontSize: 16, color:'grey'}}> {item.message} </Text>
              </View>
             
            </View>

         );
    }
  

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.updates}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem.bind(this) }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      )
  }
}

export default ClassUpdates

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  }
})

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


  _renderItem ({item, index}) {
    return (
            <View style ={{flex:1, flexDirection:'row', backgroundColor:'white', borderRadius:5, width: 350, marginTop: 30, alignItems:'center'}}>
              <Icon     name='message'
                        color='grey'
                        type='material'
                        size= {35} />
              <View>
                <Text style={{fontSize: 15, color:'grey', fontWeight: 'bold'}}> {item.type} </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F3651',
  },
  text: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  }
})

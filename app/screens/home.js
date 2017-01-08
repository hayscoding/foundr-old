import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

export default class Home extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <View style={styles.header}>
          <Text style={{fontSize:40, color:'#EA0059'}}>Grambler</Text>
        </View>
        <View style={styles.card}>
          <Image
            style={{flex:1}}
            source={{uri: 'http://cdn.acidcow.com/pics/20100226/most_beautiful_men_70.jpg'}}
          />
          <View style={{margin:20}}>
            <Text style={{fontSize:25}}>Hays, 19</Text>
            <Text style={{fontSize:15}}>Superhuman</Text>
          </View>
        </View>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    flex: 5,
    overflow: 'hidden',
    backgroundColor: '#EA0059',
    margin: 10,
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 15
  }
})


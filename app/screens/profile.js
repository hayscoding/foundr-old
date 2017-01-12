import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity, 
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class Profile extends Component {
  render() {
    const {user} = this.props;
    console.log(user)


    const fbImageUrl = `https://graph.facebook.com/${user.id}/picture?height=${height}`

    return(
      <View style={{flex: 1}}>
        <View style={styles.container}>  
          <Image 
            resizeMode='cover'
            source={{uri: fbImageUrl}}
            style={{width:width, height:height/2}} />
          <Text style={styles.name}>{user.first_name}</Text>
          <Text style={styles.work}>{user.bio}</Text>
          <Text style={styles.bio}>The best of the best, forever and always</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: height*.1,
    height:height,
    width:width,
    backgroundColor:'white',
  },
  text: {
    color: '#2B2B2B',
    fontSize: 48,
    textAlign: 'center'
  },
  name: {
    color: '#2B2B2B',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 2,
    textAlign: 'center'
  },
  work: {
    fontSize:15,
    marginBottom: 10,
    color:'#A4A4A4',
    textAlign: 'center'
  },
  bio: {
    fontSize:12,
    color:'black',
    textAlign: 'center'
  },
});
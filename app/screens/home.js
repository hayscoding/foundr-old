import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity, 
  Dimensions,
} from 'react-native';

import Header from '../components/header';
import ProfileImage from '../components/profileImage';

const {height, width} = Dimensions.get('window');

const PROFILE_PIC_WIDTH = height / 5;

export default class Profile extends Component {
  render() {
    const {user} = this.props;
    console.log("IN PROFILE: ")
    console.log(user)
    return(
      <View style={{flex: 1}}>
        <Header facebookID={user.id} />
        <View style={styles.container}>  
          <Text style={styles.text}>
            Welcome{'\n'}to{'\n'}DateGame!
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    height:height,
    width:width,
    backgroundColor:'white',
  },
  text: {
    color: '#2B2B2B',
    fontSize: 48,
    textAlign: 'center'
  },
});
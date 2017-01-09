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
			<View style={styles.container}>
				<TouchableOpacity onPress={() => {}}>
					<ProfileImage style={styles.image} facebookID={user.id} size={PROFILE_PIC_WIDTH}/>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
    height:height,
    width:width,
    backgroundColor:'white',
  },
  image: {
    marginTop:20,
    flexDirection:'row',
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center'
  },
  name: {
    color: '#2B2B2B',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 2
  },
});
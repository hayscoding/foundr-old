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
import ProfileImage from '../components/profile';

const {height, width} = Dimensions.get('window');

const PROFILE_PIC_WIDTH = height / 4.5;

export default class Profile extends Component {
	render() {
		const {user} = this.props;
		console.log("IN PROFILE: ")
		console.log(user)
		return(
			<View style={styles.container}>
				<Header iconName={'ios-person'} />
				<TouchableOpacity onPress={()=>this.showlogoutAlert()}>
					<Image style={{flex: 1, width: PROFILE_PIC_WIDTH, height: height}} source={{uri: 'http://cdn.acidcow.com/pics/20100226/most_beautiful_men_70.jpg'}} />
				</TouchableOpacity>
				<Text style={styles.name}>{user.first_name}</Text>
     			<Text style={styles.work}>{user.bio}</Text>
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
  name: {
    color: '#2B2B2B',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 2
  },
});
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button
} from 'react-native';

import Exponent from 'exponent'
import * as FirebaseAPI from '../modules/firebaseAPI'
import firebase from 'firebase'
import {Router} from '../../app'

const APP_ID = '372366163116874';

export default class Login extends Component {
	displayError(messsage) {
	    Alert.alert(
	      'Error: ',
	      messsage,
	      [
	        {text: 'Ok', onPress: () => console.log('accepted error')},
	      ]
	    )
	 }

	fbLogin = async() => {
	 	const { type, token } = await Exponent.Facebook.logInWithReadPermissionsAsync(
		    APP_ID, {
		      permissions: ['public_profile', 'email', 'user_birthday'],
		    });
		if (type === 'success') {
	        const fields = ['email','first_name','last_name', 'gender']
	        // facebook user data request
	        const response = await fetch(`https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`)

	        const user = await FirebaseAPI.loginUser(token)

	        FirebaseAPI.mergeUser(await user.uid, await response.json())
	        	.then(() => console.log('merge success'), () => this.showError('Could not add you to database'))

        	this.firebaseRef = firebase.database().ref('users')

    		firebase.auth().onAuthStateChanged(fbAuth => {
      			if (fbAuth) {  
      				this.firebaseRef.child(fbAuth.uid).on('value', snap => {
						const user = snap.val()
						if (user != null) {
							this.props.navigator.push(Router.getRoute('profile', {user}))
						}
					})
				}
			})
		} else {
			this.displayError('Facebook login failed')
		}
    }

    render() {
	    return (
	      <View style={styles.container}>
	      	<View style={styles.fbButton}>
	      		<Button title={'Login'} accessibilityLabel={'Log in with Facebook'} onPress={this.fbLogin}/>
	      	</View>
	      </View>
	    );
  	}
}

const styles = StyleSheet.create({
  container: {
  	flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbButton: {
  	width: 220, 
  	height: 40,
  	backgroundColor: 'lightblue', 
  }
});
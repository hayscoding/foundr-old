import React, {Component} from 'react';
import {
  Animated,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity, 
  Dimensions,
} from 'react-native';

import Header from '../components/header';
import {Router} from '../../app'
import * as firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'

const {height, width} = Dimensions.get('window');

export default class Profile extends Component {
  componentWillMount() {
    this.state = { 
      profileIndex: 0,
      scrollEnabled: true,
      profiles: [],
      user: this.props.user,
    }
  }

  componentDidMount() {
    FirebaseAPI.watchUserLocationDemo(this.state.user.uid)
    FirebaseAPI.watchUser(this.state.user.uid, (user) => {
      if (user) {
      this.setState({
          user: user,
          profileIndex: 0
        })
        FirebaseAPI.findProfiles(user, (profile) => {
          const profiles = [...this.state.profiles, profile]
          this.setState({profiles:profiles})  
        })
      }
    })
  }

  render() {
    const {
      profileIndex,
      user,
      profiles,
    } = this.state


    return(
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {this.props.navigator.push(Router.getRoute('profile', {user}))}}>
          <Header facebookID={user.id} />
        </TouchableOpacity>
        <View style={styles.container}> 
          {profiles.slice(profileIndex,profileIndex + 3).reverse().map((profile, i, profileArray) => {
            const fbImageUrl = `https://graph.facebook.com/${profile.id}/picture?height=${400}` // get facebook profile image url

            return <Image resizeMode='cover' source={{uri: fbImageUrl}} style={{width: 150, height: 150}} />
          })}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
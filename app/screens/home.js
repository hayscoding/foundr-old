import React, {Component} from 'react';
import {
  Animated,
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity, 
  Dimensions,
  InteractionManager
} from 'react-native'

import Header from '../components/header'
import DualCard from '../components/dualCard'

import {Router} from '../../app'
import * as firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'

import filterProfiles from '../modules/filter'

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
          const newProfiles = [...this.state.profiles, profile]
          const filteredProfiles = filterProfiles(newProfiles, user)

          this.setState({profiles:filteredProfiles})  
        })
      }
    })
  }

  logout () {
    this.props.navigator.popToTop()
    InteractionManager.runAfterInteractions(() => {
      FirebaseAPI.logoutUser().then(
        () => console.log('signout successful'),
        () => console.log('signout not successful'))
    })
  }

  nextProfile(profile, profileUid) {
    const userUid = this.state.user.uid
    this.setState({
      profileIndex:this.state.profileIndex+1
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
        <TouchableOpacity style={{height:height/8+5, borderBottomWidth: 3, borderColor: 'gray', backgroundColor: 'white'}}
          onPress={() => {this.props.navigator.push(Router.getRoute('profile', {user}))}}>
          <Header facebookID={user.id} />
        </TouchableOpacity>
        <View style={styles.container}> 
          {profiles.slice(profileIndex, profileIndex+1).map((profile, i, profileArray) => {
              if(profiles.length > 1)
                return <DualCard 
                  profileLeft={profile} 
                  profileRight={profiles[profileIndex+1]} 
                  key={String(profileIndex) + String(profileIndex+1)} 
                  nextProfile={(profile, profileId) => this.nextProfile(profile, profile.id)}/>
                })
          }
          <TouchableOpacity style={{alignItems:'center'}} onPress={() => this.logout()}>
            <Text style={{marginTop: 30, fontSize: 40}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor:'white',
  },
  text: {
    color: '#2B2B2B',
    fontSize: 48,
    textAlign: 'center'
  },
});
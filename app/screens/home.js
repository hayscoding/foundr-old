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
import Matching from '../components/matching'

import {Router} from '../../app'
import * as firebase from 'firebase'
import * as FirebaseAPI from '../modules/firebaseAPI'

import filterProfiles from '../modules/filter'

const {height, width} = Dimensions.get('window');

export default class Home extends Component {
  componentWillMount() {
    this.state = { 
      profileIndex: 0,
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
          if(canPassProfile(profile, user)) {
            const profiles = [...this.state.profiles, profile]

            this.setState({profiles:profiles})
          }  
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

  nextProfileIndex() {
    this.setState({
      profileIndex:this.state.profileIndex+1
    })
  }

  showPrompt(condition) {
    const {user, profiles} = this.state

    const profile = profiles.slice(this.state.profileIndex, this.state.profileIndex+1)

    if(condition)
      if(user.gender == 'male' && profile.selectedQuestion != null)
        return(<TouchableOpacity style={styles.promptTouchable} 
            onPress={() => {}}>
            <Text style={styles.promptText}>{String(FirebaseAPI.getQuestion(profile.selectedQuestion))}</Text>
          </TouchableOpacity>)
      else if(user.gender != 'male' && user.selectedQuestion != null) 
        return(<TouchableOpacity style={styles.promptTouchable} 
            onPress={() => {}}>
            <Text style={styles.promptText}>{String(FirebaseAPI.getQuestion(user.selectedQuestion))}</Text>
          </TouchableOpacity>)
      else if(user.gender == 'male') 
        return(<TouchableOpacity style={styles.promptTouchable} 
            onPress={() => {}}>
            <Text style={styles.promptText}>A Question is Being Chosen...</Text>
          </TouchableOpacity>)
      else if(user.gender != 'male') 
        return(<TouchableOpacity style={styles.promptTouchable} 
            onPress={() => {this.props.navigator.push(Router.getRoute('questions', {user}))}}>
            <Text style={styles.promptText}>Ask Question</Text>
          </TouchableOpacity>)
  }

  showAnswers(condition) {
    if(condition)
      if(this.state.user.gender == 'male'){
          const profile = this.state.profiles[0]
          
          return(<View style={styles.container}>
                  <View style={{flex: 2}}>
                    <View style={styles.containerTop}>
                      <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: this.props.user}))}}>
                        <Text style={styles.name}>Your Answer</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.containerBottom}>
                      <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: profile}))}}>
                        <Text style={styles.name}>{profile.first_name}'s Answer</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>)
        }
    }


  render() {
    const {
      profileIndex,
      user,
      profiles,
    } = this.state

    const isFindingProfiles = !(profiles.slice(profileIndex,profileIndex + 3).length < 1)

    
    return(
      <View style={{flex: 1}}>
        <TouchableOpacity style={{height:height/8+5, borderBottomWidth: 3, borderColor: 'gray', backgroundColor: 'white'}}
          onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: user, user: user}))}}>
          <Header facebookID={user.id} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Matching animating={!isFindingProfiles} />
          {this.showPrompt(isFindingProfiles)}
          {this.showAnswers(isFindingProfiles)}
          <TouchableOpacity style={{justifyContent: 'flex-start', alignItems:'center'}} onPress={() => this.logout()}>
            <Text style={{marginTop: 10, marginBottom: 20, fontSize: 40}}>Logout</Text>
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
  promptText: {
    marginTop: 10, 
    marginBottom: 20, 
    fontSize: 40,
    textAlign: 'center'
  },
  promptTouchable: {
    justifyContent: 'flex-start',
    alignItems:'center', 
    borderBottomWidth: 2, 
    borderColor: 'gray'
  },
  containerTop: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray'
  },
  containerBottom: {
    flex: 1,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  nameHeader: {
    width: width * 0.8,
    alignSelf: 'center',
    borderBottomWidth:  1,
    borderColor: 'lightgrey'
  },
  name: {
    color: '#2B2B2B',
    fontSize: 20,   
    textAlign: 'center',
  },
});
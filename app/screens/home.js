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
  InteractionManager,
  ActivityIndicator
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
      profiles: [],
      user: this.props.user,
      question: ''
    }
  }

  componentDidMount() {
    FirebaseAPI.watchUserLocationDemo(this.state.user.uid)
    FirebaseAPI.watchUser(this.state.user.uid, (user) => {
      if (user) {
      this.setState({
          user: user,
        })
        FirebaseAPI.findProfiles(user, (profile) => {
          const newProfiles = [...this.state.profiles, profile]
          console.log("NewProfiles: ")
          console.log(newProfiles)
          const filteredProfiles = filterProfiles(newProfiles, user)
          this.setState({profiles:filteredProfiles})  
          
          this.watchForQuestion()
        })
      }
    }) 
  }

  watchForQuestion() {
     const profile = this.state.user.gender == 'male' ? this.state.profiles.find((profile) => {return profile.gender == 'female'}) : this.state.user.uid

      if(profile != null) {
        console.log('profileeed')
        firebase.database().ref().child('users/'+profile.uid).on('value', (snap) => {
            console.log('watched complete')
            FirebaseAPI.getQuestion(snap.val().selectedQuestion, (question) => this.setState({question: question.text}))
        })
      }
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

  showPrompt() {
    const {user} = this.state

    if(user.gender == 'male') {
      const profile = this.state.profiles.find((profile) => {return profile.gender == 'female'})


      if(profile.selectedQuestion != 0) {
        if(this.state.question == '')
          FirebaseAPI.getQuestion(profile.selectedQuestion, (question) => this.setState({question: question.text}))

        return(<TouchableOpacity style={styles.promptTouchable} 
                onPress={() => {}}>
                <Text style={styles.promptText}>{this.state.question}</Text>
              </TouchableOpacity>)
      } else
        return(<TouchableOpacity style={styles.promptTouchable} 
                onPress={() => {}}>
                <Text style={styles.promptText}>A Question is Being Chosen...</Text>
              </TouchableOpacity>)

    } else if(user.gender == 'female') {
      
      if(user.selectedQuestion != 0) {
        if(this.state.question == '')
          FirebaseAPI.getQuestion(user.selectedQuestion, (question) => this.setState({question: question.text}))

        console.log(this.state.question)
        return(<TouchableOpacity style={styles.promptTouchable} 
                onPress={() => {}}>
                <Text style={styles.promptText}>{this.state.question}</Text>
              </TouchableOpacity>)
      } else
        return(<TouchableOpacity style={styles.promptTouchable} 
                onPress={() => {this.props.navigator.push(Router.getRoute('questions', {user}))}}>
                <Text style={styles.promptText}>Ask Question</Text>
              </TouchableOpacity>)

    }
  }

  showAnswers() {
    if(this.state.user.gender == 'male'){
        const profile = this.state.profiles.find((profile) => {return profile.gender == 'male'})
        
        return(<View style={styles.container}>
                <View style={{flex: 2}}>
                  <View style={styles.containerTop}>
                    <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: this.state.user}))}}>
                      <Text style={styles.name}>Your Answer</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.containerBottom}>
                    <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: profile}))}}>
                      <Text style={styles.name}>{profile.first_name} Answer</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>)
      } else if(this.state.user.gender != 'male'){
        const topProfile = this.state.profiles[0]
        const bottomProfile = this.state.profiles[1]
        
        return(<View style={styles.container}>
                <View style={{flex: 2}}>
                  <View style={styles.containerTop}>
                    <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: topProfile}))}}>
                      <Text style={styles.name}>{topProfile.first_name} Answer</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.containerBottom}>
                    <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: bottomProfile}))}}>
                      <Text style={styles.name}>{bottomProfile.first_name} Answer</Text>
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

    const isFindingProfiles = (profiles.length < 2)

    console.log('rendered')
    console.log(profiles)

    if(!isFindingProfiles) {
      const femaleProfile = (user.gender == 'female') ? user : this.state.profiles.find((profile) => {return (profile.gender == 'female')})

      return(
        <View style={{flex: 1}}>
          <TouchableOpacity style={{height:height/8+5, borderBottomWidth: 3, borderColor: 'gray', backgroundColor: 'white'}}
            onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: femaleProfile}))}}>
            <Header facebookID={femaleProfile.id} />
          </TouchableOpacity>
          <View style={styles.container}>
            {this.showPrompt()}
            {this.showAnswers()}
            <TouchableOpacity style={{justifyContent: 'flex-start', alignItems:'center'}} onPress={() => this.logout()}>
              <Text style={{marginTop: 10, marginBottom: 20, fontSize: 40}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) 
    } else
      return(
        <View style={{flex: 1}}>
          <TouchableOpacity style={{height:height/8+5, borderBottomWidth: 3, borderColor: 'gray', backgroundColor: 'white'}}
            onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: user}))}}>
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <ActivityIndicator size="small"/>
            </View>
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
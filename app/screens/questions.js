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
      questions: [],
      user: this.props.user,
    }
  }

  componentDidMount() {
    FirebaseAPI.getQuestions((questions) => {
      this.setState({questions: questions})
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


  render() {
    const {
      questions,
      user,
    } = this.state

    return(
      <View style={{flex: 1}}>
        <TouchableOpacity style={{height:height/8+5, borderBottomWidth: 3, borderColor: 'gray', backgroundColor: 'white'}}
          onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: user, user: user}))}}>
          <Header facebookID={user.id} />
        </TouchableOpacity>
        <View style={styles.container}> 
          {
            questions.map((question) => {
              return <Text style={{marginTop: 10, marginBottom: 20, fontSize: 40}}>{question}</Text>
            })
          }
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
  text: {
    color: '#2B2B2B',
    fontSize: 48,
    textAlign: 'center'
  },
});
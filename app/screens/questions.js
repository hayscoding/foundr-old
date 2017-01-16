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

import BackHeader from '../components/header'
import Question from '../components/question'

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

  selectQuestion(questionID) {
    FirebaseAPI.selectQuestion(this.props.user.uid, questionID)
  }

  render() {
    const {
      questions,
      user,
    } = this.state

    return(
      <View style={{flex: 8}}>
        <TouchableOpacity style={{borderBottomWidth: 3, borderColor: 'gray', backgroundColor: 'white'}}
          onPress={() => {this.props.navigator.pop()}}>
          <BackHeader />
        </TouchableOpacity>
        <View style={styles.container}> 
          {
            questions.map((question) => {
              return (
                <View style={styles.questionContainer} key={'view'+question.id}>
                  <TouchableOpacity  onPress={this.selectQuestion(question.id)} key={'touchable'+question.id} >
                    <Question question={question} key={question.id} />
                  </TouchableOpacity>
                </View>)
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
    flex: 6,
    borderTopWidth: 2,
    borderColor: 'lightgrey',
    backgroundColor:'white',
  },
  text: {
    color: '#2B2B2B',
    fontSize: 48,
    textAlign: 'center'
  },
  questionContainer: {
    flex: 2,
    marginTop: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  }
});
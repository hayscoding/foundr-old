import React, {Component} from 'react'
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  PixelRatio,
  StyleSheet
} from 'react-native'

import * as firebase from 'firebase'
import moment from 'moment'
import {Ionicons} from '@exponent/vector-icons'


const {height, width} = Dimensions.get('window')
import { GiftedChat } from 'react-native-gifted-chat'

const ratio = PixelRatio.get()

export default class Answer extends Component {
  constructor(props) {
    super(props);
    this.state = {answers: []}
  }

  watchChat() {
    firebase.database().ref().child('users').child(this.props.profile.uid).child('answers')
      .orderByChild('createdAt')
      .on('value', (snap) => {
      let answers = []
      snap.forEach((child) => {
        const date = moment(child.val().createdAt).format()
        answers.push({
          text: child.val().text,
          _id: child.key,
          createdAt: date,
          user: {
            _id: child.val().sender,
          }
        })

      });
      answers.reverse()

      this.setState({answers})
    })
  }

  componentWillMount() {
    this.watchChat()
  }

	render() {
		return (
		  <View style={styles.container}>
		        <GiftedChat
          messages={this.state.answers}
          onSend={() => {}}
          renderTime={() => {}}
          renderComposer={() => {}} />
		  </View> 
		)    
	}

 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:width,
    backgroundColor:'white',
  },
  answer: {
    color: '#2B2B2B',
    fontSize: 40,   
    textAlign: 'center',
  },
});
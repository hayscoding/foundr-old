import React, {Component} from 'react'
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  PixelRatio,
  Alert
} from 'react-native'

import * as firebase from 'firebase'
import moment from 'moment'
import {Ionicons} from '@exponent/vector-icons'


const {height, width} = Dimensions.get('window')

import { GiftedChat } from 'react-native-gifted-chat'
import BackHeader from '../components/backHeader'

const ratio = PixelRatio.get()

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: []}

    const profileUid = this.props.profile.uid

    const uid = this.props.uid
    this.chatID = (uid > profileUid) ? uid+'-'+profileUid : profileUid+'-'+uid

    this.props.composerHeight = 33;
  }

  watchChat() {
    firebase.database().ref().child('messages').child(this.chatID)
      .orderByChild('createdAt')
      .on('value', (snap) => {
      let messages = []
      snap.forEach((child) => {
        const date = moment(child.val().createdAt).format()
        messages.push({
          text: child.val().text,
          _id: child.key,
          createdAt: date,
          user: {
            _id: child.val().sender,
          }
        })
      });
      messages.reverse()
      this.setState({messages})
    })
  }

  componentWillMount() {
    this.watchChat()
  }

  onSend(message) {
    firebase.database().ref().child('messages').child(this.chatID)
      .push({
        text: message[0].text,
        createdAt: new Date().getTime(),
        sender: message[0].user._id     
      })
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', width: width, backgroundColor:'white', justifyContent: 'center'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(m) => this.onSend(m)}
          renderTime={() => {}}
          user={{
            _id: this.props.uid,
          }}
        />
      </View>
    );
  }
}

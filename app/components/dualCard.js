import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  InteractionManager,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import moment from 'moment'

import {Router} from '../../app'
import Chat from './chat'

const {height, width} = Dimensions.get('window');
const ratio = PixelRatio.get() // get the pixel ratio so that we can calc optimum image size later
const size = width/3
 
export default class DualCard extends Component { 
  constructor(props) {
    super(props)
  }

  componenetWillUnmount() {
    //this.props.nextProfileIndex()
  }

  render() {
    const profileLeft = this.props.profileLeft 
    const profileRight = this.props.profileRight

    const leftFbImageUrl = `https://graph.facebook.com/${profileLeft.id}/picture?height=${size}` 
    const rightFbImageUrl = `https://graph.facebook.com/${profileRight.id}/picture?height=${size}` 

    return (
      <View style={{flex: 2}}>
        <View style={styles.containerTop}>
          <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: profileLeft}))}}>
            <Text style={styles.name}>{profileLeft.first_name}</Text>
          </TouchableOpacity>
          <Chat uid={this.props.user.uid} profile={profileLeft} />
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity style={styles.nameHeader} onPress={() => {this.props.navigator.push(Router.getRoute('profile', {profile: profileRight}))}}>
            <Text style={styles.name}>{profileRight.first_name}</Text>
          </TouchableOpacity>
          <Chat uid={this.props.user.uid} profile={profileRight} />
        </View>
      </View>
    )    
  }

 }

const styles = StyleSheet.create({
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
  cardImage: {
    width:size,
    height:size,
    alignSelf: 'center',
  },
  details: {
    justifyContent:'center',
    margin: 20,
  },
  name: {
    color: '#2B2B2B',
    fontSize: 20,   
    textAlign: 'center',
  },
  nameHeader: {
    width: width * 0.8,
    alignSelf: 'center',
    borderBottomWidth:  1,
    borderColor: 'lightgrey'
  },
});
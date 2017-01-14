import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Dimensions,
  View,
  Image,
  Text,
  Animated,
  PanResponder,
  PixelRatio
} from 'react-native';

import moment from 'moment'

const {height, width} = Dimensions.get('window');
const ratio = PixelRatio.get() // get the pixel ratio so that we can calc optimum image size later
const size = width/3
 
export default class DualCard extends Component { 
  constructor(props) {
    super(props)
  }

  componenetWillUnmount() {
    this.props.nextProfile(this.props.profileLeft, this.props.profileLeft.id)
  }

  render() {
    const profileLeft = this.props.profileLeft 
    const profileRight = this.props.profileRight
  
    //Alert.alert(String(profileRight))

    const leftFbImageUrl = `https://graph.facebook.com/${profileLeft.id}/picture?height=${size}` 
    const rightFbImageUrl = `https://graph.facebook.com/${profileRight.id}/picture?height=${size}` 

    return (
      <View style={{flex: 2}}>
        <View style={styles.containerTop}>
          <Text style={styles.name}>{profileLeft.first_name}</Text>
          <View style={styles.hr}></View>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.name}>{profileRight.first_name}</Text>
          <View style={styles.hr}></View>
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
  hr: {
    width: width * 0.8,
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth:  1,
    borderColor: 'lightgrey'
  },
});
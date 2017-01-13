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
      <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
        <View style={styles.imageContainerLeft}>
          <Image
            style= {styles.cardImage}
            resizeMode='cover'
            source={{uri: leftFbImageUrl}}
          />
        </View>
        <View style={styles.hr}></View>
        <View style={styles.imageContainerRight}>
          <Image
            style= {styles.cardImage}
            resizeMode='cover'
            source={{uri: rightFbImageUrl}}
          />
        </View>
      </View>
    )    
  }

 }

const styles = StyleSheet.create({
  imageContainerLeft: {
    overflow: 'hidden',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  imageContainerRight: {
    overflow: 'hidden',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  cardImage: {
    width:size,
    height:size,
    alignSelf: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  details: {
    justifyContent:'center',
    margin: 20,
  },
  name: {
    color: '#2B2B2B',
    fontSize: 20
  },
  work: {
    color: '#A4A4A4',
    fontSize: 15
  },
  hr: {
    width: width * 0.9,
    flexDirection: 'row',
    borderWidth:  1,
    borderColor: 'lightgrey'
  },
});
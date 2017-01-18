import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Dimensions,
  ActivityIndicator
} from 'react-native'
const {height, width} = Dimensions.get('window')

export default class Matching extends Component {
  componentWillMount() {
    this.isAnimating = false
  }

  componentDidUpdate(prev) {
    if (this.props.animating && !this.isAnimating) {
      this.isAnimating = true
    }
  }

  render() {
    if (this.props.animating) {
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <ActivityIndicator size="small"/>
        </View>
      )
    } else {
      return <View />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height:40,
    width:40,
    borderRadius: 200,
    borderColor:'#CF2E2E',
    borderWidth:2,
    backgroundColor:'#F6BABA',
  },
})
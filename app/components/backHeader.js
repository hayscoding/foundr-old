import React, { Component } from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {Ionicons} from '@exponent/vector-icons'

const {height, width} = Dimensions.get('window');
const size = 50;

export default BackHeader = ({iconName}) => {
  return (
    <View style={styles.container}>
      <Ionicons 
        name={iconName}
        size={size}
        color={'black'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    justifyContent:'center',
    flexDirection:'row',
    height: size,
    width: width,
    backgroundColor:'transparent',
  }
})
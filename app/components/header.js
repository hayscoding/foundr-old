import React, { Component } from 'react'
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {Ionicons} from '@exponent/vector-icons'

const {height, width} = Dimensions.get('window');

export default Header = ({iconName}) => {
  return (
    <View style={styles.container}>
        <Ionicons name={iconName} size={44} color={'#FD6C69'} />  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flexDirection:'row',
    height:60,
    width:width,
    backgroundColor:'transparent',
    alignItems:'center',
    justifyContent:'center'
  }
})
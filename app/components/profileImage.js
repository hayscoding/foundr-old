import React from 'react'
import {
	Image,
	View,
  PixelRatio
} from 'react-native'

const ratio = PixelRatio.get()

export default ({facebookID, size, style}) => {

  const fbImageUrl = `https://graph.facebook.com/${facebookID}/picture?height=${Math.round(size*ratio)}`
	return (
    <Image
      resizeMode='cover'
      source={{uri: fbImageUrl}}
      style={{width: size, height: size, borderRadius: 20}}/>
	)
}
  
import * as firebase from 'firebase';
import GeoFire from 'geofire'
import * as _ from 'lodash'
import Exponent from 'exponent';

export const loginUser = (accessToken) => {

    const provider = firebase.auth.FacebookAuthProvider //declare fb provider
    const credential = provider.credential(accessToken) //generate fb credential
    return firebase.auth().signInWithCredential(credential) // signin to firebase using facebook credential
}

export const logoutUser = () => {
  return firebase.auth().signOut()
}

export const updateUser = (uid, key, value) => {
  firebase.database().ref().child('users/'+uid)
    .update({[key]:value})
}

const setDemoRelations = (uid) => { // so demo users can test match screen
  firebase.database().ref().child('relationships').child(uid).child('likedBack')
  .set({
    '12MxHblv9UWGIUlyFlZXI8hBR3p1': true,
    'XEQ9X4l72AbuM5l21IubZWP1MVA2': true
  })
}

export const mergeUser = (uid, newData) => {
  setDemoRelations(uid) //ADD DEMO RELATIONSHIP DATA
  console.log('newData', newData)
  const firebaseRefAtUID = firebase.database().ref().child('users/'+uid)
  return firebaseRefAtUID.once("value").then((snap) => {
    const defaults = {
        maxDistance: 5,
        ageRange: [18,24],
        showMen : newData.gender == 'female' ? true : false,
        showWomen: newData.gender == 'male' ? true : false,
        uid: uid,
        birthday: "01/01/1992",
        bio: 'App Developer'
    }
    const current = snap.val()
    const mergedUser = {...defaults, ...current, ...newData}
    firebaseRefAtUID.update(mergedUser)
  })  
}


export const getUser = (key) => {
  return firebase.database().ref().child('users').child(key).once('value')
    .then((snap) => snap.val())
}
import * as _ from 'lodash'
import moment from 'moment'

export default filterProfiles = (profiles, user) => {
  const uniqueProfiles = _.uniqBy(profiles, 'uid') //get unique profiles

  let passedFemaleProfile = false
  let passedMaleProfile = false
  let counter = 0
  const filteredProfiles = uniqueProfiles.filter((profile) => {
    //convert birthdate into moment date
    const userBirthday = moment(user.birthday, "MM/DD/YYYY")
    //work out age using moments diff function on years
    const userAge = moment().diff(userBirthday, 'years')
    //do same for profile
    const profileBirthday = moment(profile.birthday, "MM/DD/YYYY")
    const profileAge = moment().diff(profileBirthday, 'years')
    // is the age of the profile within users AgeRange?
    const userAgeRange = _.inRange(profileAge,user.ageRange[0],user.ageRange[1] + 1)
    // is the age of the user within profiles AgeRange?
    const profileAgeRange = _.inRange(userAge,profile.ageRange[0],profile.ageRange[1] + 1)

    const isUser = user.uid === profile.uid

    return (
      //profile is within user age range AND user is within profile age range
      //(userAgeRange && profileAgeRange) &&

      !isUser
    )
  }).map((profile, index) => {
    if(user.gender == 'female' && counter <= 2 && profile.gender == 'male') {
      counter++
      return profile
    }
    if (user.gender == 'male' && !passedMaleProfile && profile.gender == 'male') {
      passedMaleProfile = true
      return profile
    }

    if(user.gender == 'male' && !passedFemaleProfile && profile.gender == 'female') {
      passedFemaleProfile = true
      return profile
    } 
  })

  return filteredProfiles.filter((profile) => {return (profile != undefined)})
}
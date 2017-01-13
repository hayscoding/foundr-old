import * as _ from 'lodash'
import moment from 'moment'

export default filterProfiles = (profiles, user) => {
  const uniqueProfiles = _.uniqBy(profiles, 'uid') //get unique profiles
  const filteredProfiles = uniqueProfiles.filter((profile) => {
    // User wants to see men and profile is male?
    const userShowMen = user.showMen && profile.gender == 'male'
    // User wants to see women and profile is female?
    const userShowWomen = user.showWomen && profile.gender == 'female'
    // profile wants to see men and user is male?
    const profileShowMen = profile.showMen && user.gender == 'male'
    // profile wants to see women and user is female?
    const profileShowWomen = profile.showWomen && user.gender == 'female'

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
      //user wants to see men and profile is male OR user wants to see women and profile is female
      //(userShowMen || userShowWomen) && 
      //profile wants to see men and user is male OR profile wants to see women and user is female
      //(profileShowMen || profileShowWomen) &&
      //profile is within user age range AND user is within profile age range
      //(userAgeRange && profileAgeRange) &&

      !isUser
    )
  })
  return filteredProfiles
}
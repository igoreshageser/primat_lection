const getUserField = () => {
  return [
    'id',
    'username',
    'first_name',
    'last_name',
    'group',
    'groupId',
    'groupOkr',
    'groupType',
    'groupScheduleUrl',
    'flow',
    'course'
  ]
}

export function createUserData(userData) {
  if (!validator(userData)) {
    throw new Error('Empty userField')
  }

  const newUserObj = {
    tgId: userData.id,
    username: userData.name,
    firstName: userData.first_name,
    secondName: userData.second_name,
    group: userData.group,
    role: 'Student',
    groupId: userData.groupId,
    groupOkr: userData.groupOkr,
    groupScheduleUrl: userData.groupScheduleUrl,
    flow: userData.flow,
    course: userData.course
  }

  return newUserObj
}

function validator(userData) {
  const userField = getUserField()

  const keys = Object.keys(userData)
  const keysCheck = userField.every(key => {
    if (!keys.includes(key)) {
      console.log(key)
      return false
    }
    return true
  })
  const fieldCheck = userField.every(key => userData[key])

  if (!keysCheck) console.log('keys')
  if (!fieldCheck) console.log('field')


  return keysCheck && fieldCheck
}

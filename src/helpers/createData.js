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
    username: userData.username,
    firstName: userData.first_name,
    secondName: userData.last_name,
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
  const keysCheck = userField.every(key => keys.includes(key))
  const fieldCheck = userField.every(key => userData[key])

  if (!keysCheck) console.log('keys')
  if (!fieldCheck) console.log('field')

  return keysCheck && fieldCheck
}

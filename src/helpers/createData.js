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

// TODO create config file

const ROLE = {
  student: 'student',
  abiturient: 'abiturient',
  teacher: 'teacher',
  noKpi: 'nokpi'
}

export function createUserData(userData) {
  if (!validator(userData)) {
    throw new Error('Empty userField')
  }

  return {
    tgId: userData.id,
    username: userData.username,
    firstName: userData.first_name,
    lastName: userData.last_name,
    group: userData.group,
    role: ROLE.student,
    groupId: userData.groupId,
    groupOkr: userData.groupOkr,
    groupScheduleUrl: userData.groupScheduleUrl,
    flow: userData.flow,
    course: userData.course
  }
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

import { ROLES, USER_FIELD } from "../../config/global";

export function createUserData(userData) {
  if (!validator(userData)) {
    throw new Error("Empty userField");
  }

  return {
    tgId: userData.id,
    username: userData.username,
    firstName: userData.first_name,
    lastName: userData.last_name,
    group: userData.group,
    role: ROLES.student,
    groupId: userData.groupId,
    groupOkr: userData.groupOkr,
    groupScheduleUrl: userData.groupScheduleUrl,
    flow: userData.flow,
    course: userData.course
  };
}

function validator(userData) {
  const keys = Object.keys(userData);
  const keysCheck = USER_FIELD.every(key => keys.includes(key));
  const fieldCheck = USER_FIELD.every(key => userData[key]);

  if (!keysCheck) console.log("keys");
  if (!fieldCheck) console.log("field");

  return keysCheck && fieldCheck;
}

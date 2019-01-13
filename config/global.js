const ROLES = {
  student: "student",
  abiturient: "abiturient",
  teacher: "teacher",
  noKpi: "nokpi"
};

const USER_FIELD = [
  "id",
  "username",
  "first_name",
  "last_name",
  "group",
  "groupId",
  "groupOkr",
  "groupType",
  "groupScheduleUrl",
  "flow",
  "course"
];

const MODE = {
  DEV: "development",
  PROD: "production"
};

const USER_KEY_FIELD = "user";

export { ROLES, USER_FIELD, MODE, USER_KEY_FIELD };

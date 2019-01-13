import store from "../store/";
import { USER_KEY_FIELD } from "../../config/global";

const getFromLS = () => {
  const user = localStorage.getItem(USER_KEY_FIELD);
  return JSON.parse(user);
};

const CURRENT_USER_FIELD = "currentUser";

export function getUserInfo(field) {
  const userLocalStorage = getFromLS();

  const user = userLocalStorage || store[CURRENT_USER_FIELD];

  return user[field] || "";
}

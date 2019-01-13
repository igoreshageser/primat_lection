import axios from "axios";
import { SCHEDULE_URL } from "../../.env.js";

export function getSchedule(id, view) {
  const params = { ...view };
  return new Promise((resolve, reject) => {
    axios
      .get(`${SCHEDULE_URL}${id}`, { params })
      .then(({ data }) => resolve(data))
      .catch(err => reject(err));
  });
}

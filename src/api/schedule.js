import axios from 'axios'
import { DEV_KPIBOT_URL } from '../../.env.js'

export function getSchedule(id, view) {
  const params = { ...view }
  return new Promise((resolve, reject) => {
    axios
      .get(`${DEV_KPIBOT_URL}timetable/group/${id}`, { params })
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

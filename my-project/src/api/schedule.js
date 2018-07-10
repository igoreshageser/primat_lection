import axios from 'axios'
import { SCHEDULE_URL } from '../../.env.js'

export function getSchedule() {
  return new Promise((resolve, reject) => {
    axios
      .get(SCHEDULE_URL)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

import axios from 'axios'
import { DEV_KPIBOT_URL } from '../../.env.js'

const entity = 'auth'

/**
 * @deprecated
 * @param {*} tgId
 */
export function getUser(tgId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${DEV_KPIBOT_URL}${entity}/login/${tgId}`)
      .then(d => console.log(d))
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

export function getGroup(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${DEV_KPIBOT_URL}${entity}/group/${id}`)
      .then(d => resolve(d))
      .catch(err => reject(err))
  })
}

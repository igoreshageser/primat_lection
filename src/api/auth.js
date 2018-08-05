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
      .then(({ data }) => resolve(data))
      .catch(err => {
        const { data } = err.response
        if (data === 'User with such telegram id is not registered') {
          resolve('Not found')
        } else {
          reject(err)
          console.log(err)
        }
      })
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

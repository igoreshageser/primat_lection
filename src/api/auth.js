import axios from 'axios'
import qs from 'qs'

import { DEV_KPIBOT_URL } from '../../.env.js'

const entity = 'auth'

/**
 * @param {*} tgId
 */
// export function getUser(tgId) {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(`${DEV_KPIBOT_URL}${entity}/login/${tgId}`)
//       .then(({ data }) => resolve(data))
//       .catch(err => {
//         console.log(err)
//         resolve('Not found')
//         // const { data } = err.response
//         // if (data === 'User with such telegram id is not registered') {
//         //   resolve('Not found')
//         // } else {
//         //   reject(err)
//         //   console.log(err)
//         // }
//       })
//   })
// }

export function getUser(user) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${DEV_KPIBOT_URL}${entity}/login`,
      data: qs.stringify(user),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then(userData => resolve(userData))
      .catch(err => {
        const { status } = err.response
        status === 404 ? resolve({ data: 404 }) : reject(err)
      })
  })
}

export function createUser(userData) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${DEV_KPIBOT_URL}${entity}/`,
      data: qs.stringify(userData),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
      .then(userData => resolve(userData))
      .catch(err => reject(err))
    // .post(`${DEV_KPIBOT_URL}${entity}/`, userData)
    // .then(d => {
    //   console.log(d)
    //   resolve(d)
    // })
    // .catch(err => reject(err))
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

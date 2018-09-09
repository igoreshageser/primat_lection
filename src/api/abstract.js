import axios from 'axios'
import { API_KPIBOT_URL } from '../../.env.js'

const entity = 'api/abstracts/'

/**
 * @param {String} uuid
 * @returns Promise<Object> - Object with info about uuid-entity
 */
export function getAbstractItem(uuid) {
  if (!uuid) {
    throw new Error('"uuid" --  necessarily params!')
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_KPIBOT_URL}${entity}/${uuid}`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

/**
 * @param {Object} param { course: Number, flow: Number, semester: Number}
 * @return Promise<Array>
 * @description - return all lection in current course / flow / semester
 */
export function getAbstractFlowItems(data) {
  return new Promise((resolve, reject) => {
    const params = { ...data }
    axios
      .get(`${API_KPIBOT_URL}${entity}`, { params })
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

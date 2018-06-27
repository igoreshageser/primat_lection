import axios from 'axios'
import { URL } from '../../.env.js'

const entity = 'abstracts/'

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
      .get(`${URL}${entity}/${uuid}`)
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
      .get(`${URL}${entity}`, { params })
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

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
export function getAbstractFlowItems(param) {
  if (!checkAbstractParam(param)) {
    throw new Error('"course", ""flow, "semester" --  necessarily params!')
  }
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}${entity}/${uuid}`, param)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

function checkAbstractParam(param) {
  const neededParam = ['course', 'flow', 'semester']
  return JSON.stringify(neededParam) === JSON.stringify(param)
}

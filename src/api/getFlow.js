import axios from 'axios'
import { URL } from '../../.env.js'

const entity = 'abstracts-info/'

/**
 * @returns Promise<Array>
 * @description  array with all flow
 */
export function getAllFlow() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}${entity}`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

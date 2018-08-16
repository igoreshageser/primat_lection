import axios from 'axios'
import { DEV_KPIBOT_URL } from '../../.env.js'

const entity = 'api/abstracts/info/'

/**
 * @returns Promise<Array>
 * @description  array with all flow
 */
export function getAllFlow() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${DEV_KPIBOT_URL}${entity}`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err))
  })
}

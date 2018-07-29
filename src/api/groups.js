import axios from 'axios'
import { GROUP_URL } from '../../.env.js'

/**
 * @returns Promise<Array>
 * @description  array with all group
 */
export function getAllGroups(data) {
  const params = { ...data }
  return new Promise((resolve, reject) => {
    axios
      .get(`${GROUP_URL}`, { params })
      .then(({ data }) => resolve(data))
      .catch(err => {
        const { message } = err.response.data
        message === 'Group not found' ? resolve([]) : reject(err)
      })
  })
}

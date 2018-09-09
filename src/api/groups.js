import axios from 'axios'
import { API_KPIBOT_URL } from '../../.env.js'

/**
 * @returns Promise<Array>
 * @description  array with all group
 */
export function getAllGroups(group) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API_KPIBOT_URL}/auth/group/${group}`)
      .then(({ data }) => resolve(data))
      .catch(err => {
        const { message } = err.response.data
        message === 'Group not found' ? resolve([]) : reject(err)
      })
  })
}

import axios from 'axios'
import { URL } from '../../.env.js'

const entity = 'auth/'

export function getUser(tgId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${URL}${entity}/login`)
      .then(d => console.log(d))
      .then(() => resolve())
      .catch(err => reject(err))
  })
}

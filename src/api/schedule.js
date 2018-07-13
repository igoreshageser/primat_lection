import axios from 'axios'

const URL = 'https://api.rozklad.org.ua/v2/groups/%D0%BA%D0%B2-51/timetable'

export function getSchedule() {
  return new Promise((resolve, reject) => {
    axios
      .get(URL)
      .then(({ data }) => resolve(data.data))
      .catch(err => reject(err))
  })
}

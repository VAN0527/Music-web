import axios from 'axios'
import { HOST } from './config'

export function getSong (id) {
  const url = `${HOST}/song/detail?ids=${id}`

  return axios.get(url)
}

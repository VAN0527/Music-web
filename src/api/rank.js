import axios from 'axios'
import { HOST } from './config'

export function getRanklistDetail () {
  const url = HOST + '/toplist/detail'

  return axios.get(url)
}

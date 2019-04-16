import axios from 'axios'
import { HOST } from './config'

export function getCatlist () {
  const url = HOST + '/playlist/catlist'

  return axios.get(url)
}

export function getSonglist (cat, offset = 0) {
  const url = `${HOST}/top/playlist?limit=40&cat=${cat}&offset=${offset}`

  return axios.get(url)
}

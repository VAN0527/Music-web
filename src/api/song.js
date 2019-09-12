import axios from 'axios'
import { HOST } from './config'

export function getSong (id) {
  const url = `${HOST}/song/detail?ids=${id}`

  return axios.get(url)
}

export function getLyric (id) {
  const url = `${HOST}/lyric?id=${id}`

  return axios.get(url)
}

export function getUrl (ids) {
  const url = `${HOST}/song/url?id=${ids}`

  return axios.get(url)
}

export function getComment (id) {
  const url = `${HOST}/comment/music?id=${id}`

  return axios.get(url)
}

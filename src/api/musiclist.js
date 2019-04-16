import axios from 'axios'
import { HOST } from './config'

export function getMusicList (id) {
  const url = `${HOST}/playlist/detail?id=${id}`

  return axios.get(url)
}

export function getAlbumSongs (id) {
  const url = `${HOST}/album?id=${id}`

  return axios.get(url)
}

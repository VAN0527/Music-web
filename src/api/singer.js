import axios from 'axios'
import { HOST } from './config'

export function getSingerDesc (id) {
  const url = `${HOST}/artist/desc?id=${id}`

  return axios.get(url)
}

export function getSingerSongsAndDesc (id) {
  const url = `${HOST}/artists?id=${id}`

  return axios.get(url)
}

export function getSingerAlbums (id) {
  const url = `${HOST}/artist/album?id=${id}`

  return axios.get(url)
}

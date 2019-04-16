import axios from 'axios'
import { HOST } from './config.js'

export function getBanner () {
  const url = HOST + '/banner'

  return axios.get(url)
}

export function getRecommend () {
  const url = HOST + '/personalized'

  return axios.get(url)
}

export function getNewMusic () {
  const url = HOST + '/personalized/newsong'

  return axios.get(url)
}

export function getHotSingers () {
  const url = HOST + '/top/artists?limit=10'

  return axios.get(url)
}

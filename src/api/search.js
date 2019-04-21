import { HOST } from './config'
import axios from 'axios'

export function getSearchResult (keyword, type = 1, limit = 30, offset = 0) {
  const url = `${HOST}/search?keywords=${keyword}&limit=${limit}&offset=${offset}&type=${type}`

  return axios.get(url)
}

export function getSearchSuggest (keyword) {
  const url = `${HOST}/search/suggest?limit=5&keywords=${keyword}`

  return axios.get(url)
}

import { HOST } from './config'
import axios from 'axios'

export function getSearchResult (keyword) {
  const url = `${HOST}/search?keywords=${keyword}`

  return axios.get(url)
}

export function getSearchSuggest (keyword) {
  const url = `${HOST}/search/suggest?limit=5&keywords=${keyword}`

  return axios.get(url)
}

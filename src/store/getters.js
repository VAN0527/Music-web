export const isPlay = state => state.isPlay

export const playlist = state => state.playlist

export const list = state => state.list

export const currentIndex = state => state.currentIndex

export const playMode = state => state.playMode

export const randomList = state => state.randomList

export const currentSong = state => {
  return state.playlist[state.currentIndex] || {}
}

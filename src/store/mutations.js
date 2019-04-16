import * as types from './mutations-types'

const mutations = {
  [types.SET_MUSIC_LIST] (state, musicList) {
    state.musicList = musicList
  },
  [types.SET_PLAY] (state, isPlay) {
    state.isPlay = isPlay
  },
  [types.SET_PLAYLIST] (state, playlist) {
    state.playlist = playlist
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAY_MODE] (state, playmode) {
    state.playMode = playmode
  },
  [types.SET_LIST] (state, list) {
    state.list = list
  }
}

export default mutations

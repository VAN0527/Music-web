import * as types from './mutations-types'

function findIndex (list, song) {
  return list.findIndex(item => item.id === song.id)
}

export const insertSong = function ({ commit, state }, song) {
  let list = [...state.list]
  let playlist = [...state.playlist]
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]

  // 查找是否重复
  let fIndex = findIndex(playlist, song)
  // 播放列表插入歌曲
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  // 移除重复歌曲
  if (fIndex > -1) {
    if (fIndex > currentIndex) {
      playlist.splice(fIndex + 1, 1)
    } else {
      playlist.splice(fIndex, 1)
      currentIndex--
    }
  }

  let listIndex = findIndex(list, currentSong)
  let fListIndex = findIndex(list, song)
  list.splice(listIndex, 0, song)

  if (fListIndex > -1) {
    if (fListIndex > listIndex) {
      list.splice(fListIndex + 1, 1)
    } else {
      list.splice(fListIndex, 1)
    }
  }

  commit(types.SET_LIST, list)
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_PLAY, true)
}

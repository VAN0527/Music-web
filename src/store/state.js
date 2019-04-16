import { playMode } from 'utils/config.js'

const state = {
  musicList: [],
  isPlay: false,
  playlist: [],
  list: [],
  currentIndex: -1,
  playMode: playMode.loop
}

export default state

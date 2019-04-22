<template>
  <div class="player" v-show="playlist.length > 0">
    <div class="music-info">
      <div class="cover-img">
        <img 
          v-lazy="currentSong.picUrl" 
          :key="currentSong.picUrl"
        >
      </div>
      <div class="music-text" v-if="currentSong">
        <span>{{currentSong.name}}</span>
        <div class="artists">
          <span
            class="artists-item"
            v-for="artist in currentSong.artists"
            :key="artist.id"
            @click="selectArtist(artist)"
          >
            {{artist.name}}
          </span>
        </div>
      </div>
    </div>
    <div class="control">
      <button @click="prev">
        <i class="icon-shangyishou"></i>
      </button>
      <button @click="togglePlay">
        <i :class="iconPlay"></i>
      </button>
      <button @click="next">
        <i class="icon-xiayishou"></i>
      </button>
    </div>
    <div class="play-message">
      <div class="volume-control">
        <div class="icon">
          <i
            :class="iconVolume" 
            @click="toggleMute"
          ></i>
        </div>
        <Progress
          class="volume-progress"
          :present="volume"
          @progressChange="volumeChange"
        ></Progress>
      </div>
      <div class="duration" v-if="currentSong">
        <span>{{currentTime}} / {{currentSong.duration}}</span>
      </div>
      <div class="more">
        <button @click="changeMode">
          <i :class="iconMode"></i>
        </button>
        <button @click="toPlaylist">
          <i class="icon-bofangliebiao"></i>
        </button>
      </div>
    </div>
    <div class="play-progress">
      <Progress
        :present="progress"
        @progressChange="progressChange" 
      ></Progress>
    </div>
    <audio
      ref="audio"
      :src="currentSong.url"
      @ended="end"
      @timeupdate="timeUpdate"
      @error="error"
    ></audio>
  </div>
</template>

<script>
import Progress from 'components/Progress'
import { mapGetters, mapMutations } from 'vuex'
import { setTimeout, clearTimeout } from 'timers';
import { playMode } from 'utils/config.js'
import { shuffle } from 'utils/common.js'

export default {
  components: {
    Progress
  },
  data () {
    return {
      currentTime: '0:00',
      isMute: false,
      lastVolume: 1,
      volume: 1,
      progress: 0
    }
  },
  computed: {
    iconPlay () {
      return this.isPlay ? 'icon-pause' : 'icon-bofang'
    },
    iconMode () {
      return this.playMode === playMode.loop ? 'icon-reuse' : this.playMode === playMode.random ? 'icon-suijibofang' : 'icon-danquxunhuan'
    },
    iconVolume () {
      return this.isMute ? 'icon-jingyin' : 'icon-yinliang'
    },
    ...mapGetters([
      'isPlay',
      'playlist',
      'currentIndex',
      'playMode',
      'list',
      'currentSong'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id) {
        return
      }

      if (newSong.id === oldSong.id) {
        return
      }

      clearTimeout(this.timer)

      if (this.isPlay) {
        this.timer = setTimeout(() => {
          this.$refs.audio.play()
        }, 1000)
      }
    },
    isPlay (newIsPlay) {
      this.$nextTick(() => {
        const audio = this.$refs.audio
        newIsPlay ? audio.play() : audio.pause()
      })
    },
    volume (newVolme) {
      if (newVolme === 0) {
        this.isMute = true
      } else {
        this.isMute = false
      }
    }
  },
  methods: {
    togglePlay () {
      this.setPlay(!this.isPlay)
    },
    changeMode () {
      const mode = (this.playMode + 1) % 3
      const song = this.currentSong

      let list
      if (mode === playMode.random) {
        list = shuffle(this.list)
      } else {
        list = this.list
      }

      this.setPlayMode(mode)
      this.setPlayList(list)
      this.$_resetCurrentIndex(list, song)
    },
    next () {
      if (this.playlist.length === 1) {
        this.$_loop()
        return
      } else {
        let newIndex = this.currentIndex + 1
        if (this.currentIndex === this.playlist.length - 1) {
          newIndex = 0
        }

        this.setCurrentIndex(newIndex)
      }
    },
    prev () {
      if (this.playlist.length === 1) {
        this.$_loop()
        return
      } else {
        let newIndex = this.currentIndex - 1

        if (this.currentIndex === 0) {
          newIndex = this.playlist.length - 1
        }

        this.setCurrentIndex(newIndex)
        }
    },
    end () {
      if (this.playMode === playMode.single) {
        this.$_loop()
      } else {
        this.next()
      }
    },
    error () {
      if (this.playlist === 1) {
        this.$refs.audio.pause()
        this.isPlay = false
        return
      }
      this.next()
    },
    timeUpdate (e) {
      this.currentTime = this.$_formateTime(e.target.currentTime)
      this.progress = e.target.currentTime / this.$refs.audio.duration
    },
    toggleMute () {
      this.isMute = !this.isMute
      if (this.isMute) {
        this.lastVolume = this.$refs.audio.volume
        this.$refs.audio.volume = 0
        this.volume = 0
      } else {
        this.$refs.audio.volume = this.lastVolume
        this.volume = this.lastVolume
      }
    },
    volumeChange (present, target) {
      this.$refs.audio.volume= present
      this.volume = present
    },
    progressChange (present, target) {
      const audio = this.$refs.audio
      audio.currentTime = audio.duration * present
    },
    selectArtist (artist) {
      this.$router.push({
        path: `/singer/${artist.id}`
      })
    },
    toPlaylist () {
      this.$router.push({
        path: '/playlist'
      })
    },
    $_loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
    },
    $_formateTime (time) {
      let min = Math.floor(time / 60)
      let sec = Math.floor(time % 60)

      if (sec <10) {
        sec = '0' + sec
      }

      return `${min}:${sec}`
    },
    $_resetCurrentIndex (list, song) {
      let index = list.findIndex(item => item.id === song.id)
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      'setCurrentIndex': 'SET_CURRENT_INDEX',
      'setPlay': 'SET_PLAY',
      'setPlayMode': 'SET_PLAY_MODE',
      'setPlayList': 'SET_PLAYLIST'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.player {
  position: relative;
  height: 80px;
  width: 100%;
  background-color: rgb(17, 17, 17);
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .music-info {
    display: flex;
    align-items: center;
    margin-left: 50px;

    .cover-img {
      width: 60px;
      height: 60px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .music-text {
      @include no-wrap;

      span {
        display: block;
        margin: 10px 5px;
      }

      .artists {
        display: flex;
        .artists-item {
          cursor: pointer;
          &:hover {
            color: $text-hover-color;
          }
        }
      }
    }
  }

  .control {
    display: flex;
    justify-content: center;
  }

  .play-message {
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    align-items: center;

    .duration {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }

    .volume-control {
      display: flex;
      align-items: center;
      margin-right: 10px;
      width: 130px;
      height: 100%;
      font-size: 26px;

      i {
        display: inline-block;
        width: 30px;
        height: 30px;
        cursor: pointer;
        &:hover {
          color: $text-hover-color;
        }
      }

      .volume-progress {
        margin-left: 8px;
      }
    }
  }
  
  button {
    margin-left: 10px;
    padding: 0;
    border: none;
    background-color: transparent;
    color: #fff;
    cursor: pointer;
    font-size: 40px;
    outline: none;

    &:hover {
      color: $text-hover-color;
    }
  }

  .play-progress {
    position: absolute;
    top: -16px;
    left: 0;
    width: 100%;
    align-self: flex-start;
  }
}
</style>

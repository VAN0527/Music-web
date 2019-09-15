<template>
  <div class="player clearfix" v-if="playlist.length > 0">
    <div class="player-wrapper">
      <div class="music-info">
        <div class="cover-img">
          <img 
            v-lazy="currentSong.picUrl" 
            :key="currentSong.picUrl"
            @click="selectSong"
          >
        </div>
        <div class="music-text" v-if="currentSong">
          <span @click="selectSong">{{currentSong.name}}</span>
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
        <div class="btn">
          <i 
            class="icon-shangyishou"
            @click="prev"
          ></i>
        </div>
        <div class="btn">
          <i
            :class="iconPlay"
            @click="togglePlay"
          ></i>
        </div>
        <div class="btn">
          <i 
            class="icon-xiayishou"
            @click="next"
          ></i>
        </div>
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
          <div class="btn">
            <i 
              :class="iconMode" 
              @click="changeMode"
            ></i>
          </div>
          <div class="btn">
            <i 
              class="icon-bofangliebiao" 
              @click="toPlaylist"
            ></i>
          </div>
        </div>
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
import { setTimeout, clearTimeout } from 'timers'
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
      if (!newSong.id || newSong.id === oldSong.id) return
      
      this.$nextTick(() => {
        if (this.isPlay) {
          this.$refs.audio.play()
        }
      })
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
      this.$refs.audio.pause()
      this.isPlay = false
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
        path: '/singer/songs',
        query: {
          id: artist.id
        }
      })
    },
    selectSong () {
      this.$router.push({
        path: '/songdetail',
        query: {
          id: this.currentSong.id
        }
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
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100%;
  background-color: $bg-color;
  color: $color-primary;

  .player-wrapper {
    @include wrap-center;

    .music-info {
      float: left;
      box-sizing: border-box;
      padding: 0 5px;
      width: 30%;
      @include no-wrap;

      .cover-img {
        float: left;
        width: 30%;
        height: 80px;
        line-height: 80px;
        text-align: center;

        img {
          width: 70px;
          height: 70px;
          border-radius: 10px;
          vertical-align: middle;
        }
      }

      .music-text {
        float: left;
        width: 70%;
        height: 80px;
        line-height: 40px;
        @include no-wrap;

        .artists {
          width: 100%;
          font-size: 1em;
          @include no-wrap;

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
      float: left;
      width: 40%;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;

      .btn {
        margin-top: -5px;
        font-size: 2.5em;
      }
    }

    .play-message {
      float: left;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 30%;
      height: 80px;

      .duration {
        display: flex;
        align-items: center;
      }

      .volume-control {
        margin: 0 2px;
        display: flex;
        align-items: center;
        margin-right: 10px;
        width: 40%;
        height: 100%;
        font-size: 26px;
        text-align: center;

        .icon {
          display: inline-block;
          width: 30px;
          height: 30px;
          cursor: pointer;

          &:hover {
            color: $text-hover-color;
          }
        }

        .volume-progress {
          margin-left: 10px;
          width: 100px;
          display: flex;
        }
      }
    }
    
    .btn {
      margin: 0 3px;
      padding: 0;
      display: inline-block;
      border: none;
      font-size: 2em;
      background-color: transparent;
      color: $color-primary;
      cursor: pointer;
      outline: none;

      &:hover {
        color: $text-hover-color;
      }
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

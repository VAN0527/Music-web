<template>
  <div class="playlist-wrapper">
    <h2>播放列表</h2>
    <div class="playlist-info clearfix">
      <span 
        class="clear" 
        @click="clearPlaylist"
      >
        清空播放列表
      </span>
      <span>歌曲数: {{ list.length }}</span>
    </div>
    <div class="playlist">
      <div class="currentSong-info">
        <img :src="currentSong.picUrl">
        <div>
          <span>{{ currentSong.name }}</span>
          <span
            v-for="(artist, index) in currentSong.artists"
            :key="index"
          >
            {{ artist.name }}
          </span>
        </div>
        <div class="lyric">
          <p v-html="this.lyric" v-if="list.length > 0"></p>
        </div>
      </div>
      <div class="playlist-content">
        <div 
          class="playlist-item clearfix"
          :class="currentSong.id === song.id ? 'active' : ''"
          v-for="song in list"
          :key="song.id"
        >
          <span
            class="play icon-bofang"
            @click="playSong(song)"
          >
          </span>
          <div class="song">
            <span class="name">{{ song.name }} - </span>
            <span
              class="artists"
              v-for="(artist, index) in song.artists"
              :key="index"
            >
              {{ artist.name }}
            </span>
          </div>
          <span
            class="delete icon-delete"
            @click="deleteSong(song)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getLyric } from 'api/song'

export default {
  data () {
    return {
      lyric: ''
    }
  },
  computed: {
    ...mapGetters([
      'list',
      'currentSong'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (newSong.id) {
        this._getLyric(newSong)
      }
    }
  },
  created () {
    if (this.list.length > 0) {
      this._getLyric(this.currentSong)
    }
  },
  methods: {
    clearPlaylist () {
      this.clearPlaylist()
    },
    playSong (song) {
      this.playSong(song)
    },
    deleteSong (song) {
      this.deleteSong(song)
    },
    _getLyric (song) {
      if (song.lyric) {
        this.lyric = song.lyric
      } else {
        getLyric(song.id).then(res => {
          if (res.status === 200) {
            if (!res.data.nolyric) {
              const lyric = res.data.lrc.lyric.replace(/\[.+\]/g, '<br/>')
              this.lyric = lyric
              this.currentSong.lyric = lyric
            }
          }
        })
      }
    },
    ...mapActions([
      'clearPlaylist',
      'playSong',
      'deleteSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.playlist-wrapper {
  @include wrap-center;

  h2 {
    text-align: center;
    font-size: 2em;
    font-weight: 100;
  }

  .playlist-info {
    padding: 0 0 5px 10px;
    font-size: 1.3em;
    text-align: right;

    span {
      padding: 0 10px;
    }

    .clear {
      cursor: pointer;

      &:hover {
        color: $text-hover-color;
      }
    }
  }

  .playlist {
    .currentSong-info {
      float: left;
      width: 300px;
      text-align: center;

      img {
        width: 100%;
        border-radius: 10px;
      }

      span {
        padding: 2px 0;
        display: block;
        font-size: 1.5em;
      }

      .lyric {
        p {
          margin: 0;
          line-height: 1.5em;
        }
      }
    }

    .playlist-content {
      margin-left: 320px;
      font-size: 1.2em;

      .playlist-item {
        height: 2em;
        line-height: 2em;
        border-bottom: 1px solid rgba(185, 185, 185, 0.5);

        &:last-child {
          border-bottom: none;
        }

        &.active {
          background-color: $bg-color;
          color: $color-primary;
        }

        .play {
          padding: 0 5px;
          font-size: 1.4em;
          display: inline-block;
          vertical-align: middle;

          &:hover {
            color: $text-hover-color;
            cursor: pointer;
          }
        }

        .song {
          @include no-wrap;
          width: 700px;
          display: inline-block;
          // inline-block元素设置overflow:hidden属性导致相邻行内元素向下偏移
          vertical-align: bottom;
          // end
        }

        .delete {
          float: right;

          &:hover {
            color: $text-hover-color;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>

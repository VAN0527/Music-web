<template>
  <div class="playlist-wrapper">
    <h2>播放列表</h2>
    <div class="playlist">
      <div class="clear">
        <span @click="clearPlaylist">清空播放列表</span>
      </div>
      <div class="playlist">
        <div
          class="playlist-item"
          :class="[song.id === currentSong.id ? 'active' : '']"
          v-for="song in list"
          :key="song.id"
        >
          <div class="item-info">
            <span class="name">{{song.name}} - </span>
            <span
              class="artists"
              v-for="artist in song.artists"
            >
              {{artist.name}}
            </span>
            <span class="duration">{{song.duration}}</span>
          </div>
          <div class="item-control">
            <i
              class="icon-bofang play"
              @click="playSong(song)"
            ></i>
            <i class="icon-shoucang"></i>
            <i
              class="icon-delete delete"
              @click="deleteSong(song)"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'list',
      'currentSong'
    ])
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

.playlist-wrapper {
  h2 {
    text-align: center;
    font-size: 32px;
    font-weight: 100;
  }

  .clear {
    margin-bottom: 5px;
    font-size: 22px;
    cursor: default;
    
    span {
      cursor: pointer;
      &:hover {
        color: $text-hover-color;
      }
    }
  }

  .playlist {
    .playlist-item {
      padding: 10px;
      border-bottom: 1px solid #fff;
      font-size: 20px;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        background: $hover-bg-color;
        color: #000;
      }

      .item-info {
        padding: 4px 0;

        .duration {
          float: right;
        }
      }

      .item-control {
        i {
          margin: 0 4px;
          cursor: pointer;
        }

        .play {
          &:hover {
            color: $text-hover-color;
          }
        }

        .delete {
          &:hover {
            color: red;
          }
        }
      }
    }
  }
}
</style>

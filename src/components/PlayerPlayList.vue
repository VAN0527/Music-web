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
          <div class="item-info clearfix">
            <div class="info">
              <span class="name">{{song.name}}</span>
              <div class="artists">
                <span v-for="artist in song.artists">
                  {{artist.name}}
                </span>
              </div>
            </div>
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
@import 'styles/mixin.scss';

.playlist-wrapper {
  @include wrap-center;

  h2 {
    text-align: center;
    font-size: 2em;
    font-weight: 100;
  }

  .clear {
    padding: 0 0 5px 10px;
    font-size: 1.3em;
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
      padding: 5px 10px;
      border-bottom: 1px solid #fff;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        background: $hover-bg-color;
        color: #000;
      }

      .item-info {
        padding: 4px 0;
        height: 40px;
        
        .info {
          float: left;
          width: 70%;
          line-height: 20px;
          @include no-wrap;
        }
        
        .duration {
          float: right;
          line-height: 40px;
        }
      }

      .item-control {
        font-size: 1.3em;
        
        i {
          padding: 0 4px 0 0;
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

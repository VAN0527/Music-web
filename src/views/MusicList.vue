<template>
  <div class="musiclist">
    <div class="musiclist-wrapper" v-show="!loading">
      <div class="list-info clearfix">
        <div class="cover">
          <img 
            v-lazy="data.picUrl" 
            :key="data.picUrl"
          >
        </div>
        <div class="info">
          <h2 class="title">{{data.title}}</h2>
          <div class="btns">
            <div 
              class="btn"
              @click.stop="playAllList(playList)"
            >
              <span>PLAY</span>
            </div>
          </div>
          <p class="creater">创建者: {{data.creator}}</p>
          <p class="desc">简介: {{data.description}}</p>
        </div>
      </div>
      <div class="playlist-wrapper">
        <PlayList
          :list="data.songs"
          @select="selectSong"
        ></PlayList>
      </div>
    </div>
    <div class="loading">
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import PlayList from 'components/PlayList'
import Loading from 'components/Loading'
import { mapActions, mapGetters } from 'vuex'
import { getMusicList, getAlbumSongs } from 'api/musiclist.js'
import { getUrl } from 'api/song.js'
import { formatDuration, formatArtists } from 'utils/song.js'

export default {
  components: {
    PlayList,
    Loading
  },
  props: {
    albums: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: {},
      loading: true
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    },
    playList () {
      return this.data.songs.filter(song => song.url !== '')
    },
    canPlayAll () {
      return !this.data.songs.every(song => song.url === '')
    },
    ...mapGetters([
      'currentSong'
    ])
  },
  created () {
    this.$_getData()
  },
  watch: {
    '$route' () {
      this.$_getData()
    }
  },
  methods: {
    playAllList (list) {
      if (this.canPlayAll) {
        this.playAll(list)
      } else {
        alert ('此列表歌曲无法播放')
      }
    },
    selectSong (song) {
      if (song.url === '') {
        alert('此歌曲无法播放')
      } else {
        if (this.currentSong.id === song.id) return
        this.insertSong(song)
      }
    },
    $_getMusicList () {
      getMusicList(this.id)
        .then(res => {
          if (res.status === 200) {
            const musiclist = res.data.playlist
            this.data = this.$_formatMusicList(musiclist)
          }
        })
        .then(() => this.$_getUrl())
        .then(() => this.loading = false)
    },
    $_getAlbumSongs () {
      getAlbumSongs(this.id)
        .then(res => {
          if (res.status === 200) {
            const album = res.data
            this.data = this.$_formatAlbum(album)
          }
        })
        .then(() => this.$_getUrl())
        .then(() => this.loading = false)
    },
    $_formatMusicList (musiclist) {
      return {
        songs: this.$_formatSong(musiclist.tracks),
        title: musiclist.name,
        creator: musiclist.creator.nickname,
        description: musiclist.description,
        picUrl: `${musiclist.coverImgUrl}?param=400y400`,
      }
    },
    $_formatAlbum (album) {
      return {
        id: album.id,
        title: album.album.name,
        creator: album.album.artist.name,
        picUrl: `${album.album.picUrl}?param=400y400`,
        songs: this.$_formatSong(album.songs),
      }
    },
    $_formatSong (list) {
      return list.map(item => {
        return {
          id: item.id,
          name: item.name,
          artists: formatArtists(item.ar),
          duration: formatDuration(item.dt),
          picUrl: `${item.al.picUrl}?param=400y400`,
          url: '' 
        }
      })
    },
    $_getUrl () {
      const ids = this.data.songs.map(song => song.id).join()
      return getUrl(ids).then(res => {
        let data = {}
        res.data.data.forEach(item => {
          data[item.id] = item.url
        })
        this.data.songs.map(song => song.url = data[song.id] || '')
      })
    },
    $_getData () {
      if (this.albums) {
        this.$_getAlbumSongs()
      } else {
        this.$_getMusicList()
      }
    },
    ...mapActions([
      'insertSong',
      'playAll'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.musiclist {
  .musiclist-wrapper {
    padding-top: 20px;
    @include wrap-center;

    .list-info {
      float: left;
      width: 300px;
      .cover {
        text-align: center;

        img {
          height: 250px;
          width: 250px;
          border-radius: 10px;
        }
      }

      .info {
        text-align: center;
        
        .title {
          font-size: 1.3em;
          font-weight: 400;
        }

        .btns {
          .btn {
            margin: 0 5px;
            padding: 5px 2em;
            display: inline-block;
            border-radius: 9999999999px;
            border: none;
            background-color: $text-hover-color;
            color: $color-primary;
            cursor: pointer;
            outline: none;
            
            &:hover {
              color: #000;
            }
          }
        }

        .desc {
          text-align: left;
          overflow: hidden;
        }
      }
    }

    .playlist-wrapper {
      margin-left: 300px;
    }
  }
}
</style>

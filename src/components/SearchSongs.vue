<template>
  <div class="songs">
    <div class="songlist" v-show="!loading">
      <ul>
        <li class="songlist-item clearfix">
          <div class="name">
            <span>歌曲名</span>
          </div>
          <div class="artists">
            <span>歌手</span>
          </div>
          <div class="albums">
            <span>专辑</span>
          </div>
          <div class="duration">
            <span>时长</span>
          </div>
        </li>
        <li
          class="songlist-item clearfix"
          :class="{'not-play': song.url === ''}"
          v-for="song in songs"
          :key="song.id"
        >
          <div class="name">
            <i
              class="icon-bofang play"
              @click="play(song)"
            ></i>
            <span @click="selectSong(song.id)">{{song.name}}</span>
          </div>
          <div class="artists">
            <span 
              v-for="artist in song.artists"
              :key="artist.id"
              @click="selectArtist(artist.id)"
            >
              {{artist.name}}
            </span>
          </div>
          <div class="albums">
            <span @click="selectAlbum(song.album.id)">{{song.album.name}}</span>
          </div>
          <div class="duration">
            <span>{{song.duration}}</span>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <Pagination 
          :pageCount="pageCount" 
          @selectPage="selectPage"
        ></Pagination>
      </div>
    </div>
    <div class="loading">
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import Loading from 'components/Loading'
import Pagination from 'components/Pagination'
import { getSearchResult } from 'api/search.js'
import { getSong, getUrl } from 'api/song.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapActions } from 'vuex'
import { SEARCH_LIMIT } from 'utils/config'

export default {
  components: {
    Loading,
    Pagination
  },
  data () {
    return {
      songs: [],
      loading: true,
      pageCount: 0
    }
  },
  watch: {
    '$route' () {
      this.$_getSearchResult()
    }
  },
  created () {
    this.$_getSearchResult()
  },
  methods: {
    play (song) {
      if (song.url === '') {
        alert('此歌曲无法播放')
      } else {
        this.insertSong(song)
      }
    },
    selectSong (id) {
      this.$router.push({
        path: '/songdetail',
        query: {
          id
        }
      })
    },
    selectArtist(id) {
      this.$router.push({
        path: '/singer',
        query: {
          id
        }
      })
    },
    selectAlbum (id) {
      this.$router.push({
        path: '/album',
        query: {
          id
        }
      })
    },
    selectPage (page) {
      const offset = (page - 1) * SEARCH_LIMIT
      this.loading = true
      this.$_getSearchResult(offset)
    },
    $_getSearchResult (offset = 0) {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type, SEARCH_LIMIT, offset)
        .then(res => {
          if (res.status === 200) {
            this.songs = this.$_formatSongList(res.data.result.songs)
            this.pageCount = Math.ceil(res.data.result.songCount / SEARCH_LIMIT)
          }
        })
        .then(() => this.$_getSong())
        .then(() => this.$_getUrl())
        .then(() => this.loading = false)
    },
    $_getSong () {
      const ids = this.songs.map(song => song.id).join()
      return getSong(ids)
        .then(res => {
          if (res.status === 200) {
            let data = {}
            res.data.songs.forEach(item => {
              data[item.id] = this.$_formatSong(item)
            })

            console.log(this.songs.map(song => {
              let s = data[song.id]
              song.duration = s.duration
              song.picUrl = s.picUrl
            }))
          }
        })
    },
    $_getUrl () {
      const ids = this.songs.map(song => song.id).join()
      return getUrl(ids).then(res => {
        if (res.status === 200) {
          let data = {}
          res.data.data.forEach(item => {
            data[item.id] = item.url
          })
          // console.log(this.songs.map(song => song.url = data[song.id] || ''))
        }
      })
    },
    $_formatSongList (list) {
      return list.map(item => {
        return {
          id: item.id,
          name: item.name,
          duration: formatDuration(item.duration),
          artists: formatArtists(item.artists),
          album: {
            id: item.album.id,
            name: item.album.name
          }
        }
      })
    },
    $_formatSong (song) {
      return {
        id: song.id,
        name: song.name,
        artists: formatArtists(song.ar),
        duration: formatDuration(song.dt),
        picUrl: `${song.al.picUrl}?param=400y400`,
        url: ''
      }
    },
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.songs {
  font-size: 1em;

  .songlist {
    .songlist-item {
      height: 30px;
      padding: 5px;
      border-bottom: 1px solid rgba(185, 185, 185, 0.5);
      line-height: 30px;
      
      &:first-child {
        span {
          cursor: auto !important;
          &:hover {
            color: #000 !important;
          }
        }
      }

      &:first-child,
      &:last-child {
        border-bottom: none;
      }

      &.not-play {
        color: rgb(120, 120, 120)
      }
      
      div {
        float: left;
        @include no-wrap;
      }

      .name {
        width: 45%;

        .play {
          margin-right: 5px;
          font-size: 1.5em;
          vertical-align: middle;
          cursor: pointer;

          &:hover {
            color: $text-hover-color;
          }
        }

        span {
          cursor: pointer;

          &:hover {
            color: $text-hover-color;
          }
        }
      }

      .albums,
      .artists,
      .duration {
        width: 18.3333%;
        text-align: center;
      }

      .albums,
      .artists,
      .name{
        span {
          cursor: pointer;
          
          &:hover {
            color: $text-hover-color;
          }
        }
      }
    }

    .pagination {
      padding: 10px;
      text-align: center;
    }
  }
}
</style>

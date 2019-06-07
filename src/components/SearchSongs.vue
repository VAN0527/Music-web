<template>
  <div class="songs">
    <ul class="songlist">
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
        v-for="song in songs"
        :key="song.id"
      >
        <div class="name">
          <i
            class="icon-bofang play"
            @click="play(song.id)"
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
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import Loading from 'components/Loading'
import { getSearchResult } from 'api/search.js'
import { getSong } from 'api/song.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapActions } from 'vuex'

export default {
  components: {
    Loading
  },
  data () {
    return {
      songs: [],
      loading: true
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
    play (id) {
      this.$_getSong(id).then(song => {
        this.insertSong(song)
      })
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
    $_getSearchResult () {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type).then(res => {
        if (res.status === 200) {
          this.songs = this.$_formatSongList(res.data.result.songs)
          this.loading = false
        }
      })
    },
    $_getSong (id) {
      return getSong(id).then(res => {
        if (res.status === 200) {
          return this.$_formatSong(res.data.songs[0])
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
        url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
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
  }
}
</style>

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
          <span>{{song.name}}</span>
        </div>
        <div class="artists">
          <span 
            v-for="artist in song.artists"
            :key="artist.id"
          >
            {{artist.name}}
          </span>
        </div>
        <div class="albums">
          <span>{{song.album.name}}</span>
        </div>
        <div class="duration">
          <span>{{song.duration}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchResult } from 'api/search.js'
import { getSong } from 'api/song.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      songs: []
    }
  },
  watch: {
    '$route' () {
      this.$_getSearchResult()
    }
  },
  mounted () {
    this.$_getSearchResult()
  },
  methods: {
    play (id) {
      this.$_getSong(id).then(song => {
        this.insertSong(song)
      })
    },
    $_getSearchResult () {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type).then(res => {
        if (res.status === 200) {
          this.songs = res.data.result.songs.map(song => {
            return {
              id: song.id,
              name: song.name,
              duration: formatDuration(song.duration),
              artists: formatArtists(song.artists),
              album: {
                id: song.album.id,
                name: song.album.name
              }
            }
          })
        }
      })
    },
    $_getSong (id) {
      return getSong(id).then(res => {
        if (res.status === 200) {
          const data = res.data.songs[0]
          const song = {
            id: data.id,
            name: data.name,
            artists: formatArtists(data.ar),
            duration: formatDuration(data.dt),
            picUrl: `${data.al.picUrl}?param=600y600`,
            url: `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
          }
          return song
        }
      })
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
      height: 1.6em;
      padding: 5px;
      border-bottom: 1px solid #fff;
      line-height: 1.6em;

      &:first-child {
        padding-left: 1em;
      }

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
      }

      .albums,
      .artists,
      .duration {
        width: 18.3333%;
        text-align: center;
      }
    }
  }
}
</style>
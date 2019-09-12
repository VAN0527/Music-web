<template>
  <div class="songs">
    <div 
      class="all-play"
      @click="playAllList(playList)"
    >
      <i class="icon-bofang"></i>
      <span> 全部播放</span>
    </div>
    <PlayList
      :list="songs"
      @select="selectItem"
    ></PlayList>
  </div>
</template>

<script>
import PlayList from 'components/PlayList'
import { getSingerSongsAndDesc } from 'api/singer.js'
import { getUrl } from 'api/song.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapActions } from 'vuex'

export default {
  components: {
    PlayList
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    playList () {
      return this.songs.filter(song => song.url !== '')
    }
  },
  watch: {
    '$route' () {
      this.$_getSingerSongs()
    }
  },
  created () {
    this.$_getSingerSongs()
  },
  methods: {
    playAllList (list) {
      this.playAll(list)
    },
    selectItem (song) {
      if (song.url === '') {
        alert('此歌曲无法播放')
      } else {
        this.insertSong(song)
      }
    },
    $_getSingerSongs () {
      getSingerSongsAndDesc(this.$route.query.id)
        .then(res => {
          if (res.status === 200) {
            this.songs = this.$_formatSongs(res.data.hotSongs)
          }
        })
        .then(() => this.$_getUrl())
    },
    $_formatSongs (songs) {
      return songs.map(item => {
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
      const ids = this.songs.map(song => song.id).join()
      return getUrl(ids).then(res => {
        if (res.status === 200) {
          let data = {}
          res.data.data.forEach(item => {
            data[item.id] = item.url
          })
          this.songs.map(song => song.url = data[song.id] || '')
        }
      })
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

.songs {
  .all-play {
    margin: 5px 0;
    padding: 0 10px;
    display: inline-block;
    font-size: 1.2em;
    font-weight: 700;
    cursor: pointer;
    
    &:hover {
      color: $text-hover-color;
    }
  }
}
</style>

<template>
  <div class="songs">
    <div 
      class="all-play"
      @click="playAll(songs)"
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
import PlayList from 'components/PlayList.vue'
import { getSingerSongsAndDesc } from 'api/singer.js'
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
  watch: {
    '$route' () {
      this.$_getSingerSongs()
    }
  },
  created () {
    this.$_getSingerSongs()
  },
  methods: {
    selectItem (item) {
      this.insertSong(item)
    },
    $_getSingerSongs () {
      getSingerSongsAndDesc(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.songs = this.$_formatSongs(res.data.hotSongs)
        }
      })
    },
    $_formatSongs (songs) {
      return songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          artists: formatArtists(item.ar),
          duration: formatDuration(item.dt),
          picUrl: `${item.al.picUrl}?param=400y400`,
          url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
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
    cursor: pointer;
    
    &:hover {
      color: $text-hover-color;
    }
  }
}
</style>

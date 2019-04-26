<template>
  <div class="songlist">
    <List
      :list="songlist"
      @select="selectSongList"
    ></List>
  </div>
</template>

<script>
import List from 'components/List'
import { getSearchResult } from 'api/search.js'

export default {
  components: {
    List
  },
  data () {
    return {
      songlist: []
    }
  },
  mounted () {
    this.$_getSearchResult()
  },
  methods: {
    selectSongList (songlist) {
      this.$router.push({
        path: `/musiclist/${songlist.id}`
      })
      //this.setMusicList(songlist)
    },
    $_getSearchResult () {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type).then(res => {
        if (res.status === 200) {
          this.songlist = res.data.result.playlists.map(playlist => {
            return {
              id: playlist.id,
              name: playlist.name,
              picUrl: `${playlist.coverImgUrl}?param=400y400`
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.songlist {
  margin-top: 1em;
}
</style>

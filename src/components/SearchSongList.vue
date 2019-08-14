<template>
  <div class="songlist">
    <List
      :list="songlist"
      @select="selectSongList"
      v-show="!this.loading"
    ></List>
    <div class="loading">
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import List from 'components/List'
import Loading from 'components/Loading'
import { getSearchResult } from 'api/search.js'

export default {
  components: {
    List,
    Loading
  },
  data () {
    return {
      songlist: [],
      loading: true
    }
  },
  created () {
    this.$_getSearchResult()
  },
  methods: {
    selectSongList (songlist) {
      this.$router.push({
        path: `/musiclist/${songlist.id}`
      })
    },
    $_getSearchResult () {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type).then(res => {
        if (res.status === 200) {
          this.songlist = this.$_formatList(res.data.result.playlists)
          this.loading = false
        }
      })
    },
    $_formatList (list) {
      return list.map(item => {
        return {
          id: item.id,
          name: item.name,
          picUrl: `${item.coverImgUrl}?param=400y400`
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

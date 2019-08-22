<template>
  <div class="songlist">
    <div v-show="!this.loading">
      <List
        :list="songlist"
        @select="selectSongList"
      ></List>
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
import List from 'components/List'
import Pagination from 'components/Pagination'
import Loading from 'components/Loading'
import { getSearchResult } from 'api/search.js'
import { SEARCH_LIMIT } from 'utils/config.js'

export default {
  components: {
    List,
    Pagination,
    Loading
  },
  data () {
    return {
      songlist: [],
      loading: true,
      pageCount: 0
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
    selectPage (page) {
      const offset = (page - 1) * SEARCH_LIMIT
      this.loading = true
      this.$_getSearchResult(offset)
    },
    $_getSearchResult (offset = 0) {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type, SEARCH_LIMIT, offset).then(res => {
        if (res.status === 200) {
          this.songlist = this.$_formatList(res.data.result.playlists)
          this.pageCount = Math.ceil(res.data.result.playlistCount / SEARCH_LIMIT)
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

  .pagination {
    padding: 10px;
    text-align: center;
  }
}
</style>

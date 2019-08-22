<template>
  <div class="albums">
    <div v-show="!loading">
      <List
        :list="albums"
        @select="selectAlbum"
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
import Loading from 'components/Loading'
import Pagination from 'components/Pagination'
import { getSearchResult } from 'api/search.js'
import { formatAlbums } from 'utils/song.js'
import { SEARCH_LIMIT } from 'utils/config.js'

export default {
  components: {
    List,
    Pagination,
    Loading
  },
  data () {
    return {
      albums: [],
      loading: true,
      pageCount: 0
    }
  },
  created () {
    this.$_getSearchResult()
  },
  methods: {
    selectAlbum (album) {
      this.$router.push({
        path: `/album/${album.id}`
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
          this.albums = formatAlbums(res.data.result.albums)
          this.pageCount = Math.ceil(res.data.result.albumCount / SEARCH_LIMIT)
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.albums {
  margin-top: 1em;

  .pagination {
    padding: 10px;
    text-align: center;
  }
}
</style>

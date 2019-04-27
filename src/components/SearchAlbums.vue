<template>
  <div class="albums clearfix">
    <List
      :list="albums"
      @select="selectAlbum"
    ></List>
  </div>
</template>

<script>
import List from 'components/List'
import { getSearchResult } from 'api/search.js'
import { formatAlbums } from 'utils/song.js'

export default {
  components: {
    List
  },
  data () {
    return {
      albums: []
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
    $_getSearchResult () {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type).then(res => {
        if (res.status === 200) {
          this.albums = formatAlbums(res.data.result.albums)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.albums {
  margin-top: 1em;
}
</style>

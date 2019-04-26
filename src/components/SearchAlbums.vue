<template>
  <div class="albums clearfix">
    <List
      :list="albums"
      @select="selectAlbum"
    ></List>
  </div>
</template>

<script>
import { getSearchResult } from 'api/search.js'
import List from 'components/List'

export default {
  components: {
    List
  },
  data () {
    return {
      albums: []
    }
  },
  mounted () {
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
          this.albums = res.data.result.albums.map(album => {
            return {
              id: album.id,
              name: album.name,
              artist: album.artist,
              picUrl: `${album.picUrl}?param=400y400`
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.albums {
  margin-top: 1em;
}
</style>

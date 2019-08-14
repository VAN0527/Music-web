<template>
  <div class="albums">
    <List 
      :list="albums" 
      @select="selectAlbum"
    ></List>
    <div class="loading">
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import List from 'components/List'
import Loading from 'components/Loading'
import { getSingerAlbums } from 'api/singer.js'
import { formatAlbums } from 'utils/song.js'

export default {
  components: {
    List,
    Loading
  },
  data () {
    return {
      albums: [],
      loading: true
    }
  },
  watch: {
    '$route' () {
      this.$_getSingerAlbums()
    }
  },
  created () {
    this.$_getSingerAlbums()
  },
  methods: {
    selectAlbum (album) {
      this.$router.push({
        path: '/album',
        query: {
          id: album.id
        }
      })
    },
    $_getSingerAlbums () {
      getSingerAlbums(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.albums = formatAlbums(res.data.hotAlbums)
          this.loading = false
        }
      })
    }
  }
}
</script>

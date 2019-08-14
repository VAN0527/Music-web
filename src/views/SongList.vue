<template>
  <div class="songlist">
    <div class="catlist-wrapper">
      <SongListCategory @select="selectItem"></SongListCategory>
    </div>
    <div class="songlist-wrapper" v-show="!loading">
      <List 
        :list="songlist" 
        @select="selectSongList"
      ></List>
    </div>
    <div class="loading">
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import List from 'components/List'
import Loading from 'components/Loading'
import SongListCategory from 'components/SongListCategory'
import { getSonglist } from 'api/songlist.js'

export default {
  components: {
    List,
    Loading,
    SongListCategory
  },
  data () {
    return {
      songlist: [],
      loading: true
    }
  },
  computed: {
    cat () {
      return this.$route.query.cat
    }
  },
  watch: {
    '$route' () {
      this.$_getSonglist(this.cat)
    }
  },
  mounted () {
    this.$_getSonglist(this.cat)
  },
  methods: {
    selectItem (cat) {
      this.$router.push({
        path: '/songlist',
        query: {
          cat
        }
      })
    },
    selectSongList (songlist) {
      this.$router.push({
        path: '/musiclist',
        query: {
          id: songlist.id
        }
      })
    },
    $_getSonglist () {
      getSonglist(this.cat).then(res => {
        this.songlist = this.$_formatList(res.data.playlists)
        this.loading = false
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
@import 'styles/mixin.scss';

.songlist {
  @include wrap-center;
}
</style>

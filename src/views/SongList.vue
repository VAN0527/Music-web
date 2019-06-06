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
    <Loading :loading="loading"></Loading>
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
  created () {
    this.$_getSonglist()
  },
  methods: {
    selectItem (cat) {
      this.$_getSonglist(cat)
    },
    selectSongList (songlist) {
      this.$router.push({
        path: `/musiclist/${songlist.id}`
      })
    },
    $_getSonglist (cat = '全部') {
      this.loading = true
      this.songlist = []

      getSonglist(cat).then(res => {
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

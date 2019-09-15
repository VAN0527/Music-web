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
import SongListCategory from 'components/SongListCategory'
import { getSonglist } from 'api/songlist.js'
import { SONGLIST_LIMIT } from 'utils/config.js'

export default {
  components: {
    List,
    Loading,
    SongListCategory,
    Pagination
  },
  data () {
    return {
      songlist: [],
      loading: true,
      pageCount: 0
    }
  },
  computed: {
    cat () {
      return this.$route.query.cat
    }
  },
  watch: {
    '$route' () {
      this.loading = true
      this.$_getSonglist()
    }
  },
  mounted () {
    this.$_getSonglist()
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
    selectPage (page) {
      const offset = (page - 1) * SONGLIST_LIMIT
      this.loading = true
      this.$_getSonglist(offset)
    },
    $_getSonglist (offset = 0) {
      getSonglist(this.cat, offset)
        .then(res => {
          this.songlist = this.$_formatList(res.data.playlists)
          this.pageCount = Math.ceil(res.data.total / SONGLIST_LIMIT)
        })
        .then(() => this.loading = false)
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

  .pagination {
    padding: 10px;
    text-align: center;
  }
}
</style>

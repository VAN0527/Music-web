<template>
  <div class="artists">
    <div v-show="!loading" >
      <ul class="clearfix" >
        <li
          class="artist-item"
          v-for="artist in artists"
          :key="artist.id"
          @click="selectArtist(artist.id)"
        >
          <img class="pic" :src="artist.picUrl">
          <span class="name">{{artist.name}}</span>
        </li>
      </ul>
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
import Loading from 'components/Loading'
import Pagination from 'components/Pagination'
import { getSearchResult } from 'api/search.js'
import { SEARCH_LIMIT } from 'utils/config.js'

export default {
  components: {
    Pagination,
    Loading
  },
  data () {
    return {
      artists: [],
      loading: true,
      pageCount: 0
    }
  },
  created () {
    this.$_getSearchResult()
  },
  methods: {
    selectArtist (id) {
      this.$router.push({
        path: '/singer',
        query: {
          id
        }
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

      getSearchResult(keyword, type, SEARCH_LIMIT, offset)
        .then(res => {
          if (res.status === 200) {
            this.artists = this.$_formatArtists(res.data.result.artists)
            this.pageCount = Math.ceil(res.data.result.artistCount / SEARCH_LIMIT)
          }
        })
        .then(() => this.loading = false)
    },
    $_formatArtists (artists) {
      return artists.map(artist => {
        return {
          id: artist.id,
          name: artist.name,
          picUrl: `${artist.img1v1Url}?param=400y400`
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.artists {
  .artist-item {
    float: left;
    margin-top: 1em;
    padding: 10px;
    width: 20%;
    box-sizing: border-box;
    text-align: center;

    .pic {
      width: 100%;
      border-radius: 50%;
    }

    .name {
      display: block;
      padding-top: 5px;
      width: 100%;
      @include no-wrap;
      cursor: pointer;

      &:hover {
        color: $text-hover-color;
      }
    }
  }

  .pagination {
    padding: 10px;
    text-align: center;
  }
}
</style>


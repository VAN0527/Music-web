<template>
  <div class="artists clearfix">
    <div 
      class="artist-item"
      v-for="artist in artists"
      :key="artist.id"
      @click="selectArtist(artist.id)"
    >
      <img class="pic" :src="artist.picUrl">
      <span class="name">{{artist.name}}</span>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from 'api/search.js'

export default {
  data () {
    return {
      artists: []
    }
  },
  created () {
    this.$_getSearchResult()
  },
  methods: {
    selectArtist (id) {
      this.$router.push({
        path: `/singer/${id}`
      })
    },
    $_getSearchResult () {
      const query = this.$route.query
      const keyword = query.keyword
      const type = query.type

      getSearchResult(keyword, type).then(res => {
        if (res.status === 200) {
          this.artists = this.$_formatArtists(res.data.result.artists)
        }
      })
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
    width: 50%;
    box-sizing: border-box;
    text-align: center;

    @media screen and (min-width: $width-medium) {
      width: 33.3333%
    }

    @media screen and (min-width: $width-large) {
      width: 25%;
    }

    .pic {
      width: 100%;
      border-radius: 50%;
    }

    .name {
      display: block;
      padding-top: 5px;
      width: 100%;
      @include no-wrap;
    }
  }
}
</style>


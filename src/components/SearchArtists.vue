<template>
  <div class="artists clearfix">
    <div class="notfound" v-if="artists.length === 0">
      未找到相关信息
    </div>
    <div v-if="artists.length > 0">
      <div 
        class="artist-item"
        v-for="artist in artists"
        :key="artist.id"
        @click="selectArtist(artist.id)"
      >
        <img class="pic" :src="artist.img1v1Url">
        <span class="name">{{artist.name}}</span>
      </div>
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
  mounted () {
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
          this.artists = res.data.result.artists
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/mixin.scss';

.artists {
  margin-top: 30px;

  .notfound {
    font-size: 28px;
    text-align: center;
  }
  
  .artist-item {
    float: left;
    box-sizing: border-box;
    padding: 10px;
    width: 25%;
    text-align: center;

    .pic {
      width: 100%;
      height: 300px;
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


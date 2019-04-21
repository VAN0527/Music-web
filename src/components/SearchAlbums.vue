<template>
  <div class="albums clearfix">
    <div class="notfound" v-if="albums.length === 0">
      未找到相关信息
    </div>
    <div v-if="albums.length > 0">
      <div 
        class="albums-item"
        v-for="album in albums"
        :key="album.id"
      >
        <img :src="album.picUrl" class="pic">
        <div
          class="name"
          @click="selectAlbum(album.id)"  
        >
          <span>{{album.name}}</span>
        </div>
        <div
          class="artists"
          @click="selectArtist(album.artist.id)"
        >
          <span>{{album.artist.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearchResult } from 'api/search.js'

export default {
  data () {
    return {
      albums: []
    }
  },
  mounted () {
    this.$_getSearchResult()
  },
  methods: {
    selectAlbum (id) {
      this.$router.push({
        path: `/album/${id}`
      })
    },
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
          this.albums = res.data.result.albums
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/mixin.scss';

.albums {
  margin-top: 30px;
  font-size: 20px;

  .notfound {
    font-size: 28px;
    text-align: center;
  }

  .albums-item {
    height: 80px;
    padding: 20px;
    line-height: 80px;
    border-bottom: 1px solid #fff;

    &:last-child {
      border-bottom: none;
    }

    .pic {
      float: left;
      width: 80px;
      height: 80px;
    }

    .name {
      float: left;
      margin-left: 10px;
      max-width: 60%;
      @include no-wrap;
      span {
        cursor: pointer;
      }
    }

    .artists {
      float: right;
      margin-right: 20px;
      max-width: 10%;
      @include no-wrap;

      span {
        cursor: pointer;
      }
    }
  }
}
</style>

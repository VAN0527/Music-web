<template>
  <div class="suggest">
    <div class="notfound" v-show="suggests.length === 0">
      <span>未找到相关信息</span>
    </div>
    <div 
      class="suggest-item"
      v-for="suggest in suggests"
      :key="suggest.category"
      v-show="suggests.length > 0"
    >
      <div class="cat">
        <div class="cat-title">{{suggest.category}}</div>
        <div
          class="cat-result" 
          v-for="item in suggest.result"
          :key="item.id"
          @click.stop="selectItem(item.id, suggest.category)"
        >
          {{item.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getSearchSuggest } from 'api/search.js'
import { getSong } from 'api/song.js'
import { searchCat } from 'utils/config.js'
import { formatArtists, formatDuration } from 'utils/song.js'

export default {
  props: {
    keyword: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      suggests: []
    }
  },
  watch: {
    keyword (newKeyword) {
      if (newKeyword) {
        this.suggests = []
        this.$_getSearchSuggest(newKeyword)
      }
    }
  },
  methods: {
    selectItem (id, category) {
      switch (category) {
        case '歌手':
          this.$_selectArtist(id)
          break
        case '专辑':
          this.$_selectAlbums(id)
          break
        case '歌单':
          this.$_selectSongList(id)
          break
        case '歌曲':
          this.$_selectSong(id).then(song => this.insertSong(song))
          break
        default:
          return
          break
      }
    },
    $_selectArtist (id) {
      this.$router.push({
        path: `/singer`,
        query: {
          id
        }
      })
    },
    $_selectAlbums (id) {
      this.$router.push({
        path: `/album/${id}`
      })
    },
    $_selectSongList (id) {
      this.$router.push({
        path: `/musiclist/${id}`
      })
    },
    $_selectSong (id) {
      return getSong(id).then(res => {
        if (res.status === 200) {
          return this.$_formatSong(res.data.songs[0])
        }
      })
    },
    $_getSearchSuggest (keyword) {
      getSearchSuggest(keyword).then(res => {
        if (res.status === 200) {
          if (!res.data.result.order) return
          const categories = res.data.result.order
          const suggests = res.data.result
          this.suggests = this.$_formatSuggests(categories, suggests)
        }
      })
    },
    $_formatSong (song) {
      return {
        id: song.id,
        name: song.name,
        artists: formatArtists(song.ar),
        duration: formatDuration(song.dt),
        picUrl: `${song.al.picUrl}?param=400y400`,
        url: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
      }
    },
    $_formatSuggests (categories, suggests) {
      const keys = Object.keys(searchCat)
      return categories
        // 筛选分类
        .filter(category => keys.includes(category))
        .map(category => {
          return {
            category: searchCat[category],
            result: suggests[category]
          }
        })
    },
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.suggest {
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 5px 5px;
  box-shadow: 0 0 16px rgb(94, 94, 94);

  .suggest-item {
    padding: 5px 0;
    border-bottom: 1px solid #000;

    &:last-of-type {
      border-bottom: none;
    }

    .cat {
      .cat-title {
        font-size: 1.2em;
        font-weight: bold;
      }

      .cat-result {
        padding: 3px 10px 3px 10px;
        cursor: pointer;
        @include no-wrap;
        
        &:hover {
          background: $hover-bg-color;
          color: $text-hover-color;
        }
      }
    }
  }
}
</style>

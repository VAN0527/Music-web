<template>
  <div class="suggest">
    <div class="notfound" v-show="suggests.length === 0">
      <span>未找到相关信息</span>
    </div>
    <div 
      class="suggest-item"
      v-for="suggest in suggests"
      :key="suggest.cat"
      v-show="suggests.length > 0"
    >
      <div class="cat">
        <div class="cat-title">{{suggest.cat}}</div>
        <div
          class="cat-result" 
          v-for="item in suggest.result"
          :key="item.id"
          @click.stop="selectItem(item.id, suggest.cat)"
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
import { debounce } from 'utils/common.js'
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
        getSearchSuggest(newKeyword).then(res => {
          if (res.status === 200) {
            let suggests = []
            if (!res.data.result.order) return
            res.data.result.order.forEach(item => {
              suggests.push({
                cat: searchCat[item],
                result: res.data.result[item]
              })
            })
            this.suggests = suggests
          }
        })
      }
    }
  },
  methods: {
    selectItem (id, cat) {
      switch (cat) {
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
        path: `/singer/${id}`
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
      let song = {}
      return getSong(id).then(res => {
        if (res.status === 200) {
          const data = res.data.songs[0]
          const song = {
            id: data.id,
            name: data.name,
            artists: formatArtists(data.ar),
            duration: formatDuration(data.dt),
            picUrl: data.al.picUrl,
            url: `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
          }
          return song
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
@import 'styles/mixin.scss';

.suggest {
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 5px 5px;

  .suggest-item {
    padding: 5px 0;
    border-bottom: 1px solid #000;

    &:last-of-type {
      border-bottom: none;
    }

    .cat {
      .cat-title {
        font-size: 18px;
        font-weight: bold;
      }

      .cat-result {
        padding: 3px 10px 3px 10px;
        cursor: pointer;
        @include no-wrap;
        
        &:hover {
          background: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>

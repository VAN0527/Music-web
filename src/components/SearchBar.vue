<template>
  <div class="search-bar">
    <div class="search-box" >
      <i class="icon-sousuo"></i>
      <input  
        type="text" 
        placeholder="请输入搜索内容" 
        class="search" 
        v-model="keyword"
        @keypress.enter="getSearchResult"
        @blur="hide"
        @focus="show"
      >
    </div>
    <div class="suggests" v-show="suggestsShow">
      <div 
        class="suggest-item"
        v-for="suggest in suggests"
        :key="suggest.cat"
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
  </div>
</template>

<script>
import { getSearchResult, getSearchSuggest } from 'api/search.js'
import { clearTimeout, setTimeout } from 'timers';
import { searchCat } from 'utils/config.js'
import { mapActions } from 'vuex';
import { getSong } from 'api/song.js'
import { formatArtists, formatDuration } from 'utils/song.js'

export default {
  data () {
    return {
      keyword: '',
      suggests: [],
      suggestsShow: false
    }
  },
  watch: {
    keyword (newKeyword) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (newKeyword) {
          getSearchSuggest(newKeyword).then(res => {
            if (res.status === 200) {
              let suggests = []
              res.data.result.order.forEach(item => {
                suggests.push({
                  cat: searchCat[item],
                  result: res.data.result[item]
                })
              })
              this.suggestsShow = true
              this.suggests = suggests
            }
          })
        } else {
          this.suggestsShow = false
        }
      }, 200)
    }
  },
  methods: {
    hide () {
      setTimeout(() => {
        this.suggestsShow = false
      }, 200)
    },
    show () {
      if (this.keyword) {
        this.suggestsShow = true
      }
    },
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
          this.$_selectSong(id)
          break
        default:
          return
          break
      }
    },
    getSearchResult () {
      if (this.keyword) {
        getSearchResult(this.keyword).then(res => {
          if (res.status === 200) {
            console.log(res)
          }
        })
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
      getSong(id).then(res => {
        if (res.status === 200) {
          const data = res.data.songs[0]
          song = {
            id: data.id,
            name: data.name,
            artists: formatArtists(data.ar),
            duration: formatDuration(data.dt),
            picUrl: data.al.picUrl,
            url: `https://music.163.com/song/media/outer/url?id=${data.id}.mp3`
          }
          this.insertSong(song)
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

.search-bar {
  position: relative;
  .search-box {
    position: relative;
    
    i {
      position: absolute;
      left:10px;
      top:7px;
      color: #000;
    }

    input {
      padding: 5px 5px 5px 30px;
      width: 200px;
      border: 1px solid #fff;
      border-radius: 5px;
      outline: none;
    }
  }

  .suggests {
    position: absolute;
    width: 235px;
    background-color: #fff;
    color: #000;
    z-index: 10;
    border-radius: 5px;

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
}
</style>

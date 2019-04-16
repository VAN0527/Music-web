<template>
  <div class="songlist">
    <div class="catlist-wrapper">
      <div class="currentCat">
        <span @click="toggleCatlist">
          {{currentCat}} <i :class="[show ? 'icon-shrinkage' : 'icon-arrow-down']"></i>
        </span>
      </div>
      <div class="catlist" v-show="show">
        <div class="categories">
          <div class="sublist">
            <span 
              class="sublist-item" 
              :class="currentCat === '全部' ? 'active' : ''"
              @click="selectItem('全部')"
            >全部
            </span>
          </div>
        </div>
        <div
          class="categories" 
          v-for="cat in catlist"
          :key="cat.name"
        >
          <div class="title">{{cat.name}}</div>
          <div class="sublist">
            <span 
              class="sublist-item" 
              :class="[currentCat === sub.name ? 'active' : '']" 
              v-for="sub in cat.sub"
              :key="sub.name"
              @click="selectItem(sub.name)"
            >
              {{sub.name}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="songlist-wrapper">
      <List 
        :list="songlist" 
        @select="selectSongList"
      ></List>
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import List from 'components/List'
import Loading from 'components/Loading'
import { getCatlist, getSonglist } from 'api/songlist.js'
import { mapMutations } from 'vuex'

export default {
  components: {
    List,
    Loading
  },
  data () {
    return {
      show: false,
      catlist: [],
      currentCat: '全部',
      songlist: [],
      loading: true
    }
  },
  created () {
    this.$_getCatlist()
    this.$_getSonglist()
  },
  methods: {
    toggleCatlist () {
      this.show = !this.show
    },
    selectItem (cat) {
      this.currentCat = cat
      this.show = false
      this.$_getSonglist()
    },
    selectSongList (songlist) {
      this.$router.push({
        path: `/musiclist/${songlist.id}`
      })
      this.setMusicList(songlist)
    },
    $_getCatlist () {
      getCatlist().then(res => {
        if (res.status === 200) {
          this.catlist = this.$_normalizeCatlist(res.data)
        }
      })
    },
    $_getSonglist () {
      this.loading = true
      this.songlist = []
      getSonglist(this.currentCat).then(res => {
        if (res.status === 200) {
          let data = res.data.playlists.map(item => {
            return {
              id: item.id,
              name: item.name,
              picUrl: item.coverImgUrl
            }
          })
          this.songlist = data
          this.loading = false
        }
      })
    },
    $_normalizeCatlist (catlist) {
      let ret = []
      let categories = catlist.categories
      let subs = catlist.sub

      for (let item in categories) {
        ret.push({
          name: categories[item],
          category: item,
          sub: []
        })
      }

      subs.forEach(sub => {
        ret.forEach(item => {
          if (sub.category == item.category) {
            item.sub.push(sub)
          }
        })
      })

      return ret
    },
    ...mapMutations({
      setMusicList: 'SET_MUSIC_LIST'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.songlist {
  .catlist-wrapper {
    position: relative;
    .currentCat {
      font-size: 26px;
      margin: 10px;
      span {
        cursor: pointer;
      }
    }
    .catlist {
      position: absolute;
      width: 100%;
      background-color: rgb(20, 20, 20);
      z-index: 10;

      .categories {
        padding: 20px 10px;
        border-bottom: 1px solid rgb(182, 182, 182);
        
        &:last-child {
          border-bottom: none;
        }

        .title {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .sublist {
          display: flex;
          flex-wrap: wrap;
          .sublist-item {
            padding: 5px 10px;
            margin: 5px 10px;
            background-color: rgb(182, 182, 182);
            border-radius: 10px;
            cursor: pointer;

            &.active {
              background-color: $text-hover-color;
            }
          }
        }
      }
    }
  }

  .songlist-wrapper {
    position: relative;
  }
}
</style>


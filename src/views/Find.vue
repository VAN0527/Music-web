<template>
  <div class="find">
    <div class="banner">
      <Swiper :data="banners"></Swiper>
    </div>
    <div class="recommend">
      <div class="recommend-list-wrapper">
        <h2 class="title">推荐歌单</h2>
        <List
          :list="recommend"
          @select="selectRecommend"
        ></List>
      </div>
      <div class="newmusic-wrapper">
        <h2>新歌推荐</h2>
        <div class="playlist">
          <div 
            class="all-play"
            @click="playAll"
          >
            <span class="icon-bofang"></span>
            <span> 全部播放</span>
          </div>
          <ul>
            <li
              class="playlist-item" 
              v-for="(item, index) in newMusic" 
              :key="item.id"
              @click="selectItem(item)"
            >
              <span class="name">{{index + 1}} {{item.name}} - </span>
              <span
                class="artists"
                v-for="artist in item.artists"
                :key="artist.id"
                @click="selectArtist(artist)"
              >
                {{artist.name}}
              </span>
              <span class="duration">{{item.duration}}</span>
            </li>
          </ul>
        </div>
      </div>
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import Swiper from 'components/Swiper'
import List from 'components/List'
import Loading from 'components/Loading'
import { getBanner, getRecommend, getNewMusic, getHotSingers } from 'api/find.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapGetters ,mapMutations, mapActions } from 'vuex'
import { playMode } from 'utils/config.js'

export default {
  components: {
    Swiper,
    List,
    Loading
  },
  data () {
    return {
      banners: [],
      recommend: [],
      newMusic: [],
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'playMode'
    ])
  },
  created () {
    this.$_getData()
  },
  methods: {
    selectRecommend (item) {
      this.$router.push({
        path: `/musiclist/${item.id}`
      })
      this.setMusicList(item)
    },
    selectItem (item) {
      this.insertSong(item)
    },
    playAll () {
      let list = [...this.newMusic]
      this.setList(list)
      if (this.playMode === playMode.random) {
        list = shuffle(list)
      }

      this.setPlaylist(list)
      this.setPlay(true)
      this.setCurrentIndex(0)
    },
    selectArtist (artist) {
      const id = artist.id
      this.$router.push({
        path: `/singer/${id}`
      })
    },
    $_getBanner () {
      getBanner().then(res => {
        if (res.status === 200) {
          this.banners = res.data.banners
        }
      })
    },
    $_getRecommend () {
      getRecommend().then(res =>{
        if (res.status === 200) {
          this.recommend = res.data.result.slice(0, 12)
          this.loading = false
        }
      })
    },
    $_getNewMusic () {
      getNewMusic().then(res => {
        if (res.status === 200) {
          const data = res.data.result.slice()
          let newMusic = data.map(item => {
            return {
              id: item.id,
              name: item.name,
              duration: formatDuration(item.song.duration),
              artists: formatArtists(item.song.artists),
              picUrl: item.song.album.picUrl,
              url:`https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
            }
          })
          this.newMusic = newMusic
        }
      })
    },
    $_getData () {
      this.$_getBanner()
      this.$_getRecommend()
      this.$_getNewMusic()
    },
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setPlay: 'SET_PLAY',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setList: 'SET_LIST',
      setMusicList: 'SET_MUSIC_LIST'
    }),
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.find {
  .banner {
    margin: 20px 0;
    height: 300px;
    overflow: hidden;
  }

  .recommend {
    position: relative;

    .newmusic-wrapper {
      .playlist {
        font-size: 18px;

        .all-play {
          display: inline-block;
          margin: 5px 0;
          padding: 0 20px;
          cursor: pointer;
          &:hover {
            color: $text-hover-color;
          }
        }

        .playlist-item {
          padding: 0 20px;
          height: 40px;
          line-height: 40px;
          cursor: pointer;
          
          &:hover {
            background-color: $hover-bg-color;
            color: rgb(167, 151, 151);
          }

          .artists {
            &:hover {
              color: $text-hover-color;
            }
          }

          .duration {
            float: right;
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>


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
        <h2 class="title">新歌推荐</h2>
        <div class="playlist">
          <div 
            class="all-play"
            @click="playAll"
          >
            <i class="icon-bofang"></i>
            <span> 全部播放</span>
          </div>
          <PlayList 
            :list="newMusic"
            @select="selectItem"
          ></PlayList>
        </div>
      </div>
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import Swiper from 'components/Swiper'
import List from 'components/List'
import PlayList from 'components/PlayList'
import Loading from 'components/Loading'
import { getBanner, getRecommend, getNewMusic, getHotSingers } from 'api/find.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapGetters ,mapMutations, mapActions } from 'vuex'
import { playMode } from 'utils/config.js'

export default {
  components: {
    Swiper,
    List,
    Loading,
    PlayList
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
    $_getBanner () {
      getBanner().then(res => {
        if (res.status === 200) {
          this.banners = res.data.banners.map(banner => {
            return {
              imageUrl: `${banner.imageUrl}?param=1000y300`
            }
          })
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
              picUrl: `${item.song.album.picUrl}?param=600y600`,
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
@import 'styles/mixin.scss';

.find {
  .banner {
    padding: 20px 10px 0 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;

    @media screen and (min-width: $width-medium) {
      margin: 20px 0;
    }
  }
  
  .title {
    text-align: center;
    font-size: 1.5em;
    font-weight: 100;
  }

  .recommend {
    position: relative;

    .newmusic-wrapper {
      .playlist {
        font-size: 1em;

        .all-play {
          display: inline-block;
          margin-bottom: 5px;
          padding: 0 10px;
          cursor: pointer;
          
          @media screen and (min-width: $width-medium) {
            &:hover {
              color: $text-hover-color;
            }
          }
        }
      }
    }
  }
}
</style>


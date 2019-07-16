<template>
  <div class="find">
    <div class="banner-wrapper">
      <div class="banner">
        <VueEasySlider :data="banners"></VueEasySlider>
      </div>
    </div>
    <div class="find-wrapper" v-show="!loading">
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
              @click="playAll(newMusic)"
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
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import VueEasySlider from 'components/VueEasySlider'
import List from 'components/List'
import PlayList from 'components/PlayList'
import Loading from 'components/Loading'
import { getBanner, getRecommend, getNewMusic, getHotSingers } from 'api/find.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapActions } from 'vuex'

export default {
  components: {
    VueEasySlider,
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
  created () {
    this.$_getData()
  },
  methods: {
    selectRecommend (item) {
      this.$router.push({
        path: '/musiclist',
        query: {
          id: item.id
        }
      })
    },
    selectItem (item) {
      this.insertSong(item)
    },
    $_getBanner () {
      getBanner().then(res => {
        if (res.status === 200) {
          const banners = [...res.data.banners]
          this.banners = this.$_formatBanner(banners)
        }
      })
    },
    $_getRecommend () {
      getRecommend().then(res =>{
        if (res.status === 200) {
          this.recommend = res.data.result.slice(0, 15)
        }
      })
    },
    $_getNewMusic () {
      getNewMusic().then(res => {
        if (res.status === 200) {
          const songs = this.$_formatSong(res.data.data.slice(0, 10))
          this.newMusic = songs
          this.loading = false
        }
      })
    },
    $_formatSong (songs) {
      return songs.map(song => {
        return {
          id: song.id,
          name: song.name,
          duration: formatDuration(song.duration),
          artists: formatArtists(song.artists),
          picUrl: `${song.album.picUrl}?param=400y400`,
          url:`https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
        }
      })
    },
    $_formatBanner (banners) {
      return banners.map(banner => {
        return {
          imageUrl: `${banner.imageUrl}?param=1000y300`
        }
      })
    },
    $_getData () {
      this.$_getBanner()
      this.$_getRecommend()
      this.$_getNewMusic()
    },
    ...mapActions([
      'insertSong',
      'playAll'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.find {
  margin-bottom: 20px;
  
  .banner-wrapper {
    background-color: #000;

    .banner {
      box-sizing: border-box;
      padding: 10px 20px;
      @include wrap-center;
    }
  }

  .find-wrapper {
    @include wrap-center;
    
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
            font-size: 1.2em;
            font-weight: 700;
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
  
}
</style>


<template>
  <div class="singer">
    <div class="singer-wrapper" v-show="!loading">
      <div class="info-wrapper">
        <div class="singer-info clearfix">
          <div class="cover">
            <img 
              v-lazy="desc.picUrl" 
              :key="desc.picUrl"
            >
          </div>
          <div class="info">
            <div class="name">
              {{desc.name}}
            </div>
            <div class="desc">
              简介: {{desc.briefDesc}}
            </div>
          </div>
        </div>
        <div class="tab-bar">
          <span
            class="tab-item"
            :class="songsActive" 
            @click="toggleTab('songs')"
          >
            歌曲
          </span>
          <span 
            class="tab-item" 
            :class="albumsActive"
            @click="toggleTab('albums')"
          >
            专辑
          </span>
        </div>
      </div>
      <div class="singer-view">
        <router-view></router-view>
      </div>
    </div>
    <Loading :loading="this.loading"></Loading>
  </div>
</template>

<script>
import Loading from 'components/Loading'
import { getSingerSongsAndDesc } from 'api/singer.js'

export default {
  components: {
    Loading
  },
  data () {
    return {
      desc: [],
      tab: 'songs',
      loading: true
    }
  },
  computed: {
    songsActive () {
      return this.tab === 'songs' ? 'active' : ''
    },
    albumsActive () {
      return this.tab === 'albums' ? 'active' : ''
    },
  },
  watch: {
    '$route' () {
      this.$_getSingerDesc()
    }
  },
  created () {
    this.$_getSingerDesc()
  },
  methods: {
    toggleTab (tab) {
      this.tab = tab
      this.$router.push({
        path: `/singer/${tab}`,
        query: {
          id: this.$route.query.id
        }
      })
    },
    $_getSingerDesc () {
      getSingerSongsAndDesc(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.desc = res.data.artist
          this.loading = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.singer {
  .singer-wrapper {
    .info-wrapper {
      background-color: $bg-color;
      .singer-info {
        @include wrap-center;
        padding: 20px 0;
        color: $color-primary;

        .cover {
          text-align: center;

          @media screen and (min-width: $width-large) {
            float: left;
            width: 300px;
          }

          img {
            height: 250px;
            width: 250px;
            border-radius: 10px;
          }
        }

        .info {
          .name {
            margin: 10px 0;
            font-size: 1.5em;
            text-align: center;
          }

          .desc {
            padding: 0 30px;
            word-break: break-all;
            text-align: center;
            
            @media screen and (min-width: $width-large) {
              margin: 0 auto 0 300px;
            }
          }
        }
      }

      .tab-bar {
        @include wrap-center;
        padding: 10px 0;
        text-align: center;
        font-size: 1.25em;
        color: $color-primary;

        .tab-item {    
          padding: 0 10px;
          display: inline-block;
          cursor: pointer;

          &:hover {
            color: $text-hover-color;
          }

          &.active {
            color: $text-hover-color;
          }
        }
      }
    }

    .singer-view {
      @include wrap-center;
      margin-top: 10px;
    }
  }
}
</style>

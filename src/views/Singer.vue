<template>
  <div class="singer">
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
    <div class="playlist" v-show="tab === 'songs'">
      <div 
        class="all-play"
        @click="playAll(songs)"
      >
        <i class="icon-bofang"></i>
        <span> 全部播放</span>
      </div>
      <PlayList
        :list="songs"
        @select="selectItem"
      ></PlayList>
    </div>
    <div class="albums" v-show="tab === 'albums'">
      <List 
        :list="albums" 
        @select="selectAlbum"
      ></List>
    </div>
  </div>
</template>

<script>
import PlayList from 'components/PlayList.vue'
import List from 'components/List.vue'
import { getSingerSongsAndDesc, getSingerAlbums } from 'api/singer.js'
import { formatDuration, formatArtists, formatAlbums } from 'utils/song.js'
import { mapActions } from 'vuex'

export default {
  components: {
    PlayList,
    List
  },
  data () {
    return {
      desc: [],
      songs: [],
      albums: [],
      tab: 'songs'
    }
  },
  computed: {
    songsActive () {
      return this.tab === 'songs' ? 'active' : ''
    },
    albumsActive () {
      return this.tab === 'albums' ? 'active' : ''
    },
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    '$route' () {
      this.$_getSingerSongsAndDesc()
      this.$_getSingerAlbums()
    }
  },
  created () {
    this.$_getSingerSongsAndDesc()
    this.$_getSingerAlbums()
  },
  methods: {
    selectItem (item) {
      this.insertSong(item)
    },
    toggleTab (tab) {
      this.tab = tab
    },
    selectAlbum (album) {
      this.$router.push({
        path: `/album/${album.id}`
      })
    },
    $_getSingerSongsAndDesc () {
      getSingerSongsAndDesc(this.id).then(res => {
        if (res.status === 200) {
          this.desc = res.data.artist
          this.songs = this.$_formatSongs(res.data.hotSongs)
        }
      })
    },
    $_getSingerAlbums () {
      getSingerAlbums(this.id).then(res => {
        if (res.status === 200) {
          this.albums = formatAlbums(res.data.hotAlbums)
        }
      })
    },
    $_formatSongs (songs) {
      return songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          artists: formatArtists(item.ar),
          duration: formatDuration(item.dt),
          picUrl: `${item.al.picUrl}?param=400y400`,
          url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
        }
      })
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

.singer {
  .singer-info {
    padding: 20px 0;

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

        @media screen and (min-width: $width-large) {
          margin: 0 auto 0 300px;
        }
      }
    }
  }

  .tab-bar {
    margin-bottom: 10px;
    padding: 5px 10px;
    font-size: 1.25em;
    background-color: #fff;
    color: #000;

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

  .playlist {
    .all-play {
      margin: 5px 0;
      padding: 0 10px;
      display: inline-block;
      cursor: pointer;
      
      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>

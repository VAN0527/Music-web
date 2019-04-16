<template>
  <div class="singer">
    <div class="singer-info">
      <div class="cover">
        <img v-lazy="desc.picUrl" :key="desc.picUrl">
      </div>
      <div class="info">
        <div class="name">
          {{desc.name}}
        </div>
        <div class="intro">
          简介: {{desc.briefDesc}}
        </div>
      </div>
    </div>
    <div class="tab-bar">
      <span
        class="tab-item"
        :class="songsActive" 
        @click="toggleTab('songs')"
      >歌曲</span>
      <span 
        class="tab-item" 
        :class="albumsActive"
        @click="toggleTab('albums')"
      >专辑</span>
    </div>
    <div class="playlist" v-show="tab === 'songs'">
      <div 
        class="all-play"
        @click="playAll"
      >
        <span class="icon-bofang"></span>
        <span> 全部播放</span>
      </div>
      <PlayList
        :songs="songs"
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
import { formatDuration, formatArtists } from 'utils/song.js'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'utils/config.js'

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
    ...mapGetters([
      'playMode'
    ])
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
    playAll () {
      let list = [...this.songs]
      this.setList(list)
      if (this.playMode === playMode.random) {
        list = shuffle(list)
      }

      this.setPlaylist(list)
      this.setPlay(true)
      this.setCurrentIndex(0)
    },
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
      this.setMusicList(album)
    },
    $_getSingerSongsAndDesc () {
      const id = this.$route.params.id

      getSingerSongsAndDesc(id).then(res => {
        if (res.status === 200) {
          this.desc = res.data.artist
          this.songs = this.$_normalizeSongs(res.data.hotSongs)
        }
      })
    },
    $_getSingerAlbums () {
      const id = this.$route.params.id

      getSingerAlbums(id).then(res => {
        if (res.status === 200) {
          this.albums = res.data.hotAlbums
        }
      })
    },
    $_normalizeSongs (songs) {
      return songs.map(item => {
        return {
          id: item.id,
          name: item.name,
          picUrl: item.al.picUrl,
          artists: formatArtists(item.ar),
          duration: formatDuration(item.dt),
          url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`
        }
      })
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

.singer {
  margin-top: 20px;
  .singer-info {
    min-height: 300px;

    .cover {
      display: flex;
      height: 300px;
      margin: 0 30px;
      float: left;
      align-items: center;
      img {
        height: 250px;
        width: 250px;
      }
    }

    .info {
      margin-left: 300px;

      .name {
        font-size: 32px;
        margin: 10px;
      }

      .intro {
        padding: 0 30px;
        font-size: 18px;
      }
    }
  }

  .tab-bar {
    margin-bottom: 10px;
    padding: 5px 30px;
    background-color: rgb(194, 193, 193);
    font-size: 24px;
    color: #000;
    .tab-item {
      display: inline-block;
      padding: 0 10px;
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
      display: inline-block;
      margin: 10px 0;
      padding: 0 40px;
      cursor: pointer;
      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>

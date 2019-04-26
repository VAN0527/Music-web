<template>
  <div class="musiclist">
    <div class="list-info clearfix">
      <div class="cover">
        <img 
          v-lazy="coverImg" 
          :key="coverImg"
        >
      </div>
      <div class="info">
        <h2 class="title">{{title}}</h2>
        <p class="creater">{{creator}}</p>
        <div class="btns">
          <div 
            class="btn"
            @click="playAll"
          >
            <i class="icon-bofang"></i> 全部播放
          </div>
          <div class="btn">
            <i class="icon-shoucang"></i> 收藏
          </div>
        </div>
      </div>
    </div>
    <div class="playlist">
      <PlayList
        :list="songs" 
        @select="selectItem"
      ></PlayList>
      <Loading :loading="loading"></Loading>
    </div>
  </div>
</template>

<script>
import PlayList from 'components/PlayList'
import Loading from 'components/Loading'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { getMusicList, getAlbumSongs } from 'api/musiclist.js'
import { formatDuration, formatArtists } from 'utils/song.js'
import { playMode } from 'utils/config.js'
import { shuffle } from 'utils/common.js'

export default {
  components: {
    PlayList,
    Loading
  },
  props: {
    albums: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      songs: [],
      creator: '',
      coverImg: '',
      title: '',
      loading: true
    }
  },
  mounted () {
    if (this.albums) {
      this.$_getAlbumSongs()
    } else {
      this.$_getMusicList()
    }
  },
  computed: {
    ...mapGetters([
      'musicList',
      'playlist',
      'list',
      'playMode'
    ])
  },
  watch: {
    '$route' () {
      if (this.albums) {
        this.$_getAlbumSongs()
      } else {
        this.$_getMusicList()
      }
    }
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
    $_getMusicList () {
      const id = this.$route.params.id
      getMusicList(id).then(res => {
        if (res.status === 200) {
          const data = res.data.playlist
          this.songs = this.$_formatSong(data.tracks)
          this.creator = data.creator.nickname
          this.coverImg = `${data.coverImgUrl}?param=600y600`
          this.title = data.name
          this.loading = false
        }
      })
    },
    $_getAlbumSongs () {
      const id = this.$route.params.id
      getAlbumSongs(id).then(res => {
        if (res.status === 200) {
          const data = res.data
          this.songs = this.$_formatSong(data.songs)
          this.coverImg = `${data.album.picUrl}?param=600y600`
          this.title = data.album.name
          this.creator = data.album.artist.name
          this.loading = false
        }
      })
    },
    $_formatSong (list) {
      return list.map(item => {
        return {
          id: item.id,
          name: item.name,
          artists: formatArtists(item.ar),
          duration: formatDuration(item.dt),
          picUrl: `${item.al.picUrl}?param=600y600`,
          url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3` 
        }
      })
    },
    ...mapMutations({
      setPlaylist: 'SET_PLAYLIST',
      setPlay: 'SET_PLAY',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setList: 'SET_LIST'
    }),
    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.musiclist {
  .list-info {
    position: relative;
    padding: 20px;

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
      position: relative;
      text-align: center;
      overflow: hidden;
      
      .title {
        font-size: 1.3em;
        font-weight: 400;
        overflow: hidden;
      }

      .btns {
        .btn {
          margin: 0 5px;
          padding: 10px 10px;
          display: inline-block;
          border-radius: 10px;
          border: none;
          background-color: $text-hover-color;
          color: #fff;
          cursor: pointer;
          outline: none;
        }
      }
    }
  }

  .playlist {
    position: relative;
  }
}
</style>

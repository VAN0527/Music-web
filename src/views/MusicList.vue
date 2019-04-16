<template>
  <div class="musiclist">
    <div class="list-info">
      <div class="cover">
        <img 
          v-lazy="coverImg" 
          :key="coverImg"
        >
      </div>
      <div class="info">
        <h2 class="title">{{musicList.name}}</h2>
        <p class="creater">{{creator}}</p>
        <div class="btns">
          <button @click="playAll">
            <i class="icon-bofang"></i> 全部播放
          </button>
          <button>
            <i class="icon-shoucang"></i> 收藏
          </button>
        </div>
      </div>
    </div>
    <div class="playlist">
      <PlayList
        :songs="songs" 
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
          this.coverImg = data.coverImgUrl
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
          this.coverImg = data.album.picUrl
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
          picUrl: item.al.picUrl,
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
  margin-top: 20px;
  .list-info {
    position: relative;
    // background-color: aquamarine;

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
      height: 300px;
      margin-left: 310px;
      position: relative;
      overflow: hidden;

      .title {
        margin-top: 30px;
        overflow: hidden;
      }

      .btns {
        position: absolute;
        bottom: 28px;
        
        button {
          padding: 0 10px;
          margin-right: 20px;
          height: 40px;
          line-height: 40px;
          border-radius: 10px;
          border: none;
          background-color: $text-hover-color;
          font-size: 18px;
          cursor: pointer;
          outline: none;

          &:hover {
            color: $text-color;
          }
        }
      }
    }
  }

  .playlist {
    position: relative;
  }
}
</style>

<template>
  <div class="musiclist">
    <div class="musiclist-wrapper" v-show="!loading">
      <div class="list-info clearfix">
        <div class="cover">
          <img 
            v-lazy="data.picUrl" 
            :key="data.picUrl"
          >
        </div>
        <div class="info">
          <h2 class="title">{{data.title}}</h2>
          <p class="creater">{{data.creator}}</p>
          <div class="btns">
            <div 
              class="btn"
              @click.stop="playAll(data.songs)"
            >
              <i class="icon-bofang"></i>
              <span>全部播放</span>
            </div>
            <div class="btn">
              <i class="icon-shoucang"></i>
              <span>收藏</span>
            </div>
          </div>
        </div>
      </div>
      <div class="playlist">
        <PlayList
          :list="data.songs" 
          @select="selectItem"
        ></PlayList>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import PlayList from 'components/PlayList'
import Loading from 'components/Loading'
import { mapActions } from 'vuex'
import { getMusicList, getAlbumSongs } from 'api/musiclist.js'
import { formatDuration, formatArtists } from 'utils/song.js'

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
      data: {},
      loading: true
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this.$_getData()
  },
  watch: {
    '$route' () {
      this.$_getData()
    }
  },
  methods: {
    selectItem (song) {
      this.insertSong(song)
    },
    $_getMusicList () {
      getMusicList(this.id).then(res => {
        if (res.status === 200) {
          const musiclist = res.data.playlist
          this.data = this.$_formatMusicList(musiclist)
          this.loading = false
        }
      })
    },
    $_getAlbumSongs () {
      getAlbumSongs(this.id).then(res => {
        if (res.status === 200) {
          const album = res.data
          this.data = this.$_formatAlbum(album)
          this.loading = false
        }
      })
    },
    $_formatMusicList (musiclist) {
      return {
        songs: this.$_formatSong(musiclist.tracks),
        title: musiclist.name,
        creator: musiclist.creator.nickname,
        picUrl: `${musiclist.coverImgUrl}?param=400y400`,
      }
    },
    $_formatAlbum (album) {
      return {
        id: album.id,
        title: album.album.name,
        creator: album.album.artist.name,
        picUrl: `${album.album.picUrl}?param=400y400`,
        songs: this.$_formatSong(album.songs),
      }
    },
    $_formatSong (list) {
      return list.map(item => {
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
    $_getData () {
      if (this.albums) {
        this.$_getAlbumSongs()
      } else {
        this.$_getMusicList()
      }
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
}
</style>

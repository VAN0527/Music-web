<template>
  <div class="songdetail">
    <div class="songdetail-wrapper" v-show="!loading">
      <div class="song">
        <div class="info clearfix">
          <img class="cover" :src="song.picUrl">
          <h2 class="title">{{song.name}}</h2>
          <p class="singer">
            歌手: 
            <span v-for="artist in song.artists">
              {{artist.name}}
            </span>
          </p>
          <p class="album">专辑: {{song.album}}</p>
        </div>
        <div class="lyric">
          
        </div>
      </div>
      <div class="comment">
        <h3>热门评论</h3>
        <ul class="comment-list">
          <li
            class="comment-item clearfix"
            v-for="comment in hotComments"
            :key="comment.id"
          >
            <div class="comment-left">
              <img :src="comment.user.picUrl">
            </div>
            <div class="comment-right">
              <p class="name">{{comment.user.name}}</p>
              <p class="content">{{comment.content}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import Loading from 'components/Loading'
import { getSong, getComment } from 'api/song.js'
import { formatArtists } from 'utils/song.js'

export default {
  components: {
    Loading
  },
  data () {
    return {
      song: [],
      hotComments: [],
      loading: true
    }
  },
  watch: {
    '$route' () {
      this.$_getSong()
      this.$_getComments()
    }
  },
  created () {
    this.$_getSong()
    this.$_getComments()
  },
  methods: {
    $_getSong () {
      getSong(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.song = this.$_formatSong(res.data.songs[0])
        }
      })
    },
    $_getComments () {
      getComment(this.$route.query.id).then(res => {
        if (res.status === 200) {
          this.hotComments = this.$_formatComments(res.data.hotComments)
          this.loading = false
        }
      })
    },
    $_formatSong (song) {
      return {
        id: song.id,
        name: song.name,
        album: song.al.name,
        artists: formatArtists(song.ar),
        picUrl: song.al.picUrl + '?param=400y400'
      }
    },
    $_formatComments (comments) {
      return comments.map(comment => {
        return {
          id: comment.commentId,
          content: comment.content,
          user: {
            id: comment.user.userId,
            name: comment.user.nickname,
            picUrl: comment.user.avatarUrl
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.songdetail {
  margin-top: 1em;

  .songdetail-wrapper {
    .info {
      text-align: center;

      .cover {
        width: 80%;
        border-radius: 50%;

        @media screen and (min-width: $width-medium) {
          float: left;
          margin-left: 10%;
          width: 30%;
        }
      }

      .title {
        font-size: 2em;
        font-weight: 400;
        margin: 5px;

        @media screen and (min-width: $width-medium) {
          padding-top: 5%;
        }
      }
    }

    .comment {
      h3 {
        text-align: center;
        font-weight: 400;
        margin: 5px;

        @media screen and (min-width: $width-medium) {
          font-size: 1.75em;
          margin-top: 15px;
        }
      }

      .comment-item {
        padding: 10px;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(182, 182, 182);
        
        &:last-child {
          border-bottom: none;
        }

        .comment-left {
          float: left;
          width: 20%;
          
          @media screen and (min-width: $width-medium) {
            width: 10%;
          }
          
          @media screen and (min-width: $width-large) {
            width: 80px;
          }

          img {
            max-width: 80%;
          }
        }

        .comment-right {
          float: left;
          width: 80%;

          @media screen and (min-width: $width-medium) {
            width: 90%;
          }
          
          @media screen and (min-width: $width-large) {
            width: calc(100% - 80px);
          }

          .name,
          .content {
            margin: 0;
          }

          .name {
            padding: 3px 0;
            font-size: 1.1em;
            color: $text-hover-color;
          }

          .content {
            word-wrap: break-word;
          }
        }
      }
      
    }
  } 
}
</style>

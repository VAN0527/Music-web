<template>
  <div class="rank">
    <div class="songlist-rank-wrapper clearfix">
      <div 
        class="songlist-rank-item clearfix" 
        v-for="item in songlistRank"
        :key="item.id"
      >
        <div
          class="coverImg"
          @click="selectItem(item)"
        >
          <img :src="item.coverImgUrl">
        </div>
        <ul class="songs">
          <li
            class="songs-item"
            v-for="(song, index) in item.tracks"
            :key="index"
            >
            {{index + 1}}. {{song.first}} - {{song.second}}
          </li>
        </ul>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import { getRanklistDetail } from 'api/rank.js'
import { mapMutations } from 'vuex'
import Loading from 'components/Loading'
export default {
  components: {
    Loading
  },
  data () {
    return {
      songlistRank: [],
      loading: true
    }
  },
  created () {
    this.$_getRanklistDetail()
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: `/musiclist/${item.id}`
      })
      this.setMusicList(item)
    },
    $_getRanklistDetail () {
      getRanklistDetail().then(res => {
        if (res.status === 200) {
          let list = res.data.list.slice(0, 4)
          this.songlistRank = list
          this.loading = false
        }
      })
    },
    ...mapMutations({
       setMusicList: 'SET_MUSIC_LIST'
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.rank {
  position: relative;

  .songlist-rank-wrapper {
    margin-top: 20px;

    .songlist-rank-item {
      padding: 10px;
      width: 100%;
      box-sizing: border-box;

      @media screen and (min-width: $width-medium) {
        float: left;  
        width: 50%;
      }

      .coverImg {
        width: 100%;
        text-align: center;
        
        img {
          width: 100%;
          max-width: 300px;    
          height: 100%;
          border-radius: 10px;
        }

        @media screen and (min-width: $width-medium) {
          float: left;
          width: 50%;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }

      .songs {
        width: 100%;

        .songs-item {  
          padding: 5px 10px; 
          width: 100%;     
          height: 30px;
          box-sizing: border-box;
          line-height: 30px;
          @include no-wrap;
        }

        @media screen and (min-width: $width-medium) {
          float: left;
          width: 50%;
        }
      }
    }
  }
}
</style>

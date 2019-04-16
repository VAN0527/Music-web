<template>
  <div class="rank">
    <div class="songlist-rank-wrapper">
      <div 
        class="songlist-rank-item" 
        v-for="item in songlistRank"
        :key="item.id"
        @click="selectItem(item)"
      >
        <div class="coverImg">
          <img :src="item.coverImgUrl">
        </div>
        <div class="songs">
          <ul>
            <li
             v-for="(song, index) in item.tracks"
             :key="index"
             >
              {{index + 1}}. {{song.first}} - {{song.second}}
            </li>
          </ul>
        </div>
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
@import 'styles/mixin.scss';
.rank {
  position: relative;

  .songlist-rank-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .songlist-rank-item {
      margin: 5px 10px;
      display: flex;
      flex: 1;
      .coverImg {
        flex: 0 0 auto;
        width: 200px;
        height: 200px;
        background: #fff;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .songs {
        flex: 1;
        width: 200px;
        margin-left: 10px;

        li {        
          height: 30px;
          padding: 10px 0;
          line-height: 30px;
          font-size: 18px;
          @include no-wrap;
        }
      }
    }
  }
}
</style>

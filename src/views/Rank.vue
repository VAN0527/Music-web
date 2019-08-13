<template>
  <div class="rank">
    <div class="ranklist-wrapper clearfix" v-show="!loading">
      <div 
        class="ranklist-item clearfix" 
        v-for="item in rankList"
        :key="item.id"
      >
        <div class="coverImg">
          <img
            :src="item.coverImgUrl"
            @click="selectItem(item)"
           >
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <Loading :loading="loading"></Loading>
  </div>
</template>

<script>
import { getRanklistDetail } from 'api/rank.js'
import Loading from 'components/Loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      rankList: [],
      loading: true
    }
  },
  created () {
    this.$_getRanklistDetail()
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        path: '/musiclist',
        query: {
          id: item.id
        }
      })
    },
    $_getRanklistDetail () {
      getRanklistDetail().then(res => {
        if (res.status === 200) {
          this.rankList = res.data.list
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

.rank {
  .ranklist-wrapper {
    @include wrap-center;
    margin-top: 20px;

    .ranklist-item {
      float: left; 
      padding: 10px;
      box-sizing: border-box;
      width: 25%;
      
      .coverImg {
        width: 100%;
        text-align: center;
        
        img {
          width: 100%;
          max-width: 300px;    
          height: 100%;
          border-radius: 10px;

          &:hover {
            cursor: pointer;
            box-shadow: 0 0 15px 1px #000;
          }
        }
      }
    }
  }
}
</style>

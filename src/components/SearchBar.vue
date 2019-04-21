<template>
  <div class="search-bar">
    <div class="search-box" >
      <i class="icon-sousuo"></i>
      <input  
        type="text" 
        placeholder="请输入搜索内容" 
        class="search" 
        v-model="keyword"
        @keypress.enter="getSearchResult"
        @blur="hide"
        @focus="show"
      >
    </div>
    <div class="suggests" v-show="suggestsShow">
      <SearchSuggest :keyword="keyword"></SearchSuggest>
    </div>
  </div>
</template>

<script>
import SearchSuggest from 'components/SearchSuggest'
import { getSearchResult } from 'api/search.js'

export default {
  components: {
    SearchSuggest
  },
  data () {
    return {
      keyword: '',
      suggests: [],
      suggestsShow: false
    }
  },
  watch: {
    keyword (newKeyword) {
      if (newKeyword) {
        this.suggestsShow = true
      } else {
        this.suggestsShow = false
      }
    }
  },
  methods: {
    hide () {
      // 确保搜索建议点击生效
      setTimeout(() => {
        this.suggestsShow = false
      }, 200)
    },
    show () {
      if (this.keyword) {
        this.suggestsShow = true
      }
    },
    getSearchResult () {
      if (this.keyword) {
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.keyword,
            type: 1
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/mixin.scss';

.search-bar {
  position: relative;
  .search-box {
    position: relative;
    
    i {
      position: absolute;
      left:10px;
      top:7px;
      color: #000;
    }

    input {
      padding: 5px 5px 5px 30px;
      width: 200px;
      border: 1px solid #fff;
      border-radius: 5px;
      outline: none;
    }
  }

  .suggests {
    position: absolute;
    width: 235px;
    z-index: 10;
  }
}
</style>

<template>
  <div class="search-bar">
    <div class="search-box" >
      <i class="icon-sousuo search-icon"></i>
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
        this.suggestsShow = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.search-bar {
  position: relative;

  .search-box {
    position: relative;
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
    font-size: 1em;

    @media screen and (min-width: $width-medium) {
      height: 60px;
      line-height: 60px;
    }

    .search-icon {
      position: absolute;
      left: 0;
      top: 0;
      color: #000;
    }

    input {
      box-sizing: border-box;
      padding: 0 2px 0 1.5em;
      height: 35px;
      width: 100%;
      border: none;
      outline: none;

      @media screen and (min-width: $width-medium) {
        height: 45px;
        line-height: 45px;
      }
    }
  }

  .suggests {
    position: absolute;
    width: 100%;
    z-index: 10;
  }
}
</style>

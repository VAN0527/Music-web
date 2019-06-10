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
    font-size: 1em;

    .search-icon {
      position: absolute;
      left: 10px;
      top: 0;
      color: rgb(126, 126, 126);
    }

    input {
      box-sizing: border-box;
      padding: 2px 2px 2px 1.7em;
      height: 30px;
      width: 250px;
      line-height: 30px;
      border: none;
      border-radius: 999999999px;
      background-color: rgb(241, 240, 240);
      outline: none;
    }
  }

  .suggests {
    position: absolute;
    top: 50px;
    width: 100%;
    z-index: 100;
  }
}
</style>

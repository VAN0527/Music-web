<template>
  <div class="search">
    <div class="title">
      <h2>搜索结果</h2>
    </div>
    <div class="tab">
      <ul>
        <li 
          class="tab-item"
          :class="[tab.type === currentType ? 'active' : '']"
          v-for="tab in tabs"
          :key="tab.type"
          @click="selectTab(tab)"
        >
          {{tab.name}}
        </li>
      </ul>
    </div>
    <div class="search-result">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          type: 1,
          name: '单曲',
          path: 'songs'
        },
        {
          type: 100,
          name: '歌手',
          path: 'artists'
        },
        {
          type: 10,
          name: '专辑',
          path: 'albums'
        },
        {
          type: 1000,
          name: '歌单',
          path: 'songlist'
        }
      ]
    }
  },
  computed: {
    currentType () {
      return Number(this.$route.query.type)
    }
  },
  methods:{
    selectTab (tab) {
      this.$router.push({
        path: `/search/${tab.path}`,
        query: {
          keyword: this.$route.query.keyword,
          type: tab.type
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.search {
  @include wrap-center;

  .title {
    text-align: center;

     h2 {
        margin: 10px;
        font-size: 32px;
        font-weight: 100;
     }
  }

  .tab {
    ul {
      display: flex;
      justify-content: space-around;
      font-size: 1.5em;
      font-weight: 100;

      .tab-item {
        cursor: pointer;
        
        &.active {
          color: $text-hover-color;
        }

        &:hover {
          color: $text-hover-color;
        }
      }
    }
  }
}
</style>

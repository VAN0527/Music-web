<template>
  <div class="sideBar clearfix">
    <div class="title">
      <h1>M<span>usic</span></h1>
    </div>
    <div class="music-lib">
      <ul>
        <router-link
          to="/find" 
          tag="li" 
          class="music-lib-item"
          :class="[path === '/find' ? 'active' : '']"
        >
          <i class="icon-found"></i>
          <span class="text">发现音乐</span>
        </router-link>
        <router-link 
          to="/songlist" 
          tag="li" 
          class="music-lib-item"
          :class="[path === '/songlist' ? 'active' : '']"
        >
          <i class="icon-tubiao"></i>
          <span class="text">歌单</span>
        </router-link>
        <router-link 
          to="/rank" 
          tag="li" 
          class="music-lib-item"
          :class="[path === '/rank' ? 'active' : '']"
        >
          <i class="icon-paixingbang"></i>
          <span class="text">排行榜</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    path () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.sideBar {
  width: 100%;
  color: $text-color;
  line-height: 1.5;

  @media screen and (min-width: $width-medium) {
    height: 100%;
    background-color: rgb(248, 247, 247);
  }

  .title {
    float: left;
    width: 25%;
    box-sizing: border-box;
    text-align: center;
    color: $text-hover-color;
    
    @media screen and (min-width: $width-medium) {
      float: none;
      width: 100%;
      padding: 20px 0;
    }

    h1 {
      margin: 0;
      font-weight: 400;
      font-size: 1.8em;
      

      @media screen and (min-width: $width-large) {
        font-size: 2em;
      }

      span {
        display: none;

        @media screen and (min-width: $width-large) {
          display: inline;
        }
      }
    }
  }
  .music-lib {
    font-size: 1.8em;
    
    @media screen and (min-width: $width-large) {
      font-size: 1.5em;
    }

    .music-lib-item {
      float: left;
      width: 25%;
      box-sizing: border-box;
      cursor: pointer;
      transition: all linear 0.3s;
      text-align: center;

      &.active {
        color: $text-hover-color;
        background-color: $hover-bg-color;
      }

      @media screen and (min-width: $width-medium) {
        float: none;
        width: 100%;
      }

      @media screen and (min-width: $width-large) {
        padding: 0 20px;
        text-align: left;

        &:hover {
          color: $text-hover-color;
          background-color: $hover-bg-color;
        }
      }

      .text {
        padding-left: 5px;
        display: none;

         @media screen and (min-width: $width-large) {
            padding-left: 5px;
            display: inline-block;
         }
      }
    }
  }
}
</style>

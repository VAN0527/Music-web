<template>
  <div class="sideBar">
    <div class="title">
      <h1>Music</h1>
    </div>
    <div class="music-lib">
      <ul>
        <router-link
          to="/find" 
          tag="li" 
          class="music-lib-item"
        >
          <span class="icon-found"></span>
          <span class="text">发现音乐</span>
        </router-link>
        <router-link 
          to="/songlist" 
          tag="li" 
          class="music-lib-item"
        >
          <span class="icon-tubiao"></span>
          <span class="text">歌单</span>
        </router-link>
        <router-link 
          to="/rank" 
          tag="li" 
          class="music-lib-item"
        >
          <span class="icon-paixingbang"></span>
          <span class="text">排行榜</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.sideBar {
  width: 100%;
  height: 100%;
  background-color: rgb(32, 32, 32);;
  color: $text-color;

  .title {
    padding: 20px;
    text-align: center;
    color: $text-hover-color;
    
    h1 {
      margin: 0;
      font-weight: 100;
    }
  }

  .music-lib {
    font-size: 20px;

    .music-lib-item {
      padding: 0 20px;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      transition: all linear 0.3s;

      &:hover {
        color: $text-hover-color;
        background-color: $hover-bg-color;
      }

      .text {
        padding-left: 5px;
      }
    }
  }
}
</style>

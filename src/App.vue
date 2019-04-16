<template>
  <div id="app" class="iconfont">
    <div class="side">
      <SideBar></SideBar>
    </div>
    <div class="main">
      <Header></Header>
      <div class="main-wrapper">
        <router-view/>
      </div>
    </div>
    <Player></Player>
  </div>
</template>

<script>
import Header from 'components/Header.vue'
import SideBar from 'components/SideBar.vue'
import Player from 'components/Player.vue'

export default {
  components: {
    Header,
    SideBar,
    Player
  }
}
</script>

<style lang="scss">
@import 'styles/normalize.css';
@import 'styles/common.scss';
@import 'styles/variable.scss';
@import url('//at.alicdn.com/t/font_1117489_y6l6l34ki4p.css');

body, html {
  height: 100%;
}

#app {
  height: 100%;
  color: $text-color;
  background-color: $theme-color;
}

.side {
  height: 100%;
  width: 250px;
  float: left;
}

.main {
  margin-left: 250px;
  height: 100%;
  overflow: auto;

  .main-wrapper {
    margin: 0 auto 120px auto;
    max-width: 1200px;
  }
}
</style>

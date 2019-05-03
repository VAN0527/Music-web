<template>
  <div id="app" class="iconfont">
    <div class="side">
      <SideBar></SideBar>
    </div>
    <div class="main">
      <Header></Header>
      <div class="main-wrapper" ref="mainWrapper">
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
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    SideBar,
    Player
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  watch: {
    currentSong () {
      this.$refs.mainWrapper.style.marginBottom = '80px'
    }
  }
}
</script>

<style lang="scss">
@import 'styles/normalize.css';
@import 'styles/common.scss';
@import 'styles/variable.scss';
@import url('//at.alicdn.com/t/font_1117489_ozeucbmiyf.css');

html, body {
  height: 100%;
}

#app {
  min-height: 100vh;
  color: $text-color;
  background-color: $theme-color;
  overflow: auto;

  .side {
    height: 40px;
    width: 100%;

    @media screen and (min-width: $width-medium) {
      height: 100vh;
      width: 10%;
      float: left;
    }

    @media screen and (min-width: $width-large) {
      width: 250px;
    }
  }

  .main {
    height: 100vh;
    position: relative;
    
    @media screen and (min-width: $width-medium) {
      overflow: auto;
      margin-left: 10%;
    }

    @media screen and (min-width: $width-large) {
      margin-left: 250px;
    }

    .main-wrapper {
      margin: 0 auto 20px auto;
      max-width: 1200px;
    }
  }
}
</style>

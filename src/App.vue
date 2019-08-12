<template>
  <div id="app" class="iconfont"> 
    <div ref="main">
      <Header></Header>
      <router-view/>
    </div>
    <Player></Player>
  </div>
</template>

<script>
import Header from 'components/Header'
import Player from 'components/Player'

import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Player
  },
  computed: {
    ...mapGetters([
      'currentSong'
    ])
  },
  watch: {
    currentSong () {
      this.$refs.main.style.marginBottom = '90px'
    }
  }
}
</script>

<style lang="scss">
@import 'styles/normalize.css';
@import 'styles/common.scss';
@import 'styles/variable.scss';
@import url('//at.alicdn.com/t/font_1117489_ozeucbmiyf.css');

#app {
  min-height: 100vh;
  color: $color-black;
  background-color: $theme-color;
  overflow: auto;

  main {
    height: 100vh;
    position: relative;
  }
}
</style>

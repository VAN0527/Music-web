<template>
  <Loading
    class="vld-parent"
    :loader="loader"
    :is-full-page="fullPage"
    :active.sync="loading"
    :width="width"
    :height="height"
    :color="color"
    :background-color="backgroundColor"
  ></Loading>
</template>

<script>
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      loader: 'bars',
      fullPage: false,
      width: 100,
      height: 100,
      color: '#000',
      backgroundColor: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
.vld-parent {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
  z-index: 999;
}
</style>


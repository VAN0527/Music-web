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
      opacity: 1,
      zIndex: 999,
      width: 100,
      height: 100,
      color: '#3d619b',
      backgroundColor: '#e9e9eb'
    }
  }
}
</script>

<template>
  <Slider>
    <SliderItem
      v-for="item in data"
      :key="item.id"
    >
      <img
        :src="item.imageUrl"
        @click="selectImg(item.url)"
      >
    </SliderItem>
  </Slider>
</template>

<script>
import { Slider, SliderItem } from 'vue-easy-slider'

export default {
  components: {
    Slider,
    SliderItem
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectImg (url) {
      if (url) {
        window.location.href = url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
    height: 300px;
  }
</style>

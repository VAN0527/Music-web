<template>
  <Slider>
    <SliderItem
      v-for="item in data"
      :key="item.id"
    >
      <img :src="item.imageUrl">
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
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 100%;
  }
</style>

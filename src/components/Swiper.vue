<template>
  <swiper :options="swiperOption">
    <swiperSlide 
      v-for="(item, index) in data" 
      :key="index"
    >
      <img :src="item.imageUrl">
    </swiperSlide>
    <div class="swiper-pagination" slot="pagination"></div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'

export default {
  components: {
    swiper,
    swiperSlide
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    swiperOption: {
      type: Object,
      default: function () {
        return {
          autoplay: {
            delay: 1000,
            disableOnInteraction: false
          },
          loop: true,
          lazy: true,
          initialSlide:0,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
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

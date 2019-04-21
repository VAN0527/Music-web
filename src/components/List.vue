<template>
  <div class="list clearfix">
    <div
      class="list-item"
      v-for="item in list"
      @click="selectItem(item)"
      :key="item.id"
    >
      <div class="cover">
        <img v-lazy="item.picUrl" >
      </div>
      <div class="info">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.list {
  .list-item {
    float: left;
    width: 25%;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    
    .cover {
      img {
        width: 100%;
        height: 300px;
      }
    }

    .info {
      height: 35px;
      line-height: 35px;
      width: 100%;
      @include no-wrap();

      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>

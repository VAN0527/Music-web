<template>
  <div class="list">
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .list-item {
    text-align: center;
    cursor: pointer;
    .cover {
      width: 250px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      height: 35px;
      line-height: 35px;
      width: 250px;
      @include no-wrap();

      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>

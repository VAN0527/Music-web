<template>
  <nav class="nav">
    <div class="nav-wrapper">
      <router-link
        class="nav-item"
        v-for="route in routes"
        :key="route.name"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
  </nav>
</template>

<script>
const routes = [
  { path: '/', name: '首页' },
  { path: '/songlist?cat=全部', name: '歌单' },
  { path: '/rank', name: '排行榜'}
]
export default {
  data () {
    return {
      routes
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.nav {
  background-color: $bg-color;

  .nav-wrapper {
    .nav-item {
      margin: 0 20px;

      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>


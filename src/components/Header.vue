<template>
  <header class="header clearfix">
    <div class="header-wrap">
      <h1>Music</h1>
      <div class="search">
        <SearchBar></SearchBar>
      </div>
      <div class="user">
        <i class="icon-geren"></i>
      </div>
      <nav class="nav">
        <NavBar></NavBar>
      </nav>
    </div>
  </header>
</template>

<script>
import SearchBar from 'components/SearchBar'
import NavBar from 'components/NavBar'

export default {
  components: {
    SearchBar,
    NavBar
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
@import 'styles/mixin.scss';

.header {
  height: 60px;
  background-color: $bg-color;
  color: $color-primary;

  .header-wrap {
    @include wrap-center;
    padding: 0 20px;
    box-sizing: border-box;

    h1 {
      margin: 0;
      display: inline-block;
      font-size: 2em;
      font-weight: 200;
      line-height: 60px;
      color: $text-hover-color;
    }

    .search {
      display: inline-block;
      margin-left: 30px;
      line-height: 60px;
      vertical-align: top;  // 解决 inline-block 不对齐
    }

    .nav {
      float: right;
      line-height: 60px;
    }

    .user {
      float: right;
      font-size: 2em;
      line-height: 60px;
      cursor: pointer;

      &:hover {
        color: $text-hover-color;
      }
    }
  }
}
</style>

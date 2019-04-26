<template>
  <div class="header clearfix">
    <div class="search">
      <SearchBar></SearchBar>
    </div>
    <div class="user">
      <i class="icon-geren"></i>
    </div>
  </div>
</template>

<script>
import SearchBar from 'components/SearchBar'
export default {
  components: {
    SearchBar
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.header {
  height: 40px;
  border-bottom: 1px solid #000;
  
  @media screen and (min-width: $width-medium) {
    height: 60px;
  }

  .search {
    float: left;
    width: 80%;
    height: 100%;
  
    @media screen and (min-width: $width-medium) {
      width: 70%;
      margin-left: 10%;
      display: flex;
      align-items: center;
    }
  }

  .user {
    float: left;
    width: 20%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 2em;

    @media screen and (min-width: $width-medium) {
      float: right;
      line-height: 60px;
    }
  }
}
</style>

<template>
  <div class="header">
    <div class="search">
      <SearchBar></SearchBar>
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
  height: 60px;
  background-color: #000;
  border-bottom: 1px solid #fff;

  .search {
    margin-left: 50px;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>

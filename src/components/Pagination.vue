<template>
  <div class="pagination">
    <span class="prev" @click="prevPage">上一页</span>
    <span
      class="pagination-item"
      :class="currentPage === page ? 'active' : ''"
      v-for="(page, i) in pageShow"
      :key="i"
      @click=selectPage(page)
    >
      {{ page }}
    </span>
    <span class="next" @click="nextPage">下一页</span>
    <input type="text" class="input-page" v-model="inputPage">
    <span class="select-page" @click="selectPage(inputPage)"> 跳转 </span>
    <span>共{{ pageCount }}页</span>
  </div>
</template>

<script>
export default {
  props: ['pageCount'],
  data () {
    return {
      currentPage: 1,
      inputPage: 1
    }
  },
  computed: {
    pageShow () {
      const pageCount = this.pageCount
      const currentPage = this.currentPage
      let page = []

      if (pageCount < 6) {
        for (let i = 0; i < pageCount; i++) {
          page.push(i + 1)
        }
      } else if (currentPage <= 2) {
        page = [1, 2, 3, '...', pageCount]
      } else if (currentPage >= pageCount - 1) {
        page = [1, '...', pageCount - 2, pageCount - 1, pageCount]
      } else {
        page = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageCount]
      }
      return page
    }
  },
  watch: {
    '$route' () {
      this.currentPage = 1
    }
  },
  methods: {
    nextPage () {
      if (this.currentPage !== this.pageCount) {
        this.currentPage++
        this.$emit('selectPage', this.currentPage)
      }
    },
    prevPage () {
      if (this.currentPage !== 0) {
        this.currentPage--
        this.$emit('selectPage', this.currentPage)
      }
    },
    selectPage (page) {
      page = Number(page)
      if (page > 0 && page <= this.pageCount) {
        this.currentPage = page
        this.inputPage = 1
        this.$emit('selectPage', page)
      } else {
        alert ('请输入有效范围的页数')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.pagination {
  font-size: 1.3em;

  .next,
  .prev,
  .pagination-item {
    &:hover {
      color: $color;
      cursor: pointer;
    }
  }

  .next,
  .prev,
  .select-page {
    margin: 0 5px;
    padding: 5px;
    display: inline-block;
    border-radius: 5px;
    color: $color-primary;
    background-color: $bg-color;
    cursor: pointer;

    &:hover {
      color: $text-hover-color;
    }
  }

  .pagination-item { 
    &.active {
      color: $text-hover-color;
    }
  }

  .input-page {
    margin: 0 5px;
    padding: 5px;
    width: 2em;
    text-align: center;
    border-radius: 5px;
    border: none;
    outline: none;
  }
}
</style>

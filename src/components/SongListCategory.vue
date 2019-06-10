<template>
  <div class="category">
    <div class="currentCat">
      <span @click="toggleCatlist">
        {{currentCat}}
        <i :class="[show ? 'icon-shrinkage' : 'icon-arrow-down']"></i>
      </span>
    </div>
    <div class="catlist" v-show="show">
      <div class="categories">
        <div class="sublist">
          <span 
            class="sublist-item" 
            :class="currentCat === '全部' ? 'active' : ''"
            @click="selectItem('全部')"
          >全部
          </span>
        </div>
      </div>
      <div
        class="categories" 
        v-for="cat in catlist"
        :key="cat.name"
      >
        <div class="title">{{cat.name}}</div>
        <div class="sublist">
          <span 
            class="sublist-item" 
            :class="[currentCat === sub.name ? 'active' : '']" 
            v-for="sub in cat.sub"
            :key="sub.name"
            @click="selectItem(sub.name)"
          >
            {{sub.name}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCatlist } from 'api/songlist.js'

export default {
  data () {
    return {
      show: false,
      catlist: [],
      currentCat: '全部',
    }
  },
  created () {
    this.$_getCatlist()
  },
  methods: {
    toggleCatlist () {
      this.show = !this.show
    },
    selectItem (cat) {
      if (this.currentCat === cat) {
        this.show = false
        return
      }

      this.currentCat = cat
      this.show = false
      this.$emit('select', cat)
    },
    $_getCatlist () {
      getCatlist().then(res => {
        if (res.status === 200) {
          this.catlist = this.$_formatCatlist(res.data)
        }
      })
    },
    $_formatCatlist (catlist) {
      const categories = catlist.categories
      const subs = catlist.sub
      let result = []

      for (let item in categories) {
        result.push({
          name: categories[item],
          category: item,
          sub: []
        })
      }

      subs.forEach(sub => {
        result.forEach(item => {
          if (sub.category == item.category) {
            item.sub.push(sub)
          }
        })
      })

      return result
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';
.category {
  position: relative;

  .currentCat {
    margin: 10px;
    font-size: 1.5em;
    
    span {
      cursor: pointer;
    }
  }
  
  .catlist {
    position: absolute;
    width: 100%;
    background-color: rgb(235, 235, 235);
    z-index: 1;

    .categories {
      padding: 20px 10px;
      border-bottom: 1px solid rgb(0, 0, 0);
      
      &:last-child {
        border-bottom: none;
      }

      .title {
        margin-bottom: 10px;
        font-size: 1.2em;
      }

      .sublist {
        display: flex;
        flex-wrap: wrap;

        .sublist-item {
          margin: 5px 10px;
          padding: 5px 10px;
          background-color: rgb(252, 251, 251);
          border-radius: 10px;
          cursor: pointer;

          &.active {
            background-color: $text-hover-color;
          }
        }
      }
    }
  }
}
</style>

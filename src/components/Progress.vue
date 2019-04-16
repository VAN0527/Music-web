<template>
  <div 
    class="progress-wrapper"
    ref="progressWrapper"
    @mousemove.prevent="mousemove" 
    @mouseup="mouseup"
  >
    <div 
      class="progress-bar"
      @click="progressClick"
      ref="progressBar"
    >
      <div class="progress" ref="progress"></div>
      <div 
        class="dot"
        ref="dot"
        @mousedown.prevent="mousedown"
      ></div>
    </div>
  </div>
</template>

<script>
const DOT_WIDTH = 3

export default {
  props: {
    present: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      drag: false
    }
  },
  watch: {
    present (newPresent) {
      // 进度条拖动时，不自动更新
      if (!this.drag) {
        const progressBarWidth = this.$refs.progressBar.clientWidth
        const offset = newPresent * progressBarWidth
        this.$refs.progress.style.width = offset + 'px'
        this.$refs.dot.style.left = offset + 'px'
      } 
    }
  },
  mounted () {
    this.$_initProgress()
    document.addEventListener('mouseup', this.mouseup)
  },
  destroyed () {
    document.removeEventListener('mouseup', this.mouseup)
  },
  methods: {
    mousedown (e) {
      this.drag = true
    },
    mousemove (e) {
      if (this.drag) {
        this.x = e.pageX
        const elX = this.$refs.progressBar.getBoundingClientRect().left
        const elWidth = this.$refs.progressBar.clientWidth

        // Math.min 防止溢出
        const offset = Math.min(this.x - elX, elWidth)
        this.$refs.progress.style.width = offset + 'px'
        this.$refs.dot.style.left = offset + 'px'
      }
    },
    mouseup (e) {
      if (this.drag) {
        this.drag = false
        const progressWidth = this.$refs.progress.clientWidth
        const present = this.$_present(progressWidth)
        
        this.$emit('progressChange', present)
      }
    },
    progressClick (e) {
      const clickX = e.pageX
      const elX = this.$refs.progressBar.getBoundingClientRect().left
      const progressBarWidth = this.$refs.progressBar.clientWidth
      const offset = Math.min(Math.max(0, clickX - elX), progressBarWidth - DOT_WIDTH)
      this.$refs.progress.style.width = offset + 'px'
      this.$refs.dot.style.left = offset + 'px'

      const present = this.$_present(offset)
      this.$emit('progressChange', present)
    },
    $_present (width) {
      const progressBarWidth = this.$refs.progressBar.clientWidth
      const present = width / progressBarWidth
      return present
    },
    $_initProgress () {
      const progressBarWidth = this.$refs.progressBar.clientWidth
      const offset = this.present * progressBarWidth
      this.$refs.progress.style.width = offset + 'px'
      this.$refs.dot.style.left = offset + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'styles/variable.scss';

.progress-wrapper {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;

  .progress-bar {
    position: relative;
    height: 2px;
    width: 100%;
    background-color: rgb(211, 215, 218);

    .progress {
      position: absolute;
      left: 0;
      top: 0px;
      height: 2px;
      width: 0;
      background-color: $text-hover-color;
    }

    .dot {
      position: absolute;
      left: 0;
      top: -3px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: beige;
      z-index: 10;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>

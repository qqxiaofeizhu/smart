<template>
  <div class="main-container" :style="{'min-height': containerHeight}">
      <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
      return {
          containerHeight: 0
      }
  },
  created () {
    let _that = this;
    _that.getWindowHeight()
  },
  methods: {
    getWindowHeight () {
      let _that = this;
      _that.$data.containerHeight = window.innerHeight - 75 + 'px';
    }
  },
  mounted () {
    // 监听窗口resize
    let _that = this;
    window.onresize = function () {
      _that.$data.containerHeight = window.innerHeight - 75 + 'px';
    }
  },
}
</script>

<style lang="scss" scoped>
.main-container {
    position: relative;
    // background: #cccccc;
    box-sizing: border-box;
    background-size: cover;
    overflow: auto;
    padding-bottom: 30px; 
}
</style>

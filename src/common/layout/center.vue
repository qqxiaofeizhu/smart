<template>
  <div class="main-container" :style="{'min-height': containerHeight}">
      <div class="container-left">
        <bs-custom-left></bs-custom-left>
      </div>
      <div class="container-right">
          <slot name="bs-right"></slot>
      </div>
  </div>
</template>
<script>
import bsCustomLeft from '../../components/list/left'
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
    window.onresize = function () {
      this.$data.containerHeight = window.innerHeight - 75 + 'px';
    }
  },
  components: {
    'bs-custom-left': bsCustomLeft
  }
}
</script>

<style lang="scss" scoped>
.main-container {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-right: 30px;
    display: inline-flex;
    background: url('../../assets/timg.jpg') no-repeat;
    background-size: cover;
    .container-left {
        flex-basis: 78px;
        height: 100%;
        box-sizing: border-box;   
    }
    .container-right {
        flex: auto;
        overflow: hidden;
        height: 100%;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        min-height: 600px;
    }
}
</style>


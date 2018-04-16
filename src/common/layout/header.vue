<template>
  <div class="mian-header">
      <user-message></user-message>
  </div>
</template>

<script>
import userMessage from './userMessage'
export default {
  components: {
    'userMessage' : userMessage
  }
}
</script>

<style lang="scss" scoped>
   .mian-header {
       position: relative;
       width: 100%;
       height: 60px;
       opacity: .8;
       box-sizing: border-box;
       background: white;
       border-bottom: 1px solid #cccc; 
   }
</style>
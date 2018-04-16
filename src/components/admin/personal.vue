<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
      <div class="container" slot="bs-right">
        <el-tabs type="border-card" @tab-click="handleChangeTab" v-model="activeTab">
          <el-tab-pane label="个人信息">

          </el-tab-pane>
          <el-tab-pane label="我的借阅">

          </el-tab-pane>
          <el-tab-pane label="密码修改">
            
          </el-tab-pane>
        </el-tabs>        
      </div>
      </bs-container>
    <bs-footer></bs-footer>
  </div>
</template>
<script>
import bsHeader from "../../common/layout/header";
import bsContainer from "../../common/layout/center";
import bsFooter from "../../common/layout/footer";
export default {
  data() {
    return {
      activeTab: 0
    }
  },
  components: {
    "bs-header": bsHeader,
    "bs-container": bsContainer,
    "bs-footer": bsFooter
  },
  methods: {
    handleChangeTab(ev) {
      
    },
    ajaxGetPersonal(type) {
      this.$store.dispatch('user/ajaxGetPersonal');
    } 
  }
};
</script>

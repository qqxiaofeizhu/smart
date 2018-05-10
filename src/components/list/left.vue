<template>
<div class="tac">
  <el-menu
    default-active="2"
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse"
    style="padding-top: 20px"
  >
    <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="handlePesernoalMessage()">个人信息</span>
        </template>
      </el-submenu>
    <el-submenu index="2" v-if="userMessage.admin > 0">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title" @click="handleUserManagement()">用户管理</span>
      </template>
    </el-submenu>
    <el-submenu index="3" v-if="userMessage.admin > 0">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="handleList()">图书管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><span slot="title" @click="handleEntry()">录入</span></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    <el-submenu index="4" v-if="userMessage.admin > 100">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="handleNotice()">公告管理</span>
        </template>
      </el-submenu>
    <el-submenu index="5" v-if="userMessage.admin > 100">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title" @click="handleAnalyze()">数据分析</span>
        </template>
      </el-submenu>
  </el-menu>
</div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.menu {
  position: relative;
  width: 100%;
}
</style>

<script>
import { mapGetters } from "vuex";
import index from 'vue';
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  computed: {
    ...mapGetters("user", {
      userMessage: "getUserMessage"
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleEntry() {
      const t = this;
      t.$store.dispatch("list/getAllBookEntry").then(function() {
        t.$router.push({ path: "/list/add-list" });
      });
    },
    // 用户管理
    handleUserManagement() {
      this.$router.push({ path: "/users" });
    },
    // 个人信息
    handlePesernoalMessage() {
      this.$router.push({ path: "/personal" });
    },
    handleNotice() {
      this.$router.push({ path: "/notice" });
    },
    handleList() {
      this.$router.push({ path: "/list" });
    },
    handleAnalyze() {
      this.$router.push({ path: "/analyze" });
    }
  }
};
</script>

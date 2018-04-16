<template>
  <div class="admin-login" :style="{'min-height': windowHeight}">
    <main-header>
      <h3 class="title">
        图书管理登录系统
      </h3>
    </main-header>
    <main-container>
      <el-form :model="users" status-icon :rules="userRules" ref="loginForm" class="loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="users.username" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="users.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <p>
          <a href="/register" class="login">无账号，点击注册</a>
        </p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form> 
    </main-container>
  </div>
</template>

<script>
import mainHeader from "../../common/layout/header";
import mainContainer from "../../common/layout/container";
import { setToken, encryption } from '@/utils/auth' 
export default {
  data() {
    const username = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    const password = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      windowHeight: 0,
      users: {
        username: "",
        password: ""
      },
      userRules: {
        username: [{ validator: username, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }]
      }
    };
  },
  created() {
    let _that = this;
    _that.getWindowHeight();
  },
  methods: {
    getWindowHeight() {
      let _that = this;
      _that.$data.windowHeight = window.innerHeight + "px";
    },
    submitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("bookstore/login", {
              username: _that.users.username,
              password:  encryption(_that.users.password)
            })
            .then(function(res) {
              if (res.data.type) {
                // 将token以cookie存下
                // 创建cookie
                // document.cookie = "token" + "=" + res.data.token;  
                setToken(res.data.token);
                _that.$store.commit('list/updateToken',res.data.token); 
                _that.$message({
                  message: "登录成功",
                  type: "success"
                });
                _that.$router.push({path: 'list'});
              } else {
                _that.$message({
                  message: res.data.message,
                  type: "danger"
                });
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    // 监听窗口resize
    let _that = this;
    window.onresize = function() {
      _that.$data.windowHeight = window.innerHeight + "px";
    };
  },
  components: {
    mainHeader: mainHeader,
    mainContainer: mainContainer
  }
};
</script>

<style lang="scss" scoped>
.admin-login {
  width: 100%;
  background: url("http://img.smzy.com/imges/2017/0502/20170502023627132.jpg")
    no-repeat;
  background-size: cover;
  .title {
    font-size: 32px;
    line-height: 75px;
    text-align: center;
    color: #303133;
  }
  .login {
    display: inline-block;
    line-height: 20px;
    padding-bottom: 10px;
  }
  .loginForm {
    width: 540px;
    height: auto;
    margin: 0 auto;
    padding-top: 20px;
  }
}
</style>



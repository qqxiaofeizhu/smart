<template>
  <div class="admin-login" :style="{'min-height': windowHeight}">
    <main-header>
    </main-header>
    <main-container>
      <el-form :model="users" status-icon :rules="userRules" ref="registerForm" class="registerForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="users.username" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="users.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="users.repassword" type="password" placeholder="请再次输入密码" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="输入密保" prop="encrypted">
          <el-input v-model="users.encrypted" placeholder="请输入您的密保，以便您后期修改您的密码！" auto-complete="off"></el-input>
        </el-form-item>
        <p>
          <a href="/login" class="register">已有账号，点此登录</a>
        </p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')" :loading="ajaxLock">提交</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
      </el-form> 
    </main-container>
  </div>
</template>

<script>
import mainHeader from "../../common/layout/header";
import mainContainer from "../../common/layout/container";
import { setToken, encryption } from "@/utils/auth";
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
    const repassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.users.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      windowHeight: 0,
      users: {
        username: "",
        password: "",
        repassword: "",
        encrypted: ""
      },
      userRules: {
        username: [{ validator: username, trigger: "blur" }],
        password: [{ validator: password, trigger: "blur" }],
        repassword: [{ validator: repassword, trigger: "blur" }]
      },
      ajaxLock: false
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
          _that.ajaxLock = true;
          _that.$store.dispatch('user/userRegistration', {
            username: _that.users.username,
            password:  encryption(_that.users.password),
            repassword : encryption(_that.users.password),
            encrypted: encryption(_that.users.encrypted)
          }).then(function(res) {
              _that.ajaxLock = false;
              if (res.type) {
                _that.$message({
                  message: res.message,
                  type: "success"
                });
                _that.$router.push({ path: "login" });
              } else {
                _that.$message({
                  message:  res.message,
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
  .register {
    display: inline-block;
    line-height: 20px;
    padding-bottom: 10px;
  }
  .registerForm {
    width: 540px;
    height: auto;
    margin: 0 auto;
    padding-top: 20px;
  }
}
</style>



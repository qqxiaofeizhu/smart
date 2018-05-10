<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
      <div class="container" slot="bs-right">
        <el-tabs type="border-card" @tab-click="handleChangeTab" v-model="activeTab">
          <el-tab-pane label="我的借阅">
            <!-- <uL>
              <li v-for="item of borrrowBooks" :key="item.bookId">
                <span>{{item.bookname}}</span>
                <el-button type="success" size="small" @click="handleReturnBook(item.bookId)">还书</el-button>
              </li>
            </uL> -->
            <el-table
              :data="borrrowBooks"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                prop="bookname"
                label="书名"
                width="auto">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    @click="handleReturnBook(scope.row.bookId)">还书</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="密码修改">
            <el-form :model="users" status-icon :rules="userRules" ref="registerForm" class="registerForm">
              <el-form-item label="用户名" prop="username" required>
                <el-input v-model="users.username" placeholder="请输入用户名" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="password" required>
                <el-input v-model="users.password" type="password" placeholder="请输入密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="repassword" required>
                <el-input v-model="users.repassword" type="password" placeholder="请再次输入密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="输入密保" prop="encrypted" required>
                <el-input v-model="users.encrypted" placeholder="请输入您的密保，以便您修改您的密码！" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')" :loading="ajaxLock">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
              </el-form-item>
            </el-form>             
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
import { encryption, removeToken } from "@/utils/auth";
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
    const encrypted = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密保问题不能为空"));
      } else {
        callback();
      }
    };
    return {
      activeTab: 0,
      borrrowBooks: [],
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
  components: {
    "bs-header": bsHeader,
    "bs-container": bsContainer,
    "bs-footer": bsFooter
  },
  beforeMount() {
    this.ajaxGetPersonal(this.activeTab);
  },
  methods: {
    handleChangeTab(ev) {
      this.ajaxGetPersonal(this.activeTab);
    },
    // 还书
    handleReturnBook(id) {
      let t = this;
      t.$store
        .dispatch("user/ajaxReturnBook", { bookId: id })
        .then(function(res) {
          if (res.type) {
            t.$message({
              type: "success",
              message: res.message
            });
            t.ajaxGetPersonal(t.activeTab);
          } else {
            t.$message({
              type: "danger",
              message: res.message
            });
          }
        });
    },
    ajaxGetPersonal(type) {
      let t = this;
      if (type == 0) {
        t.$store.dispatch("user/ajaxGetPersonal").then(function(res) {
          if (res.type) {
            t.$message({
              type: "success",
              message: res.message
            });
            let bookList = [];
            for (let [index, item] of res.data.bookIds.entries()) {
              let bookItem = {};
              bookItem.bookname = res.data.booknames[index][0] || "";
              bookItem.bookId = item[0] || "";
              bookList.push(bookItem);
            }
            t.borrrowBooks = bookList;
          } else {
            t.$message({
              type: "danger",
              message: res.message
            });
          }
        });
      }
    },
    submitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _that.ajaxLock = true;
          _that.$store
            .dispatch("user/ChangeUserPassword", {
              username: _that.users.username,
              password: encryption(_that.users.password),
              repassword: encryption(_that.users.password),
              encrypted: encryption(_that.users.encrypted)
            })
            .then(function(res) {
              _that.ajaxLock = false;
              if (res.type) {
                _that.$message({
                  message: res.message,
                  type: "success"
                });
                removeToken();
                _that.$store.commit("user/updateUserMessage");
                _that.$router.push({ path: "login" });
              } else {
                _that.$message({
                  message: res.message,
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
  }
};
</script>

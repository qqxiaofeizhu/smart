<template>
  <div class="container">
        <div class="logo">
            <img src="../../assets/baseImage/logo.png">
        </div>
        <div class="userMessageContainer" v-if="usersMessage.username !== ''">
            <span class="userMessage">
               {{new Date() | computedDate}}
            </span>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <span class="userMessage">{{usersMessage.username}}</span><i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span class="cancellation">
                            <a href="/list">后台管理</a>
                        </span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span class="cancellation" @click.stop="handleCancellation()">注销</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>  
        <div class="userMessageContainer" v-else>
             <span class="userMessage">
               <a href="/register">注册</a>
            </span>    
             <span class="userMessage">
               <a href="/login">登陆</a>
            </span>        
        </div>
  </div>
</template>


<script>
import { removeToken } from '@/utils/auth' 
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data() {
      return {
          usersMessage: {}
      }
  },
  beforeMount() {
      let t = this;
      t.$store.dispatch('user/ajaxGetUserMessage').then(function() {
          t.usersMessage = t.userMessage;
          console.log(t.usersMessage.username)
      })
  },
  methods: {
      handleCancellation() {
          removeToken();
          this.$store.commit('user/updateUserMessage', '')
          this.$router.push({path: '/login'})
      }
  },
  computed: {
      ...mapGetters('user', {
        userMessage: 'getUserMessage'
    })
  },
  filters: {
    computedDate: function (value) {
        const time = moment(value).hour();
        let timeNow = '上午好'
        switch(Math.floor(time / 6)) {
            case 0: 
                timeNow = "凌晨了，请注意休息!" 
                break;
            case 1: 
                timeNow = "上午好!"
                break;
            case 2: 
                timeNow = "下午好!"
                break;
            case 3: 
                timeNow = "晚上好!" 
                break;
        }
        return timeNow;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: inline-flex;
    .logo {
        flex: auto;
        padding: 7.5px;
        img {
            height: 45px;
            width: auto;
        } 
    }
    .userMessageContainer {
        flex-basis: 200px;
        .userMessage {
            display: inline-block;
            line-height: 60px;
        }
    }
}
</style>

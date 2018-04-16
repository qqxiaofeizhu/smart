<template>
  <div class="container">
    <bs-header></bs-header>
    <bs-container>
      <div class="container" slot="bs-right">
        <el-table
            :data="allUserMessage"
            border
            style="width: 100%">
            <el-table-column
                prop="username"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="isAdmin"
                label="管理员"
                width="180">
                <template slot-scope="scope">
                    <div>
                        {{scope.row.isAdmin ? '超级管理员' : '普通用户'}}
                    </div>
                    </template>
            </el-table-column>
           <el-table-column
              label="操作"
              min-width="90"
            >
              <template slot-scope="scope" class="handel-operate">
                  <span v-for="(item, index) of list" :key="index" @click="handelOperate(item, scope.row._id, scope.row)">
                    <a style="color: rgb(244, 81, 30);" v-if='item == "删除"'>{{item}}</a>
                    <a v-else>
                        <span>&nbsp;&nbsp;</span>{{item}}
                    </a>
                  </span>
              </template>
            </el-table-column> 
        </el-table>
      </div>
      </bs-container>
    <bs-footer></bs-footer>
  </div>
</template>

<script>
import bsHeader from '../../common/layout/header'
import bsContainer from '../../common/layout/center'
import bsFooter from '../../common/layout/footer'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            list: ['设为管理员', '设为普通用户', '删除']
        }
    },
    beforeMount() {
        this.ajaxGetAllUser()
    },
    computed: {
        ...mapGetters('user', {
            allUserMessage :'getAllUsersMessage'
        })
    },
    components: {
        'bs-header': bsHeader,
        'bs-container':bsContainer,
        'bs-footer':bsFooter,
    },
    methods: {
        ajaxGetAllUser() {
            this.$store.dispatch('user/getAllUsers').then(function(res) {
                // console.log(res)
            })
        },
        handelOperate(item, id) {
            // 删除信息
            let t = this;
            if (Object.is(item, '删除')) {
                t.$store.dispatch('user/deleteUser', {id : id}).then(function(res) {
                    if (res.type) {
                        t.$message({
                            message: res.message,
                            type: "success"
                        });
                        t.ajaxGetAllUser()
                    } else {
                        t.$message({
                            message: res.message,
                            type: "danger"
                        });   
                    }
                })
                return;
            } else {
                let admin = false;
                if (item == '设为管理员') {
                    admin = true 
                }
                t.$store.dispatch('user/setOrdinaryToSuper', {id : id, admin: admin}).then(function(res) {
                    if (res.type) {
                        t.$message({
                            message: res.message,
                            type: "success"
                        });
                        t.ajaxGetAllUser()
                    } else {
                        t.$message({
                            message: res.message,
                            type: "danger"
                        });   
                    }
                })                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .container {
    .booklist {
      .handel-operate {
        span {
          a {
            cursor: pointer;
            padding: 0 5px 0 5px;
          } 
        }
      }
    }
  }
</style>

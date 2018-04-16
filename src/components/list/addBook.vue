<template>
  <div>
    <bs-header>
      <el-col :span="15">
        <h1 class="base-header" v-if="bookListModel._id">编辑</h1>
        <h1 class="base-header" v-else>录入</h1>
      </el-col>
    </bs-header>
    <bs-container v-if="bookList.length > 0">
      <el-form :model="bookListModel" status-icon ref="bookListForm">
        <el-col :span="15">
`        <el-form-item
          v-for="(item, index) in bookList"
          :key="index"
          :label="item.labeName"
          :required="item.required"
          label-width="120px"
          :prop="item.fieldName"
        >
          <el-input auto-complete="off" v-model="bookListModel[item.fieldName]"></el-input>
        </el-form-item>`
        </el-col>
      </el-form>
      <div class="footer">
        <el-col :span="15" v-if="bookListModel._id">
          <el-button type="primary" @click="editorSubmitForm('bookListForm')">提交</el-button>
          <el-button @click="resetForm('bookListForm')">重置</el-button>
        </el-col>
        <el-col :span="15" v-else>
          <el-button type="primary" @click="submitForm('bookListForm')">提交</el-button>
          <el-button @click="resetForm('bookListForm')">重置</el-button>
        </el-col>
      </div>
    </bs-container>
    <bs-footer>
    </bs-footer>
  </div>
</template>

<script>
import bsHeader from '../../common/layout/header'
import bsContainer from '../../common/layout/container'
import bsFooter from '../../common/layout/footer'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      bookList: [],
      bookListModel: {}
    }
  },
  beforeMount() {
    let t = this;
    t.bookListModel = JSON.parse(JSON.stringify(t.bookListModeles));
    console.log(t.bookProtoType);
    t.bookList = t.bookProtoType;
  },
  methods: {
    submitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('list/addBookList',this.$data.bookListModel).then(function(res) {
              if (res.status) {
                _that.$message({
                  message: res.message,
                  type: "success"
                });
                _that.$router.push({path: '/list'});
              } else {
                _that.$message({
                  message: res.message,
                  type: "danger"
                });
              }
          })
        }
      });
    },
    editorSubmitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('list/editorBookMessage',this.$data.bookListModel).then(function(res) {
              if (res.status) {
                _that.$message({
                  message: res.message,
                  type: "success"
                });
                _that.$router.push({path: '/list'});
              } else {
                _that.$message({
                  message: res.message,
                  type: "danger"
                });
              }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    deactivated () {
      console.log("离开该组件");
      this.destroyed();
      console.log(this.$data)
    }
  },
  computed: {
    ...mapGetters('list',{
      bookListModeles: 'getBookListModel',
      bookProtoType: 'getBookProtoType'
    })
  },
  components: {
    'bs-header': bsHeader,
    'bs-container':bsContainer,
    'bs-footer':bsFooter
  }
}
</script>

<style lang="scss" scoped>
  .base-header {
    padding-top: 15px;
    text-align: center;
  }
  .footer {
    margin: 0 auto;
    text-align: center;
  }
</style>
 
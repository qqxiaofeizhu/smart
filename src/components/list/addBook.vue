<template>
  <div>
    <bs-header>
    </bs-header>
    <bs-container>
      <el-col :span="18">
        <h1 class="base-header" v-if="bookListModel._id">编辑</h1>
        <h1 class="base-header" v-else>录入</h1>
      </el-col>
      <el-col :span="18">
        <el-form :model="bookListModel" status-icon ref="bookListForm">
            <el-form-item
              v-for="(item, index) in bookList"
              :key="index"
              :label="item.labeName"
              :required="item.required"
              label-width="120px"
              :prop="item.fieldName"
            >
              <el-select style="width:100%" @change="changePosition(bookListModel[item.fieldName])" filterable v-if="item.fieldName == 'bookCategory'" v-model="bookListModel[item.fieldName]" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
              <el-input v-else auto-complete="off" v-model="bookListModel[item.fieldName]"></el-input>
            </el-form-item>
        </el-form>
      </el-col>
      <div class="footer">
        <el-col :span="18" v-if="bookListModel._id">
          <el-button type="primary" @click="editorSubmitForm('bookListForm')">提交</el-button>
          <el-button @click="resetForm('bookListForm')">重置</el-button>
        </el-col>
        <el-col :span="18" v-else>
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
import bsHeader from "../../common/layout/header";
import bsContainer from "../../common/layout/container";
import bsFooter from "../../common/layout/footer";
import { mapGetters } from "vuex";
import constData from "../../utils/constData"
export default {
  data() {
    return {
      bookList: [],
      bookListModel: {},
      options: constData.options,
      bookPosition: constData.bookPosition,
    };
  },
  beforeMount() {
    let t = this;
    t.bookListModel = JSON.parse(JSON.stringify(t.bookListModeles));
    t.bookList = JSON.parse(JSON.stringify(t.bookProtoType));
  },
  methods: {
    submitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("list/addBookList", this.$data.bookListModel)
            .then(function(res) {
              if (res.status) {
                _that.$message({
                  message: res.message,
                  type: "success"
                });
                _that.$router.push({ path: "/list" });
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
    editorSubmitForm(formName) {
      let _that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("list/editorBookMessage", this.$data.bookListModel)
            .then(function(res) {
              if (res.status) {
                _that.$message({
                  message: res.message,
                  type: "success"
                });
                _that.$router.push({ path: "/list" });
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
    },
    deactivated() {
      console.log("离开该组件");
      this.destroyed();
      console.log(this.$data);
    },
    changePosition(item) {
      this.bookListModel.bookPosition = this.bookPosition[item.slice(0, 1)];
    }
  },
  computed: {
    ...mapGetters("list", {
      bookListModeles: "getBookListModel",
      bookProtoType: "getBookProtoType"
    })
  },
  components: {
    "bs-header": bsHeader,
    "bs-container": bsContainer,
    "bs-footer": bsFooter
  }
};
</script>

<style lang="scss" scoped>
.base-header {
  padding-top: 18px;
  text-align: center;
}
.footer {
  margin: 0 auto;
  text-align: center;
}
</style>
 